/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@': path.resolve(__dirname, 'src'),
            };
        }
        return config;
    },
};

export default nextConfig;
