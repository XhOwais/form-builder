export type SignValues = {
    username: string;
    email: string;
    password: string;
}

export type ElementsType = "TextField";

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
    formComponent: React.FC;
    propertiesComponent: React.FC;
}

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>
}
export type FormElemetsType = {
    [key in ElementsType]: FormElement
};

