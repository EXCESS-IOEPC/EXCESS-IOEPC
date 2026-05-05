/** @type {import('next').NextConfig} */
const nextConfig = {
    // Keep an explicit empty turbopack config so Next won't error when a
    // custom webpack configuration is present. This allows running with
    // Turbopack enabled while retaining a fallback webpack config.
    // See: https://nextjs.org/docs/app/api-reference/next-config-js/turbopack
    turbopack: {},

        // Allow local network dev host for HMR access from other devices
        // (prevents blocked cross-origin dev resource warnings).
        allowedDevOrigins: ['192.168.1.81'],

        images: {
                // Declare supported image `quality` values used in the app so Next
                // doesn't warn when images request non-default qualities.
                qualities: [100, 90, 75],
                remotePatterns: [
                    {
                        protocol: 'https',
                        hostname: 'res.cloudinary.com',
                    },
                ],
        },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    fs: false,
                },
            };
        }
        
        // Fix webpack cache errors by disabling filesystem cache in development
        // This prevents ENOENT errors during cache file renames
        config.cache = false;
        
        return config;
    },
};
export default nextConfig;
