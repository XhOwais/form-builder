import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SidebarBtnElementDragOverly } from '../sideBarElementBtn/page'
import { FormElements } from '../form-elements/page'
import { ElementsType } from '@/types/form'

function DragOverlyWrapper() {

    const [draggedItem, setDraggedItem] = useState<Active | null>(null)
    useDndMonitor({
        onDragStart: (event)=> {
            setDraggedItem(event.active)
            console.log(draggedItem)
        },
        onDragCancel: ()=> {
            setDraggedItem(null)
        },
        onDragEnd: ()=> {
            setDraggedItem(null) 
        }
    })
    
    if(!draggedItem) return null;
    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerElementBtn;
    let node = <div>No Drag overly!</div>
    if(isSidebarBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType;
        node = <SidebarBtnElementDragOverly  formElement={FormElements[type]}/>
    }
  return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlyWrapper