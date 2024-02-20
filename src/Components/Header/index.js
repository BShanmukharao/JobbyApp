import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {TiHome} from 'react-icons/ti'
import {IoBagSharp} from 'react-icons/io5'
import {IoIosLogOut} from 'react-icons/io'
import './index.css'

const Header = props => {
  const onLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div>
      <div className="aboveHeaderContainer">
        <div className="webSiteLogoContainer">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogoImage"
            />
          </Link>
        </div>
        <ul className="ulContainer">
          <li className="eachListItem">
            <Link to="/">Home</Link>
          </li>
          <li className="eachListItem">
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
        <div>
          <button type="button" className="logoutButton" onClick={onLogOut}>
            Logout
          </button>
        </div>
      </div>
      <div className="belowHeaderContainer">
        <div>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="belowWebsiteLogo"
            />
          </Link>
        </div>
        <div>
          <button label="home" type="button" className="commonButton">
            <Link to="/">
              <li className="listItem">
                <TiHome className="eachReactIcon" />
              </li>
            </Link>
          </button>
          <button label="jobs" type="button" className="commonButton">
            <Link to="/jobs">
              <IoBagSharp className="eachReactIcon" />
            </Link>
          </button>
          <button
            label="logout"
            type="button"
            className="commonButton"
            onClick={onLogOut}
          >
            <IoIosLogOut className="eachReactIcon" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
