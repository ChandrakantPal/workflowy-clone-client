import { useState } from 'react'
import { Redirect } from 'react-router'
import InputGroup from '../components/InputGroup'
import { useAuthState } from '../context/Auth'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})

  const { authenticated } = useAuthState()

  if (authenticated) return <Redirect to="/" />

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-center md:w-80">
        <h1 className="mb-3 text-2xl font-semibold">Log in to WorkFlowy</h1>
        <form>
          <InputGroup
            placeholder="Username"
            type="text"
            value={username}
            setValue={setUsername}
            error={errors.username}
            className="w-full mb-3"
          />
          <InputGroup
            placeholder="Password"
            type="password"
            value={password}
            setValue={setPassword}
            error={errors.password}
            className="w-full mb-3"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 my-3 text-xs font-medium text-white uppercase border rounded-full bg-picton-blue border-picton-blue "
            // disabled={loading}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
