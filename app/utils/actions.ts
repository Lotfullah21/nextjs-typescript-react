"use server";

import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

type User = {
	id: string;
	firstName: string;
	lastName: string;
};

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

export const fetchUsers = async (): Promise<User[]> => {
	const result = await readFile("users.json", { encoding: "utf8" });
	const users = result ? JSON.parse(result) : [];
	return users;
};

export const saveUser = async (user: User) => {
	const users = await fetchUsers(); // 'users' is a local variable
	users.push(user); // modifying the local 'users' array
	await writeFile("users.json", JSON.stringify(users)); // writing the updated 'users' array to a file
};

export const deleteUser = async (formData: FormData) => {
	const id = formData.get("id");
	const users = await fetchUsers();
	const updateUsers = users.filter((user) => user.id !== id);
	// Convert the updated updateUsers array to a JSON string and writes it back to users.json.
	await writeFile("users.json", JSON.stringify(updateUsers));
	revalidatePath("/actions");
};

export const removeUser = async (id: string) => {
	const users = await fetchUsers();
	const updateUsers = users.filter((user) => user.id !== id);
	// Convert the updated updateUsers array to a JSON string and writes it back to users.json.
	await writeFile("users.json", JSON.stringify(updateUsers));
	revalidatePath("/actions");
};
