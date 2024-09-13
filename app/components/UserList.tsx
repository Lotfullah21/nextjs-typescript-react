import { fetchUsers } from "../utils/actions";
import DeleteButton from "./DeleteButton";
async function UserList() {
	const users = await fetchUsers();
	return (
		<div className="grid justify-center items-center mt-8">
			{users.length ? (
				<div className="max-w-lg">
					{users.map((user) => {
						return (
							<h4
								key={user.id}
								className="text-2xl capitalize flex flex-cols-2 mt-2 gap-x-8 items-center justify-between">
								{user.firstName} {user.lastName}
								<DeleteButton id={user.id}></DeleteButton>
							</h4>
						);
					})}
				</div>
			) : (
				<div>
					<p>Users list is empty</p>
				</div>
			)}
		</div>
	);
}
export default UserList;
