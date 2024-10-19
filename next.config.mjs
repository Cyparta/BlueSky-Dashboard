/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sadakatcdn.cyparta.com',
            },{
                protocol: 'https',
                hostname: 'as2.ftcdn.net',
            }, {
                protocol: 'http',
                hostname: '192.168.88.149',
                port: '9000',  // Specify the port here
                pathname: '/media/**',  // You can use a pattern if necessary
            }
        ]

    }
};

export default nextConfig;
