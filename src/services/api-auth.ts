import api from "./api-client";

export const login = async (email: string, password: string) => {
    console.log("login");
    console.log(email);
    console.log(password);
    try {
        const { data } = await api.post("/login", {
            email,
            password,
        });

        return data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Login failed");
    }
};

export const logout = async () => {
    try {
        await api.post("/logout");
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to logout");
    }
};

export const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/me");
        return data;
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message || "Failed to fetch user",
        );
    }
};

export const updateUser = async ({
    firstName,
    lastName,
    userId,
}: {
    firstName: string;
    lastName: string;
    userId: string;
}) => {
    console.log(firstName, lastName);
    try {
        const { data } = await api.patch(`/users/${userId}`, {
            first_name: firstName,
            last_name: lastName,
        });

        return data;
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message || "Failed to update user",
        );
    }
};

export const updatePassword = async ({
    newPassword,
    userId,
}: {
    newPassword: string;
    userId: string;
}) => {
    try {
        const { data } = await api.patch(`/users/${userId}/password`, {
            password: newPassword,
        });

        return data;
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message || "Failed to update password",
        );
    }
};
