"use server"

import { TFormCreatetiesSchema } from "@/utils/Field-properties";
import { PrismaClient } from "@prisma/client"
import { boolean } from "zod";

const prisma = new PrismaClient();

export async function CreateForm(data: TFormCreatetiesSchema, userId: number) {

    const { name, discription } = data;

    const form = await prisma.form.create({
        data: {
            userId: userId,
            name,
            discription,
            content: ''
        }
    })

    if (!form) throw new Error("Something went wrong")
    return form.id
}

export async function UpdateForm(content: string, userId: number, formId: number, publish: boolean) {

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
        }
    })
    console.log(form)
    return form
}

export async function GetFormById(formId: number) {
    
    const form = await prisma.form.findUnique({
        where: {
            id: formId
        },
    })

    return form
}

export async function GetForm(uuid:string) {
    
    const form = await prisma.form.findFirst({
        where: {
            shareUrl: uuid
        }
    })
    
    return form
}

export async function GetUserForm(userId: number, publish: boolean) {

    const forms = await prisma.form.findMany({
        where: {
            userId,
            publish,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return forms
}

export async function FormDelete(id:number, userId: number, publish: boolean) {
    const forms = await prisma.form.delete({
        where: {
            userId,
            id,
        },
    })
   const formsRetun =    GetUserForm(userId, publish);
    return formsRetun
}