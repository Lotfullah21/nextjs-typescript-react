"use server";
import { log } from "console";
import { writeFile, readFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { use } from "react";
import { json } from "stream/consumers";

type User = {
	id: string;
	first_name: string;
	last_name: string;
};
export const createUser = async (prevState: any, formData: FormData) => {
	console.log("prev state", prevState);
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const firstName = formData.get("first_name") as string;
	const lastName = formData.get("last_name") as string;
	const newUser: User = {
		first_name: firstName,
		last_name: lastName,
		id: Date.now().toString(),
	};
	try {
		await saveUser(newUser);
		revalidatePath("/actions");
		return "user created successfully...";
	} catch (error) {
		console.log(error);
		return "failed to create the user...";
	}
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

export const deleteUser = async (formData: FormData) => {
	const id = formData.get("id") as string;
	const users = await fetchUsers();
	const updatedUsers = users.filter((user) => user.id != id);
	await writeFile("users.json", JSON.stringify(updatedUsers));
	revalidatePath("/actions");
};

export const removeUser = async (id: string, formData: FormData) => {
	const users = await fetchUsers();
	const updatedUsers = users.filter((user) => user.id != id);
	await writeFile("users.json", JSON.stringify(updatedUsers));
	revalidatePath("/actions");
};
