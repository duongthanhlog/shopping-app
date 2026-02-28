import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'down-vn.img.susercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent.fsgn12-1.fna.fbcdn.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'bizweb.dktcdn.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig
