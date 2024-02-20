import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'
import LoginPage from './Components/LoginPage'
import HomePage from './Components/HomePage'
import JobsPage from './Components/JobsPage'
import JobsItemDetailsPage from './Components/JobsItemDetailsPage'
import NotFoundPage from './Components/NotFoundPage'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/jobs" component={JobsPage} />
    <ProtectedRoute exact path="/jobs/:id" component={JobsItemDetailsPage} />
    <Route path="/not-found" component={NotFoundPage} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
