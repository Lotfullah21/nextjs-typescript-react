import { fetchUsers, saveUser } from "@/app/utils/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
	console.log(request.url);
	const id = request.nextUrl.searchParams.get("id");
	console.log(id);
	const users = await fetchUsers();
	return NextResponse.json({ users });
	return NextResponse.redirect(new URL("/", request.url));
};

export const POST = async (request: Request) => {
	const user = await request.json();
	const newUser = { ...user, id: Date.now().toString() };
	await saveUser(newUser);
	return Response.json({ msg: "user created" });
};
