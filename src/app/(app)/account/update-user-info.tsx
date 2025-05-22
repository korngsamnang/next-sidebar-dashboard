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
import { useUpdateUser } from "@/app/(app)/account/use-update-user";
import { useAuth } from "@/contexts/auth-context";

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email(),
});

interface UpdateUserInfoFormInputs {
    firstName: string;
    lastName: string;
    email: string;
}

const UpdateUserInfo = () => {
    const { user } = useAuth();
    const { updateUser, isPending } = useUpdateUser();

    const form = useForm<UpdateUserInfoFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user?.first_name || "",
            lastName: user?.last_name || "",
            email: user?.email || "",
        },
    });

    const onSubmit: SubmitHandler<UpdateUserInfoFormInputs> = ({
        firstName,
        lastName,
    }) => {
        toast.loading("Updating your user data info...", {
            id: "update-user-toast",
        });
        updateUser({ firstName, lastName, userId: user?.id });
    };

    return (
        <div className="flex flex-col w-full max-w-[700px]">
            <Card className="w-full h-[400px] p-8">
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
                                        <Input {...field} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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

export default UpdateUserInfo;
