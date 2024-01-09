import * as z from "zod";

export const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
  });

export type TFIeldPropSchema = z.infer<typeof propertiesSchema>

export const FormCreatetiesSchema = z.object({
  name: z.string().min(4, "name must have than 4 characters"),
  discription: z.string().optional()
})

export type TFormCreatetiesSchema = z.infer<typeof FormCreatetiesSchema>