"use client"

import { FormElementInstance } from "@/types/form"
import { ReactNode, createContext, useState } from "react";

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance)=> void;
    removeElement: (id: string) => void
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {

    
    const [elements, setElements] = useState<FormElementInstance[]>([])
    const addElement = (index: number, element: FormElementInstance)=> {
        setElements(prev => {
            const newElement = [...prev];
            newElement.splice(index, 0, element)
            return newElement
        })
    };
    const removeElement = (id: string) => {
        setElements((prev) => prev.filter((elment) => elment.id !== id));
      };
    
    return <DesignerContext.Provider value={{
        elements,
        addElement,
        removeElement
    }}>{children}</DesignerContext.Provider>
}