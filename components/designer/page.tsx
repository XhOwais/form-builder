import React, { useState } from 'react'
import { Card } from '../ui/card'
import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { ElementsType, FormElementInstance } from '@/types/form'
import useDesigner from '../hooks/useDesigner'
import { FormElements } from '../form-elements/page'
import { idGenerator } from '@/lib/idGenertor'
import { GripHorizontal, Trash2 } from 'lucide-react'

export const Designer = () => {

  const { elements, addElement, removeElement } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesifnerDropAre: true,
    }
  })
  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data.current?.isDesignerElementBtn;
      console.log(isDesignerBtnElement)

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        )
        console.log("new Element", newElement)
        addElement(0, newElement)
      }
      console.log("Drag End", event)
    },
  })

  console.log(elements)
  return (
    <Card ref={droppable.setNodeRef} className={cn(" transition-all w-[600px] px-4 py-4 min-h-[330px] place-self-center",
      droppable.isOver && elements.length === 0 && "opacity-80 border w-[620px] min-h-[330px]  ", droppable.isOver && elements.length > 0 && "w-[620px] min-h-[330px]")}>
      {elements.length > 0 && (
        elements.toReversed().map(element => (
          <div className=' flex items-center justify-between gap-4'>
            <GripHorizontal className=' cursor-grab' />
            <div className=' w-full'>
              <DesignerElementWrapper element={element} key={element.id} />
            </div>
            <Trash2 onClick={()=> {
              removeElement(element.id)
            }} />
          </div>
        ))
      )}
      {droppable.isOver && (
        <div className=' w-full  h-20 rounded-lg bg-black mt-4'></div>
      )}
    </Card>
  )
}

function DesignerElementWrapper(
  { element }: { element: FormElementInstance }
) {

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true
    }
  });
  const halfBottom = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true
    }
  });



  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div>
      {/* <div className=' w-full h-6 rounded-md bg-slate-200'></div> */}
      <DesignerElement elementInstance={element} />
      {/* <div className=' w-full h-6 rounded-md bg-slate-200'></div> */}
    </div>
  );
}
