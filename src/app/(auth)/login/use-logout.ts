import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "@/services/api-auth";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { logout: clientLogout } = useAuth();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            clientLogout();
            queryClient.removeQueries();
            document.cookie =
                "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
            router.push("/login");
        },

        onError: () => {
            toast.warning("Something when wrong");
        },
    });

    return { logout, isPending };
};
