import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { useForm } from "react-hook-form"
import { useAction } from "next-safe-action/hooks"
import { FormCreateSchema, TFormCreatetiesSchema } from "@/utils/Field-properties"
import { CreateForm, CreateSaveForm } from "@/actions/form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaSpinner } from "react-icons/fa"

export function CreateFormPopup() {

  const { data: session } = useSession();
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<TFormCreatetiesSchema>({
    defaultValues: {
      name: "",
      discription: ""
    },
    resolver: zodResolver(FormCreateSchema)
  })
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { execute, status, result } = useAction(CreateSaveForm, {
    onSuccess(data) {
      if (data) {
        form.reset()
        router.push(`/admin/form-builder/${data}`)
      } else {
        toast({
          title: "Error",
          description: "Something went wrong, please try again later",
          variant: "destructive",
        });
      }
    },
    onError(error) {
      toast({
        title: "Error",
        description: `Something went wrong, please try again later ${error}`,
        variant: "destructive",
      });
    }
  })

  // async function onSubmit(values: TFormCreatetiesSchema) {
  //   if (session?.user.id) {
  //     try {
  //       const formId = await CreateForm(values, parseInt(session.user.id), '');
  //       toast({
  //         title: "Success",
  //         description: "Form created successfully",
  //       });
  //       form.reset()
  //       router.push(`/admin/form-builder/${formId}`);
  //     } catch (error) {
  //       toast({
  //         title: "Error",
  //         description: "Something went wrong, please try again later",
  //         variant: "destructive",
  //       });
  //     }
  //   } 
  // }
  async function onSubmit(values: TFormCreatetiesSchema) {

    execute({
      data: values,
      userId: parseInt(session?.user.id as string),
      zodValidation: ''
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create Form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form {...form} onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Form</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("name")} />
              {errors && <p className="col-span-4 flex justify-end float-end text-red-700 ">{errors.name?.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Discription
              </Label>
              <Textarea id="username" className="col-span-3" {...register("discription")} />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={status === 'executing'} type="submit">Create {status === 'executing' && <FaSpinner className="animate-spin ml-4" />}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
