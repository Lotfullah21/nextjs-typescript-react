import Link from "next/link";

const page = () => {
	return (
		<div>
			<h1 className="text-8xl">home page</h1>
			<Link href="/about" className="text-blue-600">
				about
			</Link>
		</div>
	);
};
export default page;
