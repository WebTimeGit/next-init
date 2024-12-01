/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		quietDeps: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3001',
				pathname: '/src/media/avatar/**',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
			},
		],
	},
};

export default nextConfig;
