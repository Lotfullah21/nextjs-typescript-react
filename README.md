## Create an app

```bash
npx create-next-app@latest my-next-app

```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Link

It allows us to navigate to different pages.

```tsx
import Link from "next/link";
const page = () => {
	return (
		<div>
			<Link href="/about" className="m-8 text-red-900 inline-block text-xl">
				about page
			</Link>
		</div>
	);
};
export default page;
```

## Nested routes

To have a different nested routes, we have to create nested folders and inside each folder, we should have a `page.tsx`.

## Layout

when creating layout, it should be name `layout.tsx`.
We wrap the other part of the pages which are having the same layout into layout component.
`template.tsx`: one of the difference between layout and template is as we navigate through different pages, we are not re-rendering the layout.

## Network Boundary

In web development, the Network Boundary is a conceptual line that separates the different environments. For example, the client and the server, or the server and the data store.

[Network-Boundary]https(https://nextjs.org/docs/app/building-your-application/rendering)

## Server Component

React Server Components allow you to write UI that can be rendered and optionally cached on the server. In Next.js, the rendering work is further split by route segments to enable streaming and partial rendering, and there are three different server

- Static Rendering
- Dynamic Rendering
- Streaming

#### How are Server Components rendered?

On the server, Next.js uses React's APIs to orchestrate rendering. The rendering work is split into chunks: by individual route segments and Suspense Boundaries.

Each chunk is rendered in two steps:

React renders Server Components into a special data format called the React Server Component Payload (RSC Payload).
Next.js uses the RSC Payload and Client Component JavaScript instructions to render HTML on the server.

### Then, on the client:

The HTML is used to immediately show a fast non-interactive preview of the route - this is for the initial page load only.
The React Server Components Payload is used to reconcile the Client and Server Component trees, and update the DOM.
The JavaScript instructions are used to hydrate Client Components and make the application interactive.

[Server-Component](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

## Client Component

Client Components allow you to write interactive UI that is prerendered on the server and can use client JavaScript to run in the browser.
Basically the client component is the part of the code that require some kind of activity from the server, for instance clicking a button, selecting a data on a calender.

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
component / Counter.tsx;

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
counter / page.tsx;

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

## Fetch

```ts
const url = "https://www.course-api.com/react-tours-project";

type Tour = {
	id: string;
	image: string;
	name: string;
	info: string;
};
const tours = async () => {
	const response = await fetch(url);
	const data: Tour[] = await response.json();
	console.log(data);
	return (
		<div>
			<h1 className="text-8xl">TOURS page</h1>
		</div>
	);
};
export default tours;
```

#### Note

We cannot use `async` with client components.

Next.js is just awesome with caching, a giant caching machine.

## Error and loading

If there is an error or time consuming operation, we can use `loading.tsx` and `error.tsx` to handle these cases.
the namings should exactly match.

If we place them in app directory, it will be applied to all pages and if we place them in a specific directory, then, they will applied to those pages only.

## Nested Layouts

We can place layouts inside each directory as well.

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

Now, the header will be shared across all the pages/components present inside the directory.

Here, `children` represents what ever files(routes or pages) we have inside the directory the `layout.tsx` is located.

## Dynamic routing

If we are having a dynamic route and based on some params, we want to navigate to different routes, we need to create a folder with the param we want to access `[id]` and inside that folder set a page.

To navigate to that dynamic route, we can use `Link` component.

Let's say we are having a courses page and inside that page we are having different courses with different id, how to navigate to each course.

- Create courses folder
- create a page.tsx file
- create a folder named `[id]`
- inside `page.tsx` use the `Link` component and reference the each of the course

```tsx
courses / page.tsx;

const courses = async () => {
	const data = await fetchTours();
	return (
		<section>
			<div className="grid md:grid-cols-2 gap-8">
				{data.map((course) => {
					return (
						<Link
							key={course.id}
							href={`/courses/${course.id}`}
							className=" text-blue-800 underline hover:text-red-900">
							<h1 className="text-2xl">{course.name}</h1>
						</Link>
					);
				})}
			</div>
		</section>
	);
};
```

```tsx
[id] / page.tsx;

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

#### fill

This is a property used in Next.js's <Image> component that allows the image to automatically fill the parent container, making the image responsive. It stretches the image to cover the width and height of the container, maintaining its aspect ratio. When you use fill, the parent element must have a set position and dimensions (e.g., relative with defined width and height).
once this property is added, we cannot add height or width to the image.

#### priority

This flag indicates that the image should be prioritized for loading. It’s particularly useful for critical images, such as hero banners or above-the-fold content, where loading speed is essential for a good user experience.

#### sizes="100vws"

The sizes attribute tells the browser how large the image will be on different screen sizes. The value 100vws means the image should take up 100% of the viewport's width (essentially full width). This helps optimize the image loading process by allowing the browser to load the correct image size based on the available space.

The fill property makes the image responsive to its parent container, and priority loads it faster.

## Complex routing

whatever folder we put in app directory, that will become part of url or segment of url.

What if we don't want some folder to be part of our url segment? Add it to private folder? place \_ in front of the folder.

- Private Folder
  \_folder

Lets say we don't want contents folder to be part of the segment, go to app and create a folder `_contents`, now `domain/contents` cannot be accessed.

### Grouping the routes

What if we want to group all the routes, for instance if we have a dashboard and inside the folder we have profile, info, about. It would be tedious to have `dashboard/profile`, `dashboard/about` and so on.

using next, set the folder name with `(foldername)`.

`(dashboard)`

- auth
- profile

When we navigate, we don't navigate `dashboard/profile`, just `/profile` or `/auth`.

## Form Data

```ts
"use server";

export const createUser = async (formData: FormData) => {
	"user server";
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	console.log({ firstName, lastName });
};
```

`use server`:This tells the framework (e.g., Next.js) that the function should run on the server side.

`async (formData: FormData)`: The function accepts a FormData object, which contains form data submitted from a client.

`formData`: This is a variable or parameter name that refers to the instance of FormData in the function.

`FormData`: This is a browser-provided class that represents form data and provides methods to work with it.

The function expects formData to be passed as an argument, containing the form data that you want to process. If you want to create formData from a form element, you would do that in the client-side code.

`const rawData = Object.fromEntries(formData)`, if there are multiple inputs, all the data can be retrieved using above snippet.

```ts
"use client";
import { createUser } from "../utils/actions";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitBtn() {
	const { pending } = useFormStatus();
	return (
		<button type="submit" className={buttonStyle} disabled={pending}>
			{pending ? "submitting..." : "submit"}
		</button>
	);
}

function Form() {
	// Create a ref for the form element
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<div className="grid justify-center items-center">
			<form
				ref={formRef}
				action={async (formData) => {
					// Call server-side action to create the user
					await createUser(formData);

					// Optional: Reset form fields after submission
					if (formRef.current) {
						formRef.current.reset();
					}
				}}
				className={formStyle}>
				<h1 className="text-4xl">Create a user</h1>
				<input
					type="text"
					name="firstName"
					placeholder="name"
					className={inputStyle}
					required
				/>
				<input
					type="text"
					name="lastName"
					placeholder="last name"
					className={inputStyle}
					required
				/>
				<SubmitBtn></SubmitBtn>
			</form>
		</div>
	);
}

const formStyle = `w-full max-w-96 flex flex-col gap-y-8 shadow-lg rounded p-8`;
const inputStyle = `border shadow rounded py-4 px-2 text-grey-7000`;
const buttonStyle = `bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded capitalize`;

export default Form;
```

# Backend development

```tsx
import { readFile, writeFile } from "fs/promises";
export const fetchUsers = async (): Promise<User[]> => {
	const result = await readFile("users.json", { encoding: "utf8" });
	const users = result ? JSON.parse(result) : [];
	return users;
};
```

```tsx
const saveUser = async (user: User) => {
	const users = await fetchUsers();
	users.push(user);
	await writeFile("users.json", JSON.stringify(users));
};
```

```ts
"use server";
import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type User = {
	id: string;
	firstName: string;
	lastName: string;
};

export const createUser = async (formData: FormData) => {
	"use server";
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	const newUser: User = { firstName, lastName, id: Date.now().toString() };

	try {
		await saveUser(newUser);
		revalidatePath("/actions");
	} catch (error) {
		console.log(error);
	}

	// redirect("/");
};

const saveUser = async (user: User) => {
	const users = await fetchUsers(); // 'users' is a local variable
	users.push(user); // modifying the local 'users' array
	await writeFile("users.json", JSON.stringify(users)); // writing the updated 'users' array to a file
};
```

Why `await writeFile("users.json", JSON.stringify(users))`?

When you modify in-memory data (like pushing a new user to the users array), that change does not automatically update the underlying file or database where the original data came from. To make sure your changes are saved permanently, you must explicitly write the updated data back to the file.

### Issue

```tsx
import { fetchUsers } from "../utils/actions";

async function UserList() {
	const users = await fetchUsers();

	return (
		<div className="grid justify-center items-center mt-8">
			{users.length ? (
				<div>
					{users.map((user) => {
						return (
							<h4 key={user.id} className="text-4xl capitalize">
								{user.firstName} {user.lastName}
							</h4>
						);
					})}
				</div>
			) : (
				<div>
					<p>Users list is empty</p>
				</div>
			)}
		</div>
	);
}
export default UserList;
```

Every time the users submits the form, it is not going to reflect immediately, because next.js caches all the action files aggressively.

Two Solutions:

### revalidatePath

When a page is statically generated or cached (to improve performance), it doesn't automatically update when data changes.
revalidatePath("/actions") tells the system to revalidate or refresh the cached version of the page at the path "/actions".
We revalidate the cache file in the directory we are in.

```tsx
import { revalidatePath } from "next/cache";

export const createUser = async (formData: FormData) => {
	// rest of the code
	revalidatePath("/actions");
};
```

### redirect

```tsx
redirect("/");
```

## useFormStatus

It gives information about status of our action, one of them.

useFormState and useFormStatus are hooks from the react-dom library. These hooks provide useful information about the current state of a form (e.g., whether it's pending submission or already submitted).

useFormStatus can only be used inside a component.

```ts
interface FormStatusNotPending {
	pending: false;
	data: null;
	method: null;
	action: null;
}
```

## useFormState:

#### Arguments

It takes two arguments, `useFormState(fn, init)`

`fn`: is a function to be called when the form is submitted or the button is pressed.

`init` is the initial state of our form we want to be.

#### Returns

message: A state variable that holds any messages related to the form submission, such as success or error messages.
formAction: A function to handle form submission. This function is typically used as the action handler for the form.

```tsx
export const createUser = async (
	prevState: "user created successfully" | "failed to create a user" | null,
	formData: FormData
): Promise<"user created successfully" | "failed to create a user"> => {
	"use server";
	await new Promise((resolve) => setTimeout(resolve, 3000));

	const firstName = formData.get("firstName")?.toString() || "";
	const lastName = formData.get("lastName")?.toString() || "";

	const newUser: User = { firstName, lastName, id: Date.now().toString() };

	try {
		await saveUser(newUser);
		revalidatePath("/actions");
		return "user created successfully";
	} catch (error) {
		console.log(error);
		return "failed to create a user";
	}
};
```

```tsx
function Form() {
	const [message, formAction] = useFormState(createUser, null);
```

## Crucial

Even though in `useFormState(createUser, null);`, we passed as null, but prevState can be "user created successfully" | "failed to create a user" | null, so add them in actions prev type.

prevState: Now it accepts a value of type "user created successfully" | "failed to create a user" | null as expected by useFormState. It tracks the result of the previous action call.
Return Type: The function clearly returns either "user created successfully" or "failed to create a user", as per the expected state management.

### Form Submission:

When the form is submitted, the action function is called. This function uses formAction to handle the actual submission of the form data (via createUser).
After calling formAction, the form is reset using formRef.current.reset().

## Why Use JSON.stringify?

Data Format: writeFile expects a string, but updateUsers is an array of objects. JSON.stringify(updateUsers) converts the array to a JSON-formatted string, which is a suitable format for storage in a file.
Consistency: Ensures that the data is written in a format that can be read and parsed back into a JavaScript object with JSON.parse.

### Passing params from component to server

We can pass the params from components to the server, but the problem here is that even though we made as hidden, but still it would be visible in console.

```tsx
import { deleteUser, removeUser } from "../utils/actions";
function DeleteButton({ id }: { id: string }) {
	return (
		<form action={deleteUser}>
			<input type="hidden" name="id" value={id}></input>
			<button
				type="submit"
				className="bg-red-500 text-white text-xs rounded p-2 ">
				delete
			</button>
		</form>
	);
}
export default DeleteButton;
```

### Passing params from component to server

The DeleteButton component is designed to trigger the deletion of a user when clicked. Here’s a breakdown of how it works and a few suggestions for improvement:

```tsx
const removeUserWithId = removeUser.bind(null, id);
```

removeUser.bind(null, id) creates a new function (removeUserWithId) where id is automatically passed as the first argument to removeUser. null is used as the this context, which is not needed here.

## Route Handlers

In Next.js, route handlers are essential for managing requests and responses in your application. They allow you to define server-side logic and handle different HTTP methods (GET, POST, PUT, DELETE, etc.) for specific routes.

With Next.js 13 and later versions, the introduction of the App Router provides a new way to handle routes and API endpoints using the filesystem-based routing and the app directory. Here’s an overview of how to use route handlers in Next.js, including both traditional API routes and the newer App Router approach:

Traditional API Routes
In Next.js, traditional API routes are placed inside the pages/api directory. Each file in this directory corresponds to an endpoint, and you can define request handlers using a default export.

```text
pages/
  api/
    user.js

```

### App Router (Next.js 13+)

With the App Router introduced in Next.js 13, you handle routes using the new app directory. This approach integrates API routes directly into the routing structure, using files such as page.tsx, layout.tsx, and route.ts.

Create a route file in the app directory. For example

```text
app/
  api/
    user/
      route.ts

```

In app/api/user/route.ts, you can define your request handlers using async functions

### Traditional API Routes:

Defined in pages/api with default exports. Suitable for many Next.js projects and legacy applications.

### App Router (Next.js 13+):

Defined in the app directory using route.ts or route.js. Offers a more integrated and modern way to manage routes and API endpoints.

### Request:

# GET

### Request

The request object, which provides information about the incoming request and by default we are having access to it.

### Response:

The response object, which allows you to create a new response to send back to the client.

```ts
import { fetchUsers, saveUser } from "@/app/utils/actions";

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	console.log(id);
	const users = await fetchUsers();
	return Response.json({ users });
};
```

### NextRequest, NextResponse

almost same as request and response, but they are coming from next.js with more methods.

```tsx
import { fetchUsers, saveUser } from "@/app/utils/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
	console.log(request.url);
	const id = request.nextUrl.searchParams.get("id");
	console.log(id);
	const users = await fetchUsers();
	// for redirect, the absolute path should be specified.
	return NextResponse.redirect(new URL("/", request.url));
};
```

# Post

with this kind of request, we do expect some kind of data to be submitted from the user.

```ts
export const POST = async (request: Request) => {
	const user = await request.json();
};
```

using `request.json()`, we can have access to the data submitted through post method.

```tsx
export const POST = async (request: Request) => {
	const user = await request.json();
	const newUser = { ...user, id: Date.now().toString() };
	await saveUser(newUser);
	return Response.json({ msg: "user created" });
};
```

## Middleware

It allows to do something before completion of the request and change the request.

- create middleware.ts in the root
- by default it will invoked for every route in our project.

```tsx
export default function king() {
	console.log("Hello from middleware");
}
```

The code inside middleware.ts will be invoked before every single request.

We can define matcher to target specific route for the middleware function.

```ts
export default function king() {
	console.log("Hello from middleware");
	return Response.json({ msg: "Hello from middleware" });
}

export const config = {
	matcher: "/middle",
};
```

We will get the above response only when we visit `/middle` route.

### A simple authentication

```tsx
import { NextResponse } from "next/server";

export default function king(request: Request) {
	// request.url is the absolute path we are currently and from there we want to go to "/"
	return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
	// It will be called for all the routes inside about and tours.
	matcher: ["/about/:path*", "/tours/:path*"],
};
```
