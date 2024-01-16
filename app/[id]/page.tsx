'use client'
import { FormSubmit, GetForm } from "@/actions/form";
import { FormElements } from "@/components/form-elements/page";
import { CustomInstance } from "@/components/fields/TextField";
import useDesigner from "@/components/hooks/useDesigner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";

export default function FormPrview(params: any) {
  const { elements, setElements } = useDesigner();
  const [FromId, setFormId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  let dataFetched = false;
  const formId = params.params.id;


  useEffect(() => {

    formData();
  }, [formId]);

  const formData = async () => {
    if (!dataFetched) {
      try {
        const res = await GetForm(formId);
        setData(res);
        setFormId(res?.id);

        if (res?.content) {
          const elementsData = await JSON.parse(res?.content);
          setElements(elementsData);
        } else {
          setElements([]);
        }

        dataFetched = true;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };


  const combinedObject = elements.reduce((acc: Record<string, any>, element) => {
    acc[element.extraAttributes?.label] = "";
    return acc;
  }, {});

  const element = elements as unknown as CustomInstance[];
  // const schemaGenerator = element.reduce((acc: Record<string, any>, element) => {
  //   const { label, min, max, required } = element.extraAttributes;
  //   acc[label] =
  //     element.type === "TextField"
  //       ? required
  //         ? (element.extraAttributes.email ? z.string().email() :
  //           z.string().min(min, `minimum ${min} ch required!`).max(max))
  //         : z.string().optional()
  //       : element.type === 'NumField'
  //         ? z.string().min(min).max(max)
  //         : element.type === 'TextAreaField'
  //           ? z.string().min(min).max(max)
  //           : z.string().min(min).max(max);
  //   return acc;
  // }, {});
  const schemaGenerator = element.reduce((acc: Record<string, any>, element) => {
    const { label, min, max, required } = element.extraAttributes;
    const minI = min as unknown as string
    const maxI = max as unknown as string
    const typeToSchema = {
      TextField: () => {
        const baseSchema = z.string();
        const baseSchemawithLimit = baseSchema.min(min).max(max);
        const basewithMin = baseSchema.min(min);
        const basewithMax = baseSchema.max(max);

        return !required 
        ? baseSchema.optional() 
        : required && min !== 0 && max >= 1
          ? baseSchemawithLimit
          : required && min !== 0 && minI !== ''
            ? basewithMin
            : required && max >= 1 && maxI !== ''
              ? basewithMax
              : required && element.extraAttributes.email
                ? baseSchema.email()
                : element.extraAttributes.email
                  ? baseSchema.email()
                  : baseSchema.min(1, 'This Field is Required!');
      },
      NumField: () => {
        const baseSchema = z.string();
        const basewithLimit = baseSchema.min(min).max(max);
        const basewithMin = baseSchema.min(min);
        const basewithMax = baseSchema.max(max);
        console.log(typeof min, min)
        return !required
          ? baseSchema
          : (required && min !== 0 && max >= 1
            ? basewithLimit
            : required && min !== 0 && minI !== ''
              ? basewithMin
              : required && max >= 1 && maxI !== ''
                ? basewithMax
                : baseSchema.min(1, 'This Field is Required!'));
      },
      TextAreaField: () => {
        const baseSchema = z.string();

        return !required
          ? baseSchema.optional()
          : baseSchema.min(1, 'This Field is Required!')
      },
    };


    acc[label] = typeToSchema[element.type] ? typeToSchema[element.type]() : z.string();

    return acc;
  }, {});


  // console.log(schemaGenerator)



  // console.log(schemaGenerator)
  const form = useForm<Record<string, any>>({
    defaultValues: combinedObject,
    resolver: zodResolver(z.object(schemaGenerator))
  },
  );
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  async function handleSubmitForm(data: Record<string, any>) {
    const res = await FormSubmit(FromId as number, JSON.stringify(data))
    const formId = await res
    if (formId) {
      form.reset()

    }

  }
  return (
    <>
      {loading ? (<div className=' w-full h-[100vh] flex justify-center items-center'><FaSpinner className="animate-spin" /></div>) : (
        <div>
          <div className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
            <div className="px-4 py-2 border-b">
              <p className="text-lg font-bold text-muted-foreground">{data.name}</p>
              <p className="text-sm text-muted-foreground">This is how your form will look like to your users.</p>
            </div>
            <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">

              <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
                <form action="" {...form} onSubmit={handleSubmit(handleSubmitForm)} >
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
                  <Button disabled={!data?.publish || isSubmitting} className=" float-end">Submit {isSubmitting && <FaSpinner className="animate-spin ml-3" />}</Button>
                </form>
              </div>
            </div>
          </div>
        </div>)}
    </>
  )
}
