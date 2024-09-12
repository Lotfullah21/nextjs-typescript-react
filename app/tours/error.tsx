"use client";

function error({ error }: { error: Error }) {
	return (
		<section>
			<h1>{error.message}</h1>
			<span className="text-4xl text-red-900">There was an error</span>
		</section>
	);
}
export default error;
