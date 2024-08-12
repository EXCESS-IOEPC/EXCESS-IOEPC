/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    fs: false,
                },
            };
        }
        return config;
    },
    output: 'export',
    images: { unoptimized: true },
};
export default nextConfig;
