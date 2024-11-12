import { deleteUser, removeUser } from "@/utils/actions";

const DeleteBtn = ({ id }: { id: string }) => {
	const removeUserWithId = removeUser.bind(null, id);

	return (
		<form action={removeUserWithId}>
			<button
				className="bg-red-700 rounded py-1 px-3 text-white"
				name="id"
				value={id}>
				delete
			</button>
		</form>
	);
};
export default DeleteBtn;
