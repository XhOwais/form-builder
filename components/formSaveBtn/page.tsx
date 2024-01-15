import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { HiSaveAs } from "react-icons/hi";
import { MdOutlinePublish } from "react-icons/md";
import useDesigner from "../hooks/useDesigner";
import { UpdateForm } from "@/actions/form";
import { toast } from "../ui/use-toast";
import { FaSpinner } from "react-icons/fa";
import { CustomInstance } from "../fields/TextField";
import * as z from 'zod';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function SaveFormBtn({ type, id, formId, publish }: { type: string, id: number, formId: number, publish: boolean }) {
  const { elements } = useDesigner();
  const {data: session} = useSession();
  const [loading, startTransition] = useTransition();
  const [schema, setSchema] = useState();
  const router = useRouter();

  const element = elements as unknown as CustomInstance[];
  

  const updateFormContent = async () => {
    const zodSchema = element.reduce((acc: Record<string, any>, element) => {
      const { label, min, max, required } = element.extraAttributes;
      acc[label] =
        element.type == "TextField"
          ? (required ? z.string().min(min).max(max) : z.string().optional()) :
           element.extraAttributes.email ? z.string().email()
          : element.type == 'NumField' ? z.number() : 
          element.type == 'TextAreaField' ? 
          z.string() : null
      return acc;
    }, []);
    console.log(zodSchema)
    try {
      const jsonElements = JSON.stringify(elements);
      console.log(jsonElements)
      const formUpdated = await UpdateForm(jsonElements, parseInt(session?.user.id as string), formId, publish, zodSchema);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
      if(formUpdated?.id && type === 'Publish'){
        router.push(`/${formUpdated?.shareUrl}`)
      } else {
        router.push('/admin')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={type === "Publish" ? "default" : "outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      {type === "Save" ? (<HiSaveAs className="h-4 w-4" />
      ) : (<MdOutlinePublish className="h-4 w-4" />)}
      {type}
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;