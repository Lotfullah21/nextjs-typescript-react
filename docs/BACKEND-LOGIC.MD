## back-end development

Now, let's simulate how the data is written to a database, retrieved from a database or updated to a database.

## Write to a database

By database, we mean a json file as of now.

## 1. Save user

```tsx
import { writeFile, readFile } from "fs/promises";
import { use } from "react";
import { json } from "stream/consumers";

type User = {
	id: string;
	first_name: string;
	last_name: string;
};
export const createUser = async (formData: FormData) => {
	"use server";
	console.log("creating user.....");
	const firstName = formData.get("first_name") as string;
	const lastName = formData.get("last_name") as string;
	const newUser: User = {
		first_name: firstName,
		last_name: lastName,
		id: Date.now().toString(),
	};
	await saveUser(newUser);
};

export const fetchUsers = async (): Promise<User[]> => {
	const result = await readFile("users.json", { encoding: "utf8" });
	// convert the data back to json
	const users = result ? JSON.parse(result) : [];
	console.log("USERS", users);
	return users;
};

export const saveUser = async (user: User) => {
	const users = await fetchUsers();
	users.push(user);
	// convert the data to plain text
	await writeFile("users.json", JSON.stringify(users));
};
```

Why `await writeFile("users.json", JSON.stringify(users))`?

When you modify in-memory data (like pushing a new user to the users array), that change does not automatically update the underlying file or database where the original data came from. To make sure your changes are saved permanently, you must explicitly write the updated data back to the file.
