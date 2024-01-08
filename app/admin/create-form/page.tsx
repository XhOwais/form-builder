'use client'
import { Designer } from '@/components/designer/page'
import DragOverlyWrapper from '@/components/dragoverly.tsx/page'
import { FormElements } from '@/components/form-elements/page'
import { FormPreview } from '@/components/form-preview/page'
import SidebarBtnElement from '@/components/sideBarElementBtn/page'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DndContext } from '@dnd-kit/core'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Eye, GripHorizontal, Pencil, Plus, Share2 } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {

    const { data: session } = useSession();


    return (
        <DndContext>
            <main className="flex overflow-hidden">
            <div className=' w-full h-screen relative bg-opacity-40 grid bg-60' >
                <Card className=" fixed flex px-2 items-center gap-4 top-10 left-4 w-[180px] h-[60px] place-self-center rounded-full">
                    <Avatar className='  w-12'>
                        <AvatarImage className=' w-12 rounded-full' src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div className=' opacity-60'>
                    <Plus />
                    </div>
                    <div className='opacity-60'>
                    <Share2 />
                    </div>
                </Card>
                <Designer/>
                <div className=' absolute top-0 z-[-1] opacity-60 w-full h-full  bg-[url(/polka-dots.svg)] '>

                </div>
            </div>
            <aside id="default-sidebar" className=" w-[450px] h-screen transition-transform -translate-x-full  sm:translate-x-0" aria-label="Sidebar">

                {/* <div className=' w-full h-32 bg-gray-50  border-b'>

                </div> */}
                <div className=' w-full h-32 bg-gray-50  border-b'>
                    <div className=' px-8 pt-8'>
                        <h2 className='pb-2 font-bold w-full flex justify-between'>
                            Contact Form
                            <span>
                                <Pencil className=' w-8' />
                            </span>
                        </h2>
                        <p className=' text-xs'> Find in-depth information about Next.js features and API.</p>
                    </div>
                </div>
                <div className="h-full px-4 py-8 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <span className=' text-xs'>
                        <h2 className=' py-6'>
                            Form Elements
                        </h2>
                    </span>
                    <ul className=" font-medium grid grid-cols-1 grid-flow-row gap-x-2 gap-y-4 ">
                        <SidebarBtnElement  formElement={FormElements.TextField}/>
                        <SidebarBtnElement  formElement={FormElements.NumField}/>
                        <SidebarBtnElement  formElement={FormElements.TextAreaField}/>
                        <a
                            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                            className="group rounded-lg flex items-center gap-4 border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GripHorizontal />
                            <span>
                                <h2 className={` mb-1 text-md font-semibold`}>
                                    Checkbox
                                </h2>
                                <p className={`m-0 max-w-[30ch] text-xs opacity-50`}>
                                    Find in-depth information about Next.js
                                </p>
                            </span>
                        </a>
                        <a
                            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                            className="group rounded-lg flex items-center gap-4 border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GripHorizontal />
                            <span>
                                <h2 className={` mb-1 text-md font-semibold`}>
                                    Button
                                </h2>
                                <p className={`m-0 max-w-[30ch] text-xs opacity-50`}>
                                    Find in-depth information about Next.js
                                </p>
                            </span>
                        </a>
                        {/* </div> */}
                    </ul>
                    <div className=' w-full h-10 fixed bottom-4 flex justify-end  px-12 gap-4'>
                        <FormPreview/>
                        <Button variant={"ghost"}>
                            Save
                        </Button>
                        <Button>
                            Publish
                        </Button>
                    </div>
                </div>
            </aside>
        </main>
        <DragOverlyWrapper/>
        </DndContext>
    )
}
