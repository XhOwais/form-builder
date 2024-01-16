import { CustomInstance } from "@/components/fields/TextField";
import { UseFormRegister } from "react-hook-form";

export type SignValues = {
    username: string;
    email: string;
    password: string;
}

export type ElementsType =
    "TextField"
    | "NumField"
    | "TextAreaField";

export type FormElement = {

    type: ElementsType;

    construct: (id: string) => FormElementInstance;
    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };
    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        register: any,
    }>;
    propertiesComponent: React.FC<{
         element: CustomInstance;
    }>;
}

export type FieldType = {
    label: string;
    placeHolder: string;
    helperText: string;
    required: boolean;
}
export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>
}
export type FormElemetsType = {
    [key in ElementsType]: FormElement
};

export type Form =
    {
        id: number;
        userId: number;
        createdAt: Date;
        publish: boolean;
        name: string;
        discription: string;
        content: string;
        visitors: number;
        submission: number;
        shareUrl: string;
    }
export type Forms = Form[]
    