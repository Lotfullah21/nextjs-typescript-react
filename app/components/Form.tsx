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
	const [message, formAction] = useFormState(createUser, null);
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<div className="grid justify-center items-center">
			{message && <p>{message}</p>}
			<form
				ref={formRef}
				action={async (formData) => {
					// Call server-side action to create the user
					formAction(formData);
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
