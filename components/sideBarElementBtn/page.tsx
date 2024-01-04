'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FormElement } from '@/types/form'
import { useDraggable } from '@dnd-kit/core'
import { GripHorizontal, icons } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SidebarBtnElement(
    { formElement }: { formElement: FormElement }
) {

    const { label, icon: Icon } = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerElementBtn: true
        }
    })
    return (
        <>
            <div
                className={cn("group flex items-center gap-4 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30", draggable.isDragging && " opacity-25")}
                ref={draggable.setNodeRef}
                {...draggable.listeners}
                {...draggable.attributes}
            >
                <Icon/>
                <span>
                    <h2 className={` mb-1 text-md font-semibold`}>
                        {label}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-xs opacity-50`}>
                        Find in-depth information about Next.js
                    </p>
                </span>
            </div>
        </>
    )
}
export  function SidebarBtnElementDragOverly(
    { formElement }: { formElement: FormElement }
) {

    const { label, icon: Icon } = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerElementBtn: true
        }
    })
    return (
        <>
            <div
                className="group flex items-center gap-4 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
                <Icon/>
                <span>
                    <h2 className={` mb-1 text-md font-semibold`}>
                        {label}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-xs opacity-50`}>
                        Find in-depth information about Next.js
                    </p>
                </span>
            </div>
        </>
    )
}
