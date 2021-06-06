import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ApolloProvider from './ApolloProvider'
import { AuthProvider } from './context/Auth'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import TaskPage from './pages/TaskPage'

import Navbar from './components/Navbar'

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/task/:id" component={TaskPage} />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
