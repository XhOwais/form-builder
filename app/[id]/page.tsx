'use client'
import { GetForm } from "@/actions/form";
import { FormElements } from "@/components/form-elements/page";
import { CustomInstance } from "@/components/fields/TextField";
import useDesigner from "@/components/hooks/useDesigner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FormPrview(params: any) {
  const { elements, setElements } = useDesigner();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true)
    const formId = params.params.id;
    const formData = async () => {
      const res = await GetForm(formId)
      if (res?.content) {
        const elementsData = await JSON.parse(res?.content)
        setElements(elementsData)
      } else {
        setElements([])
      }
      setLoading(false)
    }
    formData();
  }, [params.params.id])

  const combinedObject = elements.reduce((acc: Record<string, any>, element) => {
    acc[element.extraAttributes?.label] = "";
    return acc;
  }, {});

  const element = elements as unknown as CustomInstance[];
  const schemaGenerator = element.reduce((acc: Record<string, any>, element) => {
    const { label, min, max, required } = element.extraAttributes;
    acc[label] =
      element.type === "TextField"
        ? required
          ? z.string().min(min, `minimum ${min} ch required!`).max(max)
          : z.string().optional()
        : element.extraAttributes.email
          ? z.string().email()
          : element.type === 'NumField'
            ? z.string()
            : element.type === 'TextAreaField'
              ? z.string()
              : z.string();
    return acc;
  }, {});

  // console.log(schemaGenerator)



  // console.log(schemaGenerator)
  const form = useForm({
    defaultValues: combinedObject,
    resolver: zodResolver(z.object(schemaGenerator))
  },
  );
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;
  return (
    <div>
      <div className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">Form preview</p>
          <p className="text-sm text-muted-foreground">This is how your form will look like to your users.</p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">

          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            <form action="" {...form} onSubmit={handleSubmit((data) => {
              console.log(data)
            })} >
              {element?.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;
                const errorMessage = errors[element.extraAttributes.label]?.message;
                return (<>
                  <FormComponent key={element.id} register={register}
                    elementInstance={element} />
                  {errorMessage && (
                    <p className="mb-2 text-xs" key={`${element.id}-error`}>
                      {String(errorMessage)}
                    </p>
                  )}
                </>);
              })}
              <Button className=" float-end">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
