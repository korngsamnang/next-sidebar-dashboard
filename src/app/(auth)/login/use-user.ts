import { getCurrentUser } from "@/services/api-auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    const { data, isPending } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: 1,
    });
    const user = data?.user;

    return { isPending, user };
};
