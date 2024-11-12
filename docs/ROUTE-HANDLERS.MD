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
