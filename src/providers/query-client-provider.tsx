"use client";

import type React from "react";

import {
    QueryClient,
    QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // 1 minute
                        refetchOnWindowFocus: false,
                        retry: false,
                    },
                },
            }),
    );

    return (
        <ReactQueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryClientProvider>
    );
}
