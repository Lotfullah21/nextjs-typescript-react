"use server";
import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type User = {
	id: string;
	firstName: string;
	lastName: string;
};

export const createUser = async (prevState: any, formData: FormData) => {
	"use server";
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	const newUser: User = { firstName, lastName, id: Date.now().toString() };

	try {
		await saveUser(newUser);
		revalidatePath("/actions");
		return "user created successfully";
	} catch (error) {
		console.log(error);
		return "failed to create a user";
	}

	// redirect("/");
};

export const fetchUsers = async (): Promise<User[]> => {
	const result = await readFile("users.json", { encoding: "utf8" });
	const users = result ? JSON.parse(result) : [];
	return users;
};

const saveUser = async (user: User) => {
	const users = await fetchUsers(); // 'users' is a local variable
	users.push(user); // modifying the local 'users' array
	await writeFile("users.json", JSON.stringify(users)); // writing the updated 'users' array to a file
};
