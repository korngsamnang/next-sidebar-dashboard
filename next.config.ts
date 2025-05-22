// import type { NextConfig } from "next";
//
// const nextConfig: NextConfig = {
//     /* config options here */
// };
//
// export default nextConfig;

// import type { NextConfig } from "next";
//
// const nextConfig: NextConfig = {
//   /* config options here */
// };
//
// // export default nextConfig;
//
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    // Your other Next.js config options...
    output: "standalone", // This is required for the standalone output
};

export default nextConfig;
