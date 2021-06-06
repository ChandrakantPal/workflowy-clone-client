import { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import InputGroup from '../components/InputGroup'
import { useAuthState } from '../context/Auth'

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<any>({})

  const { authenticated } = useAuthState()

  const history = useHistory()

  if (authenticated) return <Redirect to="/" />

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-light md:text-5xl">
          <span className="font-bold">Overwhelmed?</span> We can help.
        </h1>
        <p className="px-4 mx-auto mt-8 mb-4 text-lg md:text-2xl md:w-2/3">
          WorkFlowy offers a simpler way to stay organized. If you have a crazy
          job or an ambitious project, we will be your trusty sidekick.
        </p>
        <form className="px-4 mx-auto md:w-80">
          <InputGroup
            className="w-full mb-3"
            placeholder="Enter your email"
            type="email"
            value={email}
            setValue={setEmail}
            error={errors.email}
          />
          <InputGroup
            className="w-full mb-3"
            placeholder="Enter your Username"
            type="text"
            value={username}
            setValue={setUsername}
            error={errors.username}
          />
          <InputGroup
            className="w-full mb-3"
            placeholder="Enter your password"
            type="password"
            value={password}
            setValue={setPassword}
            error={errors.password}
          />
          <InputGroup
            className="w-full mb-3"
            placeholder="Confirm your Password"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            error={errors.confirmPassword}
          />
          <button
            type="submit"
            className="py-2.5 px-6 my-3 text-sm font-medium text-white uppercase bg-picton-blue border border-picton-blue rounded-full "
            // disabled={loading}
          >
            Sign up
          </button>
          <small className="block text-center">
            Already have an account?{' '}
            <Link to="/login" className="px-2 py-1 bg-gray-200 rounded-full ">
              Login
            </Link>
          </small>
        </form>
      </div>
    </div>
  )
}

export default Register
