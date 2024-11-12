"use client";
import { createUser } from "@/utils/actions";
import { useFormState, useFormStatus } from "react-dom";

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<button type="submit" className={btnStyle} disabled={pending}>
			{pending ? "submitting" : "submit"}
		</button>
	);
};

const Form = () => {
	const [message, formAction] = useFormState(createUser, null);
	return (
		<form action={formAction} className={formStyle}>
			{message ? <p>{message}</p> : ""}
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
			<SubmitButton></SubmitButton>
		</form>
	);
};
export default Form;

const formStyle = `max-w-lg flex flex-col py-4 gap-y-2 shadow rounded p-8`;
const inputStyle = `border shadow rounded py-2 px-4 text-gray-700`;
const btnStyle = `capitalize text-white py-2 px-4 bg-red-700 hover:bg-red-500 font-bold rounded`;
