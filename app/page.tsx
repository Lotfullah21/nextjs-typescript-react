import Link from "next/link";

const page = () => {
	return (
		<div>
			<h1 className="text-8xl">Home page</h1>
			<Link href="/about" className="m-8 text-red-900 inline-block text-xl">
				about page
			</Link>
		</div>
	);
};
export default page;
