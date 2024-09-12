import { fetchUsers } from "../utils/actions";

async function UserList() {
	const users = await fetchUsers();

	return (
		<div className="grid justify-center items-center mt-8">
			{users.length ? (
				<div>
					{users.map((user) => {
						return (
							<h4 key={user.id} className="text-4xl capitalize">
								{user.firstName} {user.lastName}
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
