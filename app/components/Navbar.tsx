import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="max-w-7xl mx-auto py-4 flex gap-x-4">
			<Link href="/">home</Link>
			<Link href="/courses">course</Link>
			<Link href="/counter">counter</Link>
			<Link href="/tours">tours</Link>
			<Link href="/actions">actions</Link>
		</nav>
	);
};
export default Navbar;
