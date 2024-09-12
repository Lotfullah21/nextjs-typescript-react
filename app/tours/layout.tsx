import React from "react";

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<header className="py-2 w-1/2 bg-slate-500 rounded">
				<h1 className="text-4xl text-white text-center">Nested layout</h1>
			</header>
			{children}
		</div>
	);
}
export default layout;
