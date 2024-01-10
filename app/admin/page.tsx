'use client'
import { GetUserForm, FormDelete } from '@/actions/form'
import { CreateFormPopup } from '@/components/createFormPopup/page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Forms } from '@/types/form'
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


export default function Admin() {

  const { data: session } = useSession();
  const [publishedForm, setPublishedForm] = useState<Forms>()
  const [draftedForm, setDraftedForm] = useState<Forms>()
  const [loading, setLoading] = useState<number | null>()
  const router = useRouter()
  
  useEffect(() => {
    const Published = async () => {
      const data = await GetUserForm(2, true);
      setPublishedForm(data)
    }
    Published()
    const Drafted = async () => {
      const data = await GetUserForm(2, false);
      setDraftedForm(data)
    }
    Drafted()
    console.log(publishedForm)
  }, [session?.user.id]);
  if (!session?.user) return;

  const edit = (id: number)=>{
    router.push(`/admin/form-builder/${id}edit`)
  }
  const deleteForm = async (id: number, userId: string, publish: boolean) => {
    setLoading(id)
    const res = await FormDelete(id, parseInt(userId), publish);
    if (publish) {
      setPublishedForm(res)
      setLoading(null)
    } else {
      setDraftedForm(res)
    }
    setLoading(null)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-12">
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
      <div className=" mb-10 grid items-center gap-2 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>


        <div className=' flex gap-3'>
          <CreateFormPopup />
        </div>
      </div>
      <div className="w-full flex gap-2 h-[400px]">
        <Card className='w-1/2 flex flex-col  gap-4 h-full'>
          <CardHeader>
            <CardTitle className=' flex justify-between items-center' >
              <div className=' text-xl font-bold flex items-center gap-4 '>Published Forms <MdPublishedWithChanges className=" text-green-700 size-8" /></div>
              <div><Button variant={"ghost"}>View all</Button></div>
            </CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <div className=' px-4 flex flex-col justify-center gap-3'>
            {publishedForm?.slice(0, 3).map((forms) => (
              <Card className=' w-full h-20 bg-[#000000ba] flex justify-between' key={forms.id}>
                <CardHeader>
                  <CardTitle className=' text-white'>{forms.name}</CardTitle>
                  <CardDescription className=' text-slate-200'>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <div>

                </div>
                <div className='h-full flex items-center gap-4 pr-4'>
                  <div className=' flex items-center gap-4'>
                    <div className=' flex items-center gap-4'>
                      <Card className=' flex items-center bg-[#0000] justify-center font-extrabold text-white size-4'>22</Card>
                      <HiCursorClick className="text-white" />
                    </div>
                    <div className=' flex items-center gap-4'>
                      <Card className=' flex items-center bg-[#0000] justify-center font-extrabold text-white size-4'>22</Card>
                      <TbArrowBounce className="text-white" />
                    </div>
                    <div className=' flex items-center gap-4'>
                      {/* <Card className=' flex items-center bg-[#0000] justify-center font-extrabold text-white size-4'>22</Card> */}
                      <FaEye onClick={()=>{
                        router.push(`/${forms.shareUrl}`)
                      }} className="text-white size-7 hover:text-green-700" />
                    </div>
                  </div>
                  <Button onClick={()=>{
                    edit(forms.id)
                  }} variant={"default"} className=' flex gap-2'>
                    Edit  <FaEdit />
                  </Button>
                  <Button disabled={loading == forms.id} onClick={() => {
                    deleteForm(forms.id, session.user.id, forms.publish)
                  }} variant={"destructive"} className=' flex gap-2'>
                    Delete {loading == forms.id?  <FaSpinner className="animate-spin" /> : <MdDeleteForever/>}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className='w-1/2 flex flex-col  gap-4 h-full'>
          <CardHeader>
            <CardTitle className=' flex justify-between items-center' >
              <div className=' text-xl font-bold flex items-center gap-4 '>Drafted Forms <RiDraftFill className=" text-orange-700 size-8" /></div>
              <div><Button variant={"ghost"}>View all</Button></div>
            </CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <div className=' px-4 flex flex-col justify-center gap-3'>
            {draftedForm?.slice(0, 3).map((forms) => (
              <Card className=' w-full h-20 bg-[#000000ba] flex justify-between' key={forms.id}>
                <CardHeader>
                  <CardTitle className=' text-white'>{forms.name}</CardTitle>
                  <CardDescription className=' text-slate-200'>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <div className='h-full flex items-center gap-4 pr-4'>
                  <div className=' flex items-center gap-4'>
                    <div className=' flex items-center gap-4'>
                      <Card className=' flex items-center bg-[#0000] justify-center font-extrabold text-white size-4'>22</Card>
                      <HiCursorClick className="text-white" />
                    </div>
                    <div className=' flex items-center gap-4'>
                      <Card className=' flex items-center bg-[#0000] justify-center font-extrabold text-white size-4'>22</Card>
                      <TbArrowBounce className="text-white" />
                    </div>
                    <div className=' flex items-center gap-4'>
                      {/* <Card className=' flex items-center bg-[#0000] justify-center font-extrabold text-white size-4'>22</Card> */}
                      <FaEye onClick={()=>{
                        router.push(`/${forms.shareUrl}`)
                      }} className="text-white size-7 hover:text-green-700" />
                    </div>
                  </div>
                  <Button onClick={()=>{
                    edit(forms.id)
                  }} variant={"default"} className=' flex gap-2'>
                    Edit  <FaEdit />
                  </Button>
                  <Button onClick={() => {
                    deleteForm(forms.id, session.user.id, forms.publish)
                  }} variant={"destructive"} className=' flex gap-2'>
                    Delete {loading == forms.id?   <FaSpinner className="animate-spin" /> : <MdDeleteForever/>}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

      </div>


      <div className=' flex gap-3'>
        <CreateFormPopup />
      </div>
    </main>
  )
}
