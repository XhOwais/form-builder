"use client"

import { FormElementInstance } from "@/types/form"
import { ReactNode, createContext, useState } from "react";

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance)=> void;
    removeElement: (id: string) => void;
    updateElement: (id: string, element: FormElementInstance) => void;
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
    const updateElement = (id: string, element: FormElementInstance) => {
        setElements((prev)=> {
            const newElement = [...prev];
            const index = newElement.findIndex((el)=> el.id == id);
            newElement[index] = element;
            return newElement
        })
    }
    return <DesignerContext.Provider value={{
        elements,
        addElement,
        removeElement,
        updateElement,
    }}>{children}</DesignerContext.Provider>
}