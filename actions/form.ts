"use server"

import { TFormCreatetiesSchema } from "@/utils/Field-properties";
import { PrismaClient } from "@prisma/client"
import { json } from "stream/consumers";
import { boolean } from "zod";

const prisma = new PrismaClient();

export async function CreateForm(data: TFormCreatetiesSchema, userId: number, zodValidation: any) {

    try {
        const { name, discription } = data;

        const form = await prisma.form.create({
            data: {
                userId: userId,
                name,
                discription,
                content: '',
                zodValidation: ''
            }
        })

        if (!form) throw new Error("Something went wrong")
        return form.id
    } catch (error) {
        return
    }
}

export async function UpdateForm(content: string, userId: number, formId: number, publish: boolean, zodSchema: any) {

    try {
        if (!userId) {
            throw new Error("User Id is required")
        }
        const form = await prisma.form.update({
            where: {
                id: formId,
                userId: userId
            },
            data: {
                content,
                publish,
                zodValidation: JSON.stringify(zodSchema)
            }
        })

        console.log(form)
        return form
    } catch (error) {
        return
    }
}

export async function GetFormById(formId: number) {

    try {
        const form = await prisma.form.findUnique({
            where: {
                id: formId
            },
        })

        if (form?.id) {
            return form

        }

        return

    } catch (error) {
        return
    }
}
export async function GetFormSubmission(formId: number) {

        const form = await prisma.form.findUnique({
            where: {
                id: formId
            },
            select: {
                FormSubmission: true
            }
        })


        return form

}

export async function GetForm(uuid: string) {

    try {



        return await prisma.form.findFirst({
            where: {
                shareUrl: uuid,
            },
            select: {
                content: true,
                id: true,
                name: true,
                discription: true,
                publish: true
            },
        })
    } catch (error) {
        return
    }
}

export async function GetUserForm(userId: number, publish: boolean) {

    try {
        const forms = await prisma.form.findMany({
            where: {
                userId,
                publish,
            },
            include: {
                FormSubmission: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        if (!forms) {
            return
        }
        const count = forms.map((form) => form.FormSubmission.length)
        return forms
    } catch (err) {
        return
    }
}

export async function FormDelete(id: number, userId: number, publish: boolean) {
    try {
        const forms = await prisma.form.delete({
            where: {
                userId,
                id,
            },
        })
        const formsRetun = GetUserForm(userId, publish);
        return formsRetun
    } catch (error) {
        return
    }
}

export async function FormSubmit(formId: number, content: string) {


    try {

        const formSubmit = await prisma.form.update({
            where: {
                id: formId,
                publish: true,
            },
            data: {
                submission: {
                    increment: 1
                },
                FormSubmission: {
                    create: {
                        content,
                    }
                }
            }
        })

        return formSubmit.id
    } catch (error) {
        return
    }
}