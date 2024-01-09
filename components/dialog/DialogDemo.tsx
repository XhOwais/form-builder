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
  console.log(elemtdata)
  const { label, placeHolder, helperText, required } = element.extraAttributes;
  const form = useForm<TFIeldPropSchema>({
    defaultValues: {
      label: label,
      placeHolder: placeHolder,
      helperText: helperText,
      required: required
    }
  });

  const { register, handleSubmit, formState } = form;
  const { errors,isSubmitting } = formState;
  const { updateElement } = useDesigner();

  function update(values: TFIeldPropSchema) {
    const { label, placeHolder, helperText, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        placeHolder,
        helperText,
        required: isRequired
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
            <div className="flex justify-between">
              <Label htmlFor="username" className="text-right">
                Required
              </Label>
              <div className="flex items-center justify-between space-x-2">
                <Switch
                  defaultChecked={isRequired} 
                  onCheckedChange={()=>{
                    setIsRequired(!isRequired)
                  }}
                  id="airplane-mode"
                  {...register("required")} 
                />                
                <Label htmlFor="airplane-mode">Required</Label>
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
