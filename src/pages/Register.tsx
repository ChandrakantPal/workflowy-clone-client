import { FormEvent, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Link, Redirect, useHistory } from 'react-router-dom'

import { useAuthDispatch, useAuthState } from '../context/Auth'

import InputGroup from '../components/InputGroup'

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<any>({})

  const dispatch = useAuthDispatch()
  const { authenticated } = useAuthState()

  const history = useHistory()

  const [registerUser] = useMutation(REGISTER_USER, {
    update: (_, { data: { register: userData } }) => {
      localStorage.setItem('token', userData.token)
      dispatch('LOGIN', userData)
      history.push('/')
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].extensions.exception.errors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
  })

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    registerUser({ variables: { username, email, password, confirmPassword } })
  }

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
        <form className="px-4 mx-auto md:w-80" onSubmit={submitHandler}>
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      email
      token
      username
      createdAt
    }
  }
`
