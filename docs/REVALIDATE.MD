## Crucial

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
