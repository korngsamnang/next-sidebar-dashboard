import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "@/services/api-auth";
import { toast } from "sonner";

interface UpdateUserParams {
    firstName: string;
    lastName: string;
    userId: string;
}

interface UserResponse {
    user: Record<string, any>;
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: ({ firstName, lastName, userId }: UpdateUserParams) =>
            updateUserApi({ firstName, lastName, userId }),
        onSuccess: ({ user }: UserResponse) => {
            queryClient.setQueryData(["user"], user);
            toast.success("Your data info updated successfully", {
                id: "update-user-toast",
            });
        },
        onError: (err: Error) => {
            toast.error(err.message, {
                id: "update-user-toast",
            });
        },
    });

    return { updateUser, isPending };
};
