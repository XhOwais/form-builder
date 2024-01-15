'use client'
import { FormDelete, GetFormSubmission } from '@/actions/form'
import { CreateFormPopup } from '@/components/createFormPopup/page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdPublishedWithChanges } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import { FaEdit, FaSpinner } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { Form, FormSubmission } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'


export default function submission(params: any) {

    const { data: session } = useSession();
    const [form, setForm] = useState<Form>()
    const [submission, setSubmission] = useState<FormSubmission[]>();
    const [content, setContent] = useState<FormSubmission[]>();
    const [loading, setLoading] = useState<number | null>()
    const router = useRouter();

    useEffect(() => {
        const Submissions = async () => {
            const data = await GetFormSubmission(parseInt(params.params.id));
            if (data?.FormSubmission) {
                setSubmission(data?.FormSubmission)
            }
            console.log(submission)
        }
        Submissions()
    }, [params.params.id]);

    const Content = (id: number)=>{
        console.log(id)
        const submitData = submission?.filter((elment) => elment.id == id)
        if(submitData !== undefined) {
            setContent(submitData);
        }
        console.log(content)

    }

    return (
        <main className="flex min-h-screen flex-col items-center  gap-16 py-24 px-16">
            <div className="z-10 px-28 w-full items-center justify-between font-mono text-sm flex">
                <div className="bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
                    <Image
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        className="dark:invert"
                        width={100}
                        height={24}
                        priority
                    />
                </div>
                <Button onClick={
                    () => {
                        signOut()
                    }
                }>
                    Sign Out
                </Button>
            </div>
            <div className="w-full flex gap-2 h-[400px]">
                <Card className='w-full flex flex-col  gap-4 h-full'>
                    {content?.map((items)=> (
                        <div key={items.id}>{items.content}</div>
                    ))}
                </Card>
            </div>
            <Card className='w-1/2 flex flex-col  gap-4 h-full'>
                <CardHeader>
                    <CardTitle className=' flex justify-between items-center' >
                        <div className=' text-xl font-bold flex items-center gap-4 '>Submission List <RiDraftFill className=" text-orange-700 size-8" /></div>
                        <div><Button variant={"ghost"}>View all</Button></div>
                    </CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <div className=' px-4 flex flex-col justify-center gap-3 pb-8'>
                    {submission?.map((forms) => (
                        <Card className=' w-full h-20 bg-[#000000ba] flex justify-between items-center px-4' onClick={()=>{
                            Content(forms.id)
                        }} key={forms.id}>
                            <CardHeader>
                                <CardTitle className=' text-white'>Name</CardTitle>
                                <CardDescription className=' text-slate-200'>index Number</CardDescription>
                            </CardHeader>
                            <div>
                                <Avatar>
                                    <AvatarImage className=' size-14 rounded-full' src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </main>
    )
}
