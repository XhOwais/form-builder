"use client"

import { ElementsType, FormElement, FormElementInstance } from "@/types/form"
import { MdTextFields } from 'react-icons/md'
import { Input } from "../ui/input";
import { Settings } from "lucide-react";
import { DialogDemo } from "../dialog/page";
import { FormPreview } from "../form-preview/page";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text Field",
    helperText: "Helper text",
    required: true,
    placeHolder: "Values here..."
}
export const TextFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field"
    },
    designerComponent: designerComponent,
    formComponent: formComponent,
    propertiesComponent: () => <div>Properties Component</div>,
}

export type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}

function designerComponent({
    elementInstance
}: { elementInstance: FormElementInstance }) {

    const element = elementInstance as CustomInstance;
    const {label, placeHolder, required, helperText} = element.extraAttributes;
    return (
        <div className="w-full h-20 flex flex-col justify-between rounded-lg  mb-3 text-white o-100">
            <div className="w-full h-8 text-black rounded-t-lg px-1 pt-1">
                <h2 className={` mb-1 text-md font-semibold flex justify-between`}>
                    <div>
                    {label}
                    {required && " *"}
                    </div>
                    <DialogDemo element={element}  />
                </h2>
            </div>
            <Input className=" text-black o-100 font-semibold" placeholder={placeHolder} />
        </div>
    )
}

function formComponent({
    elementInstance
}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const {label, placeHolder, required, helperText} = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
      <Label className={cn("")}>
        {label}
        {required && "*"}
      </Label>
      <Input
        className={cn("")}
        placeholder={placeHolder}
      />
      {/* {helperText && <p className={cn("text-muted-foreground text-[0.8rem]","text-red-500")}>{helperText}</p>} */}
    </div>
    )
}