## Form

In the given snippet, the form is a server component

```tsx
// components/Form.tsx
const createUser = async () => {
	"use server";
	console.log("Creating user");
};

const Form = () => {
	return (
		<form action={createUser} className={formStyle}>
			<h2 className="capitalize text-4xl mb-4">create user</h2>
			<input
				type="text"
				name="first_name"
				defaultValue="adam"
				className={inputStyle}
			/>
			<input
				type="text"
				name="last_name"
				defaultValue="ahmad"
				className={inputStyle}
			/>
			<button type="submit" className={btnStyle}>
				submit
			</button>
		</form>
	);
};
export default Form;
```

### Doubt

Now, the question might be if all files are treated as server files, why we add `use server` inside `createUser` function?

Well, in `Next.js` 13.5, by adding `use server` a function will be designated to run on the server only within a component that might be treated as client component.
Hence, The `use server` directive is required here to specify that createUser is a server action, which runs only on the server when invoked.

```ts
"use server";

export const createUser = async (formData: FormData) => {
	"user server";
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	console.log({ firstName, lastName });
};
```

### Few more reasons

- ##### Explicit Server Actions:

The createUser function is designed as a server action, allowing you to handle form submissions directly on the server without additional API routes. The "use server" directive explicitly marks this function to run server-side when triggered, ensuring that it’s handled without client-side execution.

- ##### Mixed Component Hierarchy:

In a Next.js 13 app, components are not strictly client or server by default. Even though the form is rendered server-side, createUser could still technically run on the client without the "use server" directive, particularly if you convert parts of this component to a client component later. This directive is needed to ensure the function only executes server-side.

#### Note

even though, there is no problem of having the function inside `Forms.tsx`, but for better practice let's move the serve action function to a designated folder that is created to handle server side functions.

- create a folder `utils` in `root` directory
- inside `utils` folder, create a file `actions.py`
- add the `createUser` function inside `actions.py`
- import `createUser` to `Form.tsx` to use as action file.

```tsx
// app/actions/utils.ts
export const createUser = async () => {
	"use server";
	console.log("creating user.....");
};
```

why still `use server`?
functions cannot be passed directly to Client Components unless we explicitly expose it by marking it with `use server`.

## Accessing form data

```ts
// utils/actions.ts
export const createUser = async (formData: FormData) => {
	"use server";
	console.log("creating user.....");
	const firstName = formData.get("first_name");
	const lastName = formData.get("last_name");
	const rawData = Object.fromEntries(formData);
	console.log(rawData);
	console.log("first name:", firstName, "last name:", lastName);
};
```

`use server`:This tells the framework (e.g., Next.js) that the function should run on the server side.

`async (formData: FormData)`: The function accepts a FormData object, which contains form data submitted from a client.

`formData`: This is a variable or parameter name that refers to the instance of FormData in the function.

`FormData`: This is a browser-provided class that represents form data and provides methods to work with it.

The function expects formData to be passed as an argument, containing the form data that you want to process. If you want to create formData from a form element, you would do that in the client-side code.

`const rawData = Object.fromEntries(formData)`, if there are multiple inputs, all the data can be retrieved using this line inside an object.

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
