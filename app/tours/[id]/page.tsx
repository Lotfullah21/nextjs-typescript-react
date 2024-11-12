import Image from "next/image";
import coffee from "@/images/coffee.jpg";
const url =
	"https://images.pexels.com/photos/28988215/pexels-photo-28988215/free-photo-of-surfer-at-sunset-on-ipanema-beach-rio-de-janeiro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const page = ({ params }: { params: { id: string } }) => {
	return (
		<div>
			<h1 className="text-4xl">Id: {params.id}</h1>
			<section className="flex gap-x-4">
				{/* local image */}
				<div>
					<Image
						src={coffee}
						width={400}
						height={400}
						alt="coffee"
						priority
						className="h-68 w-68 rounded object-cover"></Image>
					<h1>black coffee</h1>
				</div>
				{/* remote */}
				<div>
					<Image
						src={url}
						alt="beach image"
						width={400}
						height={400}
						className="h-68 w-68 rounded object-cover"></Image>
					<h1>beach</h1>
				</div>
			</section>
		</div>
	);
};
export default page;
