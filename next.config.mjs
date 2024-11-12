/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.course-api.com",
				port: "",
				pathname: "/images/**",
			},
			{
				protocol: "https",
				hostname: "www.pexels.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
