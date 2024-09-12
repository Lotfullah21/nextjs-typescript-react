"use client";

import { useState } from "react";

const counter = () => {
	const [count, setCounter] = useState<number>(0);
	return (
		<div className="flex flex-col items-center">
			<p className="text-5xl font-bold">{count}</p>
			<button
				className="bg-red-900 text-white px-4 py-2 rounded tracking-wider mt-4"
				onClick={() => setCounter(count + 1)}>
				Increment
			</button>
		</div>
	);
};
export default counter;
