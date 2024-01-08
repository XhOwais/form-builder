import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SidebarBtnElementDragOverly } from '../sideBarElementBtn/page'
import { FormElements } from '../form-elements/page'
import { ElementsType } from '@/types/form'
import useDesigner from '../hooks/useDesigner'

function DragOverlyWrapper() {

    const { elements } = useDesigner();

    const [draggedItem, setDraggedItem] = useState<Active | null>(null)
    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active)
            console.log(draggedItem)
        },
        onDragCancel: () => {
            setDraggedItem(null)
        },
        onDragEnd: () => {
            setDraggedItem(null)
        }
    })

    if (!draggedItem) return null;
    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerElementBtn;
    let node = <div>No Drag overly!</div>
    if (isSidebarBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType;
        node = <SidebarBtnElementDragOverly formElement={FormElements[type]} />
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    if (isDesignerElement) {
        const elementId = draggedItem.data?.current?.elementId;
        const element = elements.find((el) => el.id === elementId);
        if (!element) node = <div>Element not found!</div>;
        else {
            const DesignerElementComponent = FormElements[element.type].designerComponent;

            node = (
                <div className=" w-[400px] rounded-md bg-white px-10 py-4">
                    <DesignerElementComponent elementInstance={element} />
                </div>
            );
        }
    }

    return <DragOverlay className=''>{node}</DragOverlay>;
}

export default DragOverlyWrapper