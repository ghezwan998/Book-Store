import { useState } from "react"

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {}

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="shadow p-8 rounded bg-white w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
            <label htmlFor="name" className="mb-1">Full Name:</label>
            <input
              id="name"
              type="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">Email:</label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">Password:</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <button
            className="bg-amber-300 p-2 rounded hover:bg-amber-400 transition"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup