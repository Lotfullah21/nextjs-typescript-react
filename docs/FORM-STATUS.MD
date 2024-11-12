## useFormStatus

useFormState and useFormStatus are hooks from the react-dom library. These hooks provide useful information about the current state of a form (e.g., whether it's pending submission or already submitted).

useFormStatus can only be used inside a component.
It gives information about status of our action.

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

- `message`: A state variable that holds any messages related to the form submission, such as success or error messages.
- `formAction`: A function to handle form submission. This function is typically used as the action handler for the form.

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
