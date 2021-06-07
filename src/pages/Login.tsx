import { FormEvent, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { Redirect, useHistory } from 'react-router'

import { useAuthDispatch, useAuthState } from '../context/Auth'

import InputGroup from '../components/InputGroup'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})

  const dispatch = useAuthDispatch()
  const { authenticated } = useAuthState()

  const history = useHistory()

  const [loginUser] = useLazyQuery(LOGIN_USER, {
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token)
      dispatch('LOGIN', data.login)
      history.push('/')
    },
  })

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    loginUser({ variables: { username, password } })
  }

  if (authenticated) return <Redirect to="/" />

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-center md:w-80">
        <h1 className="mb-3 text-2xl font-semibold">Log in to WorkFlowy</h1>
        <form onSubmit={submitHandler}>
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
            className="w-full px-4 py-2 my-3 text-xs font-medium text-white uppercase border rounded-full outline-none bg-picton-blue border-picton-blue focus:outline-none"
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

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`
