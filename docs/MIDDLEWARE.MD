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

```ts
export function middleware() {
	return Response.json({ message: "Hello there" });
}

export const config = {
	matcher: "/tours",
};
```
