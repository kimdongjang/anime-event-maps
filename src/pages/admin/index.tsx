import { signIn } from 'next-auth/react'
import { useState } from 'react'

const Admin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = async () => {
    await signIn('credentials', { username, password, callbackUrl: '/admin/manage' })
  }
  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      handleLogin();
    }
  }


  return (
    <div className='flex items-center justify-center min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br'>
      <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl'>
        <div className='max-w-md mx-auto space-y-3'>
          <h3 className="text-lg font-semibold">&#128540; My Account</h3>
          <div>
            <label className="block py-1">Your Name</label>
            <input type="text" placeholder="username"  className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
            value={username} onChange={(e) => setUsername(e.target.value)} />
            <p className="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
          </div>
          <div>
            <label className="block py-1">Password</label>
            <input type="password" placeholder="password"  className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono" 
            value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
          </div>
          <div className="flex gap-3 pt-3 items-center">
            <button className="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300"
            onClick={handleLogin}>Login</button>            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin;