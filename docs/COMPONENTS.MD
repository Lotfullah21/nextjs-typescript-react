# Next.js Component Guide

This document provides an overview of concepts related to Network Boundary, Server Components, and Client Components in Next.js, explaining how they interact and how they impact rendering performance.

## Table of Contents

- [Next.js Component Guide](#nextjs-component-guide)
  - [Table of Contents](#table-of-contents)
  - [Network Boundary](#network-boundary)
  - [Server Components](#server-components)
    - [Rendering Types](#rendering-types)
    - [How are Server Components Rendered?](#how-are-server-components-rendered)
    - [Rendering Flow to the Client](#rendering-flow-to-the-client)
    - [Benefits](#benefits)
  - [Client Components](#client-components) - [Benefits of Client Rendering](#benefits-of-client-rendering)
  - [Nested Client component inside server component](#nested-client-component-inside-server-component)

---

## Network Boundary

In web development, the **Network Boundary** is a conceptual line that separates different environments in an application. For example, it differentiates:

- The client and the server.
- The server and the data store.

Understanding and managing these boundaries is essential for creating secure, scalable, and efficient applications. Properly configured boundaries enhance data handling and optimize performance.

[Network Boundary Documentation](https://nextjs.org/docs/app/building-your-application/rendering)

---

## Server Components

In Next.js, **Server Components** are components that run exclusively on the server, rather than the client’s machine. By default, all components in Next.js are considered Server Components, allowing for efficient data fetching, rendering, and caching on the server.

**React Server Components** further enable UI rendering on the server, with optimized handling of data fetching and caching, split into route segments for streaming and partial rendering.

### Rendering Types

There are three main methods of rendering Server Components in Next.js:

1. **Static Rendering**:

   - Content is rendered at build time and cached until a new build is deployed.
   - Useful for content that does not change frequently.

2. **Dynamic Rendering**:

   - Content is rendered on each request, ideal for frequently updated data.
   - Provides a fresh response with each request for data that requires real-time updates.

3. **Streaming**:
   - Content is rendered and streamed to the client as it becomes available.
   - Enhances user experience by showing parts of the UI as soon as they are ready, without waiting for the entire page to load.

### How are Server Components Rendered?

On the server, Next.js uses React’s APIs to manage rendering work, dividing it into chunks based on route segments and Suspense Boundaries. Each chunk is processed in two steps:

1. **React renders Server Components** into a special data format called the **React Server Component Payload (RSC Payload)**.
2. **Next.js utilizes the RSC Payload** and Client Component JavaScript instructions to generate HTML on the server.

### Rendering Flow to the Client

1. The HTML is sent to the client as a non-interactive preview for a fast initial load.
2. The **RSC Payload** updates the Client and Server Component trees, refreshing the DOM where needed.
3. JavaScript instructions then **hydrate Client Components**, making the application fully interactive.

### Benefits

- caching
- security
- data fetching
- bundle size

[Server Component Documentation](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

## Client Components

**Client Components** are components that allow interactive UI to be prerendered on the server but executed on the client side. These components leverage client-side JavaScript to handle user interactions in the browser.

- Client Components are ideal for interactive elements such as buttons, forms, and date pickers.
- They enable a dynamic user experience by combining server-rendered content with client-side JavaScript for interactivity.

Using Client Components can help create a responsive and engaging UI by utilizing server-rendered content for quick load times while relying on client-side JavaScript for user-driven interactions.

---

#### Benefits of Client Rendering

There are a couple of benefits to doing the rendering work on the client, including:

`Interactivity`: Client Components can use state, effects, and event listeners, meaning they can provide immediate feedback to the user and update the UI.
`Browser APIs`: Client Components have access to browser APIs, like geolocation or localStorage.

To use Client Components, you can add the React `use client` directive at the top of a file, above your imports.

[Client-Component](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

## Nested Client component inside server component

There are more benefits in server components, but do we have to have a separate page for each client component at the cost of loosing server component's benefits? No!

We can nest client component inside a server component, how?

Create a component, add all the client code in that file and import it into the relative page and use it there.

For instance, a counter component is required,

```tsx
// component/Counter.tsx;

("use client");
import { useState } from "react";
const Counter = () => {
	const [count, setCounter] = useState<number>(0);
	return (
		<div className="flex flex-col items-center">
			<p className="text-5xl font-bold">{count}</p>
			<button
				className="bg-red-900 text-white px-4 py-2 rounded tracking-wider mt-4"
				onClick={() => setCounter(count + 1)}>
				Increment
			</button>
		</div>
	);
};
export default Counter;
```

Then import the component in server component.

```tsx
// counter/page.tsx;

import Counter from "../components/Counter";
const CounterPage = () => {
	return (
		<section>
			<h1 className="text-5xl mb-16"> Counter page</h1>
			<Counter></Counter>
		</section>
	);
};
export default CounterPage;
```

This README provides a structured approach to understanding the separation between Network Boundaries, Server Components, and Client Components, helping you make informed decisions when building efficient and interactive Next.js applications.
