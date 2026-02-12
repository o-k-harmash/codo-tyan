import { useUserStore } from "@/stores/userStore"

export default function Settings() {
  const { user } = useUserStore()

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Нет данных пользователя</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700"
          >
            User ID
          </label>
          <input
            id="userId"
            type="text"
            value={user.userId}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
              bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue={user.email}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              defaultValue={user.firstName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              defaultValue={user.lastName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="userName"
            type="text"
            defaultValue={user.userName}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Avatar
          </label>
          <img
            src={`data:image/png;base64,${user.avatar}`}
            alt="avatar"
            className="mt-2 h-20 w-20 rounded-full border border-gray-300
              object-cover"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow
            hover:bg-indigo-700 transition"
        >
          Save changes
        </button>
      </form>
    </div>
  )
}
