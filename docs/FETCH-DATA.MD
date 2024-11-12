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

## Few Points

- fetching the data is happening on the server, meaning it secure and faster
-

## Note

We cannot use `async` with client components.
Next.js is just awesome with caching, a giant caching machine.
