import Link from "next/link";
import Image from "next/image";
const url = "https://www.course-api.com/react-tours-project";

type Tour = {
	id: string;
	image: string;
	name: string;
	info: string;
};

const fetchTours = async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const response = await fetch(url);
	const data: Tour[] = await response.json();
	return data;
};

const tours = async () => {
	const data = await fetchTours();
	console.log(data);
	return (
		<section>
			<div className="grid md:grid-cols-2 gap-8">
				{data.map((tour) => {
					return (
						<Link
							key={tour.id}
							href={`/tours/${tour.id}`}
							className="mt-4 block  text-blue-800 underline hover:text-red-900">
							<div className="relative h-60 mb-4">
								<Image
									src={tour.image}
									alt={tour.name}
									fill
									priority
									sizes="100vws"
									className="object-cover rounded"></Image>
							</div>
							<h1 className="text-2xl">{tour.name}</h1>
						</Link>
					);
				})}
			</div>
		</section>
	);
};
export default tours;
