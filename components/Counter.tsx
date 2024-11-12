"use client";
import react from "react";

const page = () => {
	const [count, setCount] = react.useState(0);

	return (
		<div>
			<button
				value={count}
				onClick={() => setCount(count + 1)}
				className="btn bg-zinc-900 text-white px-2 py-1 border-r-amber-50 rounded-sm cursor-pointer">
				increment: {count}
			</button>
		</div>
	);
};
export default page;
