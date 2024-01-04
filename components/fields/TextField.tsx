"use client"

import { ElementsType, FormElement, FormElementInstance } from "@/types/form"
import { MdTextFields } from 'react-icons/md'
const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes: {
            label: "Text tield",
            helperText: "Helper text",
            required: false,
            placeHolder: "Values here..."
        }
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field"
    },
    designerComponent: designerComponent,
    formComponent: () => <div>Form Component</div>,
    propertiesComponent: () => <div>Properties Component</div>,
}

function designerComponent({
    elementInstance
}: { elementInstance: FormElementInstance }) {
    return (
        <div className="w-full h-20 rounded-lg bg-black  mb-3 text-white">
        </div>
    )
}