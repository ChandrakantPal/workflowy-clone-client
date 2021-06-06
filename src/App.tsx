import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ApolloProvider from './ApolloProvider'
import { AuthProvider } from './context/Auth'

import Login from './pages/Login'
import Register from './pages/Register'

import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
