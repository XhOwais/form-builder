import { FormElemetsType } from "@/types/form";
import { TextFieldFormElement } from "../fields/TextField";
import { NumFieldFormElement } from "../fields/NumField";
import { TextAreaField } from "../fields/TextAreaField";

export const FormElements: FormElemetsType = {
    TextField: TextFieldFormElement,
    NumField: NumFieldFormElement,
    TextAreaField: TextAreaField
}