## Layout

A component that wraps other pages and layouts. it should be named `layout.tsx`.
The layout is shared with other components.
We wrap the other part of the pages which are having the same layout into layout component.

`template.tsx`: one of the difference between layout and template is as we navigate through different pages, we are not re-rendering the layout.

```tsx
import "./globals.css";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<nav>{children}</nav>
			</body>
		</html>
	);
}
```

#### Some properties of layout

- `html`: it has to be returned from `RootLayout`
- `children`: it represents all the pages and it is crucial to be present.
- `nav`: it means we are sharing the navbar with all other components.

### Components

Keep the components outside the `app` dir, so that it does not included in the route.

### Font

To add the fonts,

- import it from google
- create it's instance
- use it by adding to the body tag.

```tsx
// layout.tsx

import { Inter, Inconsolata } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const inconsolata = Inconsolata({ subsets: ["latin"] });
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inconsolata.className}>
				<Navbar></Navbar>
				{children}
			</body>
		</html>
	);
}
```

## Nested Layouts

We can place layouts inside each page as well. Now, the children are all the pages inside the directory.
one of the difference with the main `layout.tsx` is that, here we don't need `html` and `body` tag.

```tsx
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
```

```tsx
<header className="py-2 w-1/2 bg-slate-500 rounded">
	<h1 className="text-4xl text-white text-center">Nested layout</h1>
</header>
```

The header will be shared across all the pages/components present inside this directory.
Here, `children` represents what ever files(routes or pages) we have inside the directory the `layout.tsx` is located.
