// "use client";
//
// import { useEffect } from "react";
// import FullScreenLoading from "@/components/fullscreen-loading";
// import { useUser } from "@/app/(auth)/login/use-user";
// import { useRouter } from "next/navigation";
//
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//     const { user, isPending } = useUser();
//
//     console.log("USER", user, isPending);
//     const router = useRouter();
//
//     useEffect(() => {
//         if (!isPending && !user) {
//             router.push("/login");
//         }
//     }, [user, isPending, router]);
//
//     if (isPending || !user) {
//         return <FullScreenLoading />;
//     }
//
//     return children;
// };
//
// export default ProtectedRoute;

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import FullScreenLoading from "@/components/fullscreen-loading";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return <FullScreenLoading />;
    }

    return user ? children : null;
}
