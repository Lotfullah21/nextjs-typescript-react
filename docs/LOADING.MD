## Error and loading

If there is an error or time consuming operation, we can use `loading.tsx` and `error.tsx` to handle these cases.
the namings should exactly match.

If we place them in app directory, it will be applied to all pages and if we place them in a specific directory, then, they will applied to those pages only.

```tsx
// loading.tsx
"use client";
const loading = () => {
	return <h2 className="text-center text-5xl">Loading tours...</h2>;
};
export default loading;
```

In Next.js, the "use client" directive is added to loading.tsx because loading.tsx is a client component by default. Client components are rendered on the client side, which means they can use React’s interactive hooks and update the UI dynamically. This is particularly useful for components like loaders or spinners that respond to changes in state on the client.

Here’s why "use client" is necessary in this context:

Client-Side Interactivity: The loading component is intended to show a temporary state on the client while data is being fetched. Adding "use client" allows the component to be interactive, if needed, and update in real-time as loading progresses.

Direct DOM Manipulation: Client components can access the DOM directly, which is useful for loaders if animations or other effects are required.

Scoped to Specific Pages: By placing loading.tsx in a specific directory within the app directory, you’re applying the loading state to just that route. If loading.tsx were at the root of the app directory, it would handle the loading state for the entire application.
