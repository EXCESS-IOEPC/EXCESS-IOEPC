/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
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
