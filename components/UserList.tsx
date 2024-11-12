import { fetchUsers } from "@/utils/actions";
import DeleteBtn from "./DeleteBtn";
const UserList = async () => {
	const users = await fetchUsers();

	return (
		<div>
			{users.length > 0 ? (
				<div>
					{users.map((user) => {
						return (
							<div className="flex gap-x-8 items-center justify-center">
								<h1 key={user.id}>{user.first_name}</h1>
								<DeleteBtn id={user.id}></DeleteBtn>
							</div>
						);
					})}
				</div>
			) : (
				<h1>No users found</h1>
			)}
		</div>
	);
};
export default UserList;
