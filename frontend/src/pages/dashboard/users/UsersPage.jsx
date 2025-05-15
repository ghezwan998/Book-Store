import { useDeleteUserMutation, useToggleAdminMutation, useGetAllUsersQuery } from '../../../redux/userApi';

const UsersPage = () => {
  const { data: users = [] } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [toggleAdmin] = useToggleAdminMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      await deleteUser(id);
    }
  };

  const handleToggleAdmin = async (user) => {
    await toggleAdmin({ id: user._id, isAdmin: !user.isAdmin });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">👥 Users</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
              <div className="text-xs text-gray-500">
                {user.isAdmin ? 'Admin' : 'Customer'}
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleToggleAdmin(user)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                {user.isAdmin ? 'Revoke Admin' : 'Make Admin'}
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage