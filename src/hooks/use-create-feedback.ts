import { useMutation } from "@tanstack/react-query";
import { createFeedback as createFeedbackApi } from "@/services/api-feedback";
import { toast } from "sonner";

export const useCreateFeedback = () => {
    const { mutate: createFeedback, isPending } = useMutation({
        mutationFn: createFeedbackApi,
        onSuccess: () => {
            toast.success("Thank you for your feedback.", {
                id: "create-feedback-toast",
            });
        },

        onError: (err: Error) => {
            toast.error(err.message, {
                id: "create-feedback-toast",
            });
        },
    });

    return { createFeedback, isPending };
};
