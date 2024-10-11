/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "lh3.googleusercontent.com", protocol: "https" },
            { hostname: "ul2efuvs5p2hmdcb.public.blob.vercel-storage.com", protocol: "https" },
            { hostname: "res.cloudinary.com", protocol: "https" },
            { hostname: "nextui.org", protocol: "https" },
        ]
    }
};

export default nextConfig;
