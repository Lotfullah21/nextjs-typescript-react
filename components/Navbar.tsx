import Link from "next/link";
const Navbar = () => {
	return (
		<nav className="max-w-3xl mx-auto py-4 px-2 flex gap-x-4">
			<Link href={"/courses"}>courses</Link>
			<Link href={"/tutorials"}>tutorials</Link>
			<Link href={"/practices"}>practices</Link>
			<Link href="/tours">tours</Link>
			<Link href="/actions">actions</Link>
		</nav>
	);
};
export default Navbar;
