import coffeImg from "@/images/coffee.jpg";
import Image from "next/image";

const url = "https://www.course-api.com/images/tours/tour-5.jpeg";
function page({ params }: { params: { id: string } }) {
	return (
		<div>
			<h1 className="text-5xl mt-4">{params.id}</h1>
			<section className="flex gap-x-4 mt-4">
				{/* local image */}
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
				<div>
					<Image
						src={url}
						width={208}
						height={208}
						priority
						alt="coffee"
						className="w-52 h-52 object-cover rounded"></Image>
					<h2>remote image</h2>
				</div>
				{/* remote image */}
			</section>
		</div>
	);
}
export default page;
