import logo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-14">
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="object-contain w-6" />{' '}
          <p className="ml-3 text-lg font-bold">WorkFlowy</p>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
