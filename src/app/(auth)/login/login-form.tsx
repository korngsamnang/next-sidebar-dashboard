"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/app/(auth)/login/use-login";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(3, {
        message: "Password must be at least 8 characters.",
    }),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
    const { login, isPending } = useLogin();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        login(data, {
            onSettled: () => {
                form.reset();
            },
        });
        toast.loading("Logging in...", {
            id: "login-toast",
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md border-none shadow-lg p-4">
                <CardHeader className="pb-0">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center justify-center space-x-4">
                            <Image
                                src="/mef-logo-no-bg.png"
                                alt="MEF Logo"
                                width={70}
                                height={70}
                                className="object-contain"
                            />
                            <Image
                                src="/sdf-logo-no-bg.png"
                                alt="SDF Logo"
                                width={70}
                                height={70}
                                className="object-contain"
                            />
                        </div>
                        <div className="text-center space-y-1">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                SDF Training Profile
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Ministry of Economy and Finance Collaboration
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full"
                            >
                                {isPending ? (
                                    <Spinner
                                        size="small"
                                        className="text-white"
                                    />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
