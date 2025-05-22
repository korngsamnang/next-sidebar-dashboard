import api from "./api-client";

export const createFeedback = async (feedbackData: any) => {
    try {
        const { data } = await api.post("/feedbacks/", feedbackData);

        return { data };
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message || "Failed to create feedback",
        );
    }
};
