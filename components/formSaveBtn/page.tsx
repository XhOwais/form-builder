import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { HiSaveAs } from "react-icons/hi";
import { MdOutlinePublish } from "react-icons/md";
import useDesigner from "../hooks/useDesigner";
import { UpdateForm } from "@/actions/form";
import { toast } from "../ui/use-toast";
import { FaSpinner } from "react-icons/fa";

function SaveFormBtn({ type, id, formId, publish }: { type: string, id: number, formId: number, publish: boolean }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      console.log(jsonElements)
      await UpdateForm(jsonElements, 2, formId, publish);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
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