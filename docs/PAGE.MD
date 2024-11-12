## Link

It is a component that allows us to navigate to different pages.

```tsx
import Link from "next/link";
const page = () => {
	return <Link href="/about">about page</Link>;
};
export default page;
```

## Nested routes

To have a different nested routes, we have to create nested folders and inside each folder, we should have a `page.tsx`.
let's say, we have different courses and we want to go to specific courses, to do so:

- create a folder with the name of courses
- create another folder inside courses folder with the name of `python`
- inside the python folder create a `page.tsx`
- to search for the `python` route, use `domain/courses/python`
