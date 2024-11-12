import Link from "next/link";
import Image from "next/image";
const url = "https://www.course-api.com/react-tours-project";

type Tour = {
	id: string;
	info: string;
	name: string;
	image: string;
	price: string;
};

const fetchTours = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const response = await fetch(url);
	const tours: Tour[] = await response.json();
	return tours;
};

async function fetchData() {
	const tours = await fetchTours();
	return (
		<section className="grid md:grid-cols-2 gap-8">
			{tours.map((tour) => {
				return (
					<Link
						className="p-4 text-gray-800 hover:text-red-700"
						key={tour.id}
						href={`/tours/${tour.id}`}>
						<p className="text-3xl">{tour.name}</p>
						<div className="relative h-48">
							<Image
								src={tour.image}
								alt={tour.name}
								fill
								priority
								sizes="(max-width:768px) 100vw, (max-width:1200px) 60vw"
								className="object-cover rounded"></Image>
						</div>
						<p className="text-gray-900 text-2xl">Price: {tour.price}$</p>
					</Link>
				);
			})}
		</section>
	);
}

export default fetchData;
