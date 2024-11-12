## <Image>

[Image-component](https://nextjs.org/docs/app/api-reference/components/image)

```tsx
import Image from "next/image";

export default function Page() {
	return (
		<Image
			src="/profile.png"
			width={500}
			height={500}
			alt="Picture of the author"
		/>
	);
}
```

| **Prop**            | **Example**                              | **Type**        | **Status** |
| ------------------- | ---------------------------------------- | --------------- | ---------- |
| `src`               | `src="/profile.png"`                     | String          | Required   |
| `width`             | `width={500}`                            | Integer (px)    | Required   |
| `height`            | `height={500}`                           | Integer (px)    | Required   |
| `alt`               | `alt="Picture of the author"`            | String          | Required   |
| `loader`            | `loader={imageLoader}`                   | Function        | -          |
| `fill`              | `fill={true}`                            | Boolean         | -          |
| `sizes`             | `sizes="(max-width: 768px) 100vw, 33vw"` | String          | -          |
| `quality`           | `quality={80}`                           | Integer (1-100) | -          |
| `priority`          | `priority={true}`                        | Boolean         | -          |
| `placeholder`       | `placeholder="blur"`                     | String          | -          |
| `style`             | `style={{objectFit: "contain"}}`         | Object          | -          |
| `onLoadingComplete` | `onLoadingComplete={img => done()}`      | Function        | Deprecated |
| `onLoad`            | `onLoad={event => done()}`               | Function        | -          |
| `onError`           | `onError={event => fail()}`              | Function        | -          |
| `loading`           | `loading="lazy"`                         | String          | -          |
| `blurDataURL`       | `blurDataURL="data:image/jpeg..."`       | String          | -          |
| `overrideSrc`       | `overrideSrc="/seo.png"`                 | String          | -          |

## height

1. height={400}: This is a Next.js prop that specifies the exact pixel height of the image (400 pixels).
2. h-48: This is a Tailwind CSS class that applies a height based on Tailwind’s scale (in this case, h-48 means 192 pixels by default).
   Key Differences

3. height={400} on `<Image />` (Next.js Prop)
   Setting height={400} directly on `<Image />` tells Next.js to render the image with a specific height of 400 pixels.
   This value is used by Next.js to optimize the layout, maintain the image's aspect ratio, and reduce layout shifts as the page loads.
   Using both height and width with pixel values helps Next.js manage how the image should look on different devices.
4. h-48 (Tailwind CSS Class)
   h-48 is a utility class from Tailwind CSS, which applies a height of 192 pixels.
   This only styles the image but doesn’t give Next.js layout information.
   If only h-48 is applied without height and width props, Next.js will have less control over image optimization.

#### When to Use Each

- If you want Next.js to optimize the image layout, use height={400} and width={400}.
- If you only want to style the image height for visual purposes, use h-48.

```tsx
<Image
	src={coffee}
	width={400} // Next.js sets the width to 400 pixels
	height={400} // Next.js sets the height to 400 pixels, helping maintain the aspect ratio
	alt="coffee"
	className="w-48 h-48 object-cover" // Tailwind sets 192px width and height (may conflict with Next.js props)
/>
```

In this case, Next.js tries to render it as 400x400 pixels, but Tailwind also applies a w-48 h-48 style (192x192 pixels), which may cause a size mismatch.

To avoid conflicts, you can:

Remove w-48 and h-48 if you want Next.js to handle sizing.
Use only w-48 h-48 without width and height props if you want Tailwind to handle it purely for styling.

### Why className Works but width and height Don’t Show Changes

Priority: In Next.js, width and height props are used by the framework internally but don’t get applied as inline styles directly on the element. This is why the Tailwind CSS classes take priority visually—they’re direct styling rules.

Responsive Flexibility: Next.js designed the width and height props for responsive images, allowing them to adapt to screen sizes while maintaining the aspect ratio.

## Remote Images

when using `remote` images, we need to add the url in list of supported patterns in our configuration file.

For remote images:

- `width` and `height` property are mandatory to be present
- add remote url patterns in `next.config.json`

```tsx
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.course-api.com",
				port: "",
				pathname: "/images/**",
			},
			{
				protocol: "https",
				hostname: "www.pexels.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
```

## Responsive image

```tsx
<div className="relative h-56 mb-4">
	<Image
		src={tour.image}
		alt={tour.name}
		fill
		priority
		sizes="100vws"
		className="object-cover rounded"></Image>
</div>
```

It is crucial to put the image inside a div and set the following classes `relative h-56`

### Some key properties

1. #### fill

This is a property used in Next.js's `<Image>` component that allows the image to automatically fill the parent container, making the image responsive. It stretches the image to cover the width and height of the container, maintaining its aspect ratio. When you use fill, the parent element must have a set position and dimensions (e.g., relative with defined width and height).
once this property is added, we cannot add height or width to the image.

2. #### priority

This flag indicates that the image should be prioritized for loading. It’s particularly useful for critical images, such as hero banners or above-the-fold content, where loading speed is essential for a good user experience.

3. #### sizes="100vws"

The sizes attribute tells the browser how large the image will be on different screen sizes. The value 100vws means the image should take up 100% of the viewport's width (essentially full width). This helps optimize the image loading process by allowing the browser to load the correct image size based on the available space.

The fill property makes the image responsive to its parent container, and priority loads it faster.
