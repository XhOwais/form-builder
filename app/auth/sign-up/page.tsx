
"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInFormSchema } from "@/utils/form-validations"
import { SignValues } from "@/types/form"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Component() {

    const [signInError, setSignInError] = useState<string>();
    const router = useRouter();

    const form = useForm<SignValues>({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
        resolver: zodResolver(SignInFormSchema)
    });

    const { register, handleSubmit, formState } = form;
    const {errors, isSubmitting} = formState;

    const handleSingIn = async(data: SignValues)=> {
        try{

            const res = await signIn('credentials',{
                username: data.username,
                email: data.email,
                password: data.password,
                action: 'signup',
                redirect: false
            })
            if(res?.error) {
                setSignInError("invalid Cridentials!")
            } else {
                router.push('/admin')
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <main className=" flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(handleSingIn)}>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                    <CardDescription>Enter your username, email and password to Sign Up to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="Mr xyz" required type="text" {...register("username")}/>
                        </div>
                        <p className="error">{errors.username?.message}</p>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="m@example.com" required type="email" {...register("email")}/>
                        </div>
                        <p className="error">{errors.email?.message}</p>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" required type="password" {...register("password")} />
                        </div>
                        <p className="error">{errors.password?.message}</p>
                        {signInError? signInError : ''}
                        <Button disabled={isSubmitting} className="w-full" type="submit">
                            Sign Up
                        </Button>
                    </div>
                </CardContent>
            </Card>
            </form>
        </main>
    )
}

