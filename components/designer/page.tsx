import React, { useState } from 'react'
import { Card } from '../ui/card'
import { useDndMonitor, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { ElementsType, FormElementInstance } from '@/types/form'
import useDesigner from '../hooks/useDesigner'
import { FormElements } from '../form-elements/page'
import { idGenerator } from '@/lib/idGenertor'

export const Designer = () => {

  const {elements, addElement} = useDesigner()
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesifnerDropAre: true,
    }
  })
  useDndMonitor({
    onDragEnd(event) {
      const {active, over} = event;
      if(!active || !over) return;

      const isDesignerBtnElement = active.data.current?.isDesignerElementBtn;
      console.log(isDesignerBtnElement)

      if(isDesignerBtnElement){
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        )
        console.log("new Element",newElement)
        addElement(0, newElement)
      }
      console.log("Drag End", event)
    },
  })
  console.log(elements)
  return (
    <Card ref={droppable.setNodeRef} className={cn(" transition-all w-[600px] px-4 py-4 min-h-[330px] place-self-center",
      droppable.isOver && "opacity-60 border w-[620px] min-h-[330px]  ")}>
      {droppable.isOver && (
        <div className=' w-full h-20 rounded-lg bg-black'></div>
      )}
      {elements.length > 0  && (
        elements.map(element => (
          <DesignerElementWrapper element={element} key={element.id} />
        ))
      )}
    </Card>
  )
}

function DesignerElementWrapper(
  {element} : {element: FormElementInstance}
) {

  const DesignerElement = FormElements[element.type].designerComponent;
  return <DesignerElement elementInstance={element}/>;
}
