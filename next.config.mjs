/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    skipMiddlewareUrlNormalize: true,
    compress: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: false,
    images: {
        remotePatterns: [
            { hostname: "lh3.googleusercontent.com", protocol: "https" },
            { hostname: "ul2efuvs5p2hmdcb.public.blob.vercel-storage.com", protocol: "https" },
            { hostname: "res.cloudinary.com", protocol: "https" },
            { hostname: "nextui.org", protocol: "https" },
        ],
        minimumCacheTTL: 60 * 60 * 24 * 365,
        formats: ["image/avif", "image/webp"],
    },
    experimental: {
        optimizePackageImports: [
            "@nextui-org/react",
            "sonner",
        ],
    },
};

export default nextConfig;
