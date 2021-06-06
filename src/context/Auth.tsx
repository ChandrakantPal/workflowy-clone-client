import { createContext, useContext, useReducer } from 'react'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { User } from '../types'

interface State {
  authenticated: boolean
  user: User | undefined
}

interface Action {
  type: string
  payload: any
}

const initialState: State = {
  user: null,
  authenticated: false,
}
const token = localStorage.getItem('token')
if (token) {
  const decodedToken = jwt_decode<JwtPayload>(token)
  const expiresAt = new Date(decodedToken.exp * 1000)
  if (new Date() > expiresAt) {
    localStorage.removeItem('token')
  } else {
    initialState.user = decodedToken as User
    initialState.authenticated = true
  }
} else console.log('no token found')

const StateContext = createContext<State>({
  user: null,
  authenticated: false,
})

const DispatchContext = createContext(null)

const authReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN':
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        authenticated: true,
        user: payload,
      }
    case 'LOGOUT':
      localStorage.removeItem('token')
      return {
        ...state,
        authenticated: false,
        user: null,
      }
    default:
      throw new Error(`Unknow action type: ${type}`)
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(authReducer, initialState)

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload })

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch = () => useContext(DispatchContext)
