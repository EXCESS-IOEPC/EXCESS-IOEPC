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
        return config;
    },
};
export default nextConfig;
