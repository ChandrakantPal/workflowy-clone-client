import { Redirect } from 'react-router'
import { useAuthState } from '../context/Auth'

const Home = () => {
  const { authenticated } = useAuthState()

  if (!authenticated) return <Redirect to="/login" />
  return <div>home</div>
}

export default Home
