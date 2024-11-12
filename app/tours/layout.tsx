import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section>
			<div className="w-1/2 p-4 bg-gray-800 rounded m-4">
				<h1 className="text-4xl text-white">Nested Layout</h1>
			</div>
			{children}
		</section>
	);
};
export default layout;
