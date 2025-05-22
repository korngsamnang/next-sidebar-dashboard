import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "@/services/api-auth";
import { toast } from "sonner";

interface UpdatePasswordParams {
    newPassword: string;
    userId: string;
}

export const useUpdatePassword = () => {
    const {
        mutate: updatePassword,
        isPending,
    }: {
        mutate: (params: UpdatePasswordParams) => void;
        isPending: boolean;
    } = useMutation({
        mutationFn: ({
            newPassword,
            userId,
        }: UpdatePasswordParams): Promise<void> =>
            updatePasswordApi({ newPassword, userId }),
        onSuccess: (): void => {
            toast.success("You have successfully updated your password", {
                id: "update-password-toast",
            });
        },
        onError: (err: Error): void => {
            toast.error(err.message, {
                id: "update-password-toast",
            });
        },
    });

    return { updatePassword, isPending };
};
