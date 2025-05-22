"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useUpdatePassword } from "@/app/(app)/account/use-update-password";
import { useAuth } from "@/contexts/auth-context";

const formSchema = z
    .object({
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        confirmPassword: z.string().min(8, {
            message: "Confirm password must be at least 8 characters.",
        }),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    });

type UpdatePasswordForm = {
    password: string;
    confirmPassword: string;
};

const UpdatePassword: React.FC = () => {
    const { user } = useAuth();
    const { updatePassword, isPending } = useUpdatePassword();

    const form = useForm<UpdatePasswordForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<UpdatePasswordForm> = data => {
        updatePassword(
            { newPassword: data.password, userId: user?.id },
            {
                onSettled: () => {
                    form.reset();
                },
            },
        );
        toast.loading("Updating your password...", {
            id: "update-password-toast",
        });
    };

    return (
        <div className="flex flex-col items-end w-full max-w-[700px]">
            <Card className="w-full h-[400px] p-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            placeholder="New password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            placeholder="Confirm new password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full md:w-auto gap-2"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Spinner size="small" className="text-white" />
                            ) : (
                                "Update"
                            )}
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

export default UpdatePassword;
