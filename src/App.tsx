import { Router, Route, Switch } from 'react-router'

import ApolloProvider from './ApolloProvider'
import { AuthProvider } from './context/Auth'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import TaskPage from './pages/TaskPage'

import Navbar from './components/Navbar'

import { createHashHistory } from 'history'

const history = createHashHistory()

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route path="/task/:id" component={TaskPage} />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
