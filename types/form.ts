export type SignValues = {
    username: string;
    email: string;
    password: string;
}

export type ElementsType =
    "TextField"
    | "NumField";

export type FormElement = {

    type: ElementsType;

    construct: (id: string) => FormElementInstance;
    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };
    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
      }>;
    propertiesComponent: React.FC;
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

