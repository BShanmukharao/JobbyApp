import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const HomePage = props => {
  const MoveToJobsPage = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="homePageContainer">
      <Header />
      <div className="homeBodyContainer">
        <h1 className="HomeHeading">Find The Job That Fits Your Life</h1>
        <p className="HomeDescription">
          Millions of people are searching for jobs, salary information,company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          type="button"
          className="findJobsButton"
          onClick={MoveToJobsPage}
        >
          <Link to="/jobs">Find Jobs</Link>
        </button>
      </div>
    </div>
  )
}

export default HomePage
