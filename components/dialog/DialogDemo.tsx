import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldType, FormElementInstance } from "@/types/form"
import { Settings } from "lucide-react"
import { CustomInstance } from "../fields/TextField"
import useDesigner from "../hooks/useDesigner"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TFIeldPropSchema } from "@/utils/Field-properties"
import { Switch } from "../ui/switch"

export function DialogDemo({ element }: { element: CustomInstance }) {

  const [elemtdata, setElementData] = useState([element.extraAttributes]);
  const [isRequired, setIsRequired] = useState<boolean>(element.extraAttributes.required)
  const [emailS, setEmail] = useState<boolean>(element.extraAttributes.email)
  console.log(elemtdata)
  console.log(element.extraAttributes.email)
  const { label, placeHolder, helperText, required, min, max, email } = element.extraAttributes;
  const form = useForm<Record<string, any>>({
    defaultValues: {
      label: label,
      placeHolder: placeHolder,
      helperText: helperText,
      required: required,
      min,
      max,
      email: emailS
    }
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;
  const { updateElement } = useDesigner();

  function update(values: Record<string, any>) {
    const { label, placeHolder, helperText, required, min, max, email } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        placeHolder,
        helperText,
        required: isRequired,
        min,
        max,
        email: emailS
      }
    })
  }
  return (
    <Dialog>
      <form {...form} onBlur={handleSubmit(update)}>
        <DialogTrigger asChild>
          <Settings />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {label}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue={label} {...register("label")} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Placeholder
              </Label>
              <Input id="username" defaultValue={placeHolder} className="col-span-3" {...register("placeHolder")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Helper Text
              </Label>
              <Input id="username" defaultValue={helperText} className="col-span-3" {...register("helperText")} />
            </div>
            {element.type !== 'TextAreaField' && isRequired && (<>
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Min
              </Label>
              <Input id="username" type="number" defaultValue={min} className="col-span-3" {...register("min")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Max
              </Label>
              <Input id="username" type="number" defaultValue={max} className="col-span-3" {...register("max")} />
            </div>
            </>)}
            <div className="flex justify-between">
              <Label htmlFor="username" className="text-right">
                Required
              </Label>
              <div className="flex items-center justify-between space-x-2">
                {element.type === 'TextField' &&
                (<>
                <Label htmlFor="airplane-mode">Email</Label>
                <Switch
                  defaultChecked={element.extraAttributes.email}
                  onCheckedChange={() => {
                    setEmail(!emailS)
                  }}
                  id="airplane-mode"
                  {...register('email')}
                />
                </>)}
                <Label htmlFor="airplane-mode">Required</Label>
                <Switch
                  defaultChecked={isRequired}
                  onCheckedChange={() => {
                    setIsRequired(!isRequired)
                  }}
                  id="airplane-mode"
                  {...register("required")}
                />
              </div>
            </div>
          </div>
          <DialogTrigger className=" float-end">
            <Button disabled={isSubmitting} type="submit">Save changes</Button>
          </DialogTrigger>
        </DialogContent>
      </form>
    </Dialog >
  )
}
