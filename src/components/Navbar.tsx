import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAuthDispatch, useAuthState } from '../context/Auth'

const Navbar = () => {
  const { authenticated } = useAuthState()
  const dispatch = useAuthDispatch()
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-14">
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="object-contain w-6" />{' '}
          <p className="ml-3 text-lg font-bold">WorkFlowy</p>
        </div>
        {authenticated ? (
          <button
            onClick={() => dispatch('LOGOUT')}
            className="px-2 py-1 bg-gray-200 rounded-full outline-none focus:outline-none"
          >
            Logout
          </button>
        ) : location.pathname === '/login' ? (
          <Link to="/signup" className="px-2 py-1 bg-gray-200 rounded-full ">
            Signup
          </Link>
        ) : (
          <Link to="/login" className="px-2 py-1 bg-gray-200 rounded-full ">
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Navbar
