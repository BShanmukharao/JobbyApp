import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class LoginPage extends Component {
  state = {isShownErrorMsg: false, errorMessage: '', username: '', password: ''}

  onSubmitSuccess = jwtToken => {
    this.setState({isShownErrorMsg: false, errorMessage: ''})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isShownErrorMsg: true, errorMessage: errorMsg})
  }

  readFormData = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const URL = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(URL, options)
    const Data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(Data.jwt_token)
    } else {
      this.onSubmitFailure(Data.error_msg)
    }
  }

  readUserName = event => {
    this.setState({username: event.target.value})
  }

  readPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {isShownErrorMsg, errorMessage, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginContainer">
        <form className="formContainer" onSubmit={this.readFormData}>
          <div className="websiteLogoContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogoImage"
            />
          </div>
          <div className="inputItemContainer">
            <label htmlFor="USERNAME" className="labelItem">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="USERNAME"
              placeholder="Username"
              className="inputSearchITem"
              value={username}
              onChange={this.readUserName}
            />
          </div>
          <div className="inputItemContainer">
            <label htmlFor="PASSWORD" className="labelItem">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="PASSWORD"
              placeholder="Password"
              className="inputSearchITem"
              value={password}
              onChange={this.readPassword}
            />
          </div>
          <div>
            <button type="submit" className="loginButton">
              Login
            </button>
          </div>
          {isShownErrorMsg && <p className="errorMsg">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default LoginPage
