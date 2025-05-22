"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/services/api-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/types";
import { useAuth } from "@/contexts/auth-context";

interface LoginCredentials {
    email: string;
    password: string;
}

export const useLogin = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { login: authLogin } = useAuth();
    const { mutate: login, isPending } = useMutation<
        User,
        Error,
        LoginCredentials
    >({
        mutationFn: ({ email, password }) => loginApi(email, password),
        onSuccess: data => {
            authLogin(data.token, data.user);
            document.cookie = `authToken=${data.token}; Path=/; Secure; SameSite=Strict; Max-Age=86400`;
            queryClient.setQueryData(["user"], data.user);
            router.push("/");

            toast.success("You have successfully logged in!", {
                id: "login-toast",
            });
        },
        onError: error => {
            toast.error(error.message, {
                id: "login-toast",
            });
        },
    });

    return { login, isPending };
};
