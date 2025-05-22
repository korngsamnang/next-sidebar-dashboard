import { cookies } from "next/headers";

export async function serverFetch(url: string, options: RequestInit = {}) {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${url}`,
            {
                ...options,
                headers,
            },
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || `HTTP error! status: ${response.status}`,
            );
        }

        return response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
