## Dynamic routing

If we are having a dynamic route and based on some params, we want to navigate to different routes, we need to create a folder with the param we want to access `[id]` and inside that folder set a page.

To navigate to that dynamic route, we can use `Link` component.

Let's say we are having a courses page and inside that page we are having different courses with different id, how to navigate to each course.

- Create courses folder
- create a page.tsx file
- create a folder named `[id]`
- inside `page.tsx` use the `Link` component and reference the each of the course

```tsx
// tours/page.tsx

import Link from "next/link";
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
		<section>
			{tours.map((tour) => {
				return (
					<Link
						className="p-4 text-gray-800 hover:text-red-700"
						key={tour.id}
						href={`/tours/${tour.id}`}>
						<p className="text-3xl">{tour.name}</p>
						<p className="text-gray-500">{tour.info}</p>
						<p className="text-gray-900 text-2xl">Price: {tour.price}$</p>
					</Link>
				);
			})}
		</section>
	);
}
export default fetchData;
```

Dynamic page

```tsx
// [id]/page.tsx;
import coffeImg from "@/images/coffee.jpg";
import Image from "next/image";
function page({ params }: { params: { id: string } }) {
	return (
		<div>
			<h1 className="text-5xl mt-4">{params.id}</h1>
			<div>
				<Image
					src={coffeImg}
					alt="coffee "
					width={208}
					height={208}
					priority
					className="w-52 h-52 object-cover rounded"></Image>
				<h1>local image</h1>
			</div>
		</div>
	);
}
export default page;
```

Using what we have added to the `[id]`, it should match with what we destructure here `function page({ params }: { params: { id: string } })`.
Now, we have access to what is written in there.
