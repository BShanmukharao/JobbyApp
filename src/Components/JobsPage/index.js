import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmployeeType from '../EmployeeType'
import EachJobCard from '../EachJobCard'
import EmployeeSalary from '../EmployeeSalary'
import './index.css'

const apiConstraint = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    initialProfileStatus: apiConstraint.initial,
    profileDetails: {},
    initialJobStatus: apiConstraint.initial,
    jobsDetails: [],
    userSearchJob: '',
    minimumPackage: '',
    employeeTypeList: [],
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  clickSearchButton = () => {
    this.getJobsData()
  }

  readUserSearchInput = event => {
    this.setState({userSearchJob: event.target.value})
  }

  renderUserEnteredInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  retryProfileDetails = () => {
    this.getProfileData()
  }

  retryJobDetails = () => {
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({initialProfileStatus: apiConstraint.loading})
    const jwtToken = Cookies.get('jwt_token')
    const URL = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(URL, options)
    const profileData = await response.json()
    if (response.ok === true) {
      const updatedProfileData = {
        profileName: profileData.profile_details.name,
        profileImage: profileData.profile_details.profile_image_url,
        profileBio: profileData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileData,
        initialProfileStatus: apiConstraint.success,
      })
    } else {
      this.setState({initialProfileStatus: apiConstraint.failure})
    }
  }

  getJobsData = async () => {
    const {userSearchJob, minimumPackage, employeeTypeList} = this.state
    const empType = employeeTypeList.join()
    this.setState({initialJobStatus: apiConstraint.loading})
    const jwtToken = Cookies.get('jwt_token')
    const URL = `https://apis.ccbp.in/jobs?search=${userSearchJob}&minimum_package=${minimumPackage}&employment_type=${empType}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(URL, options)
    const jobsData = await response.json()
    if (response.ok === true) {
      const updatedJobsData = jobsData.jobs.map(eachJobsItem => ({
        compantLogo: eachJobsItem.company_logo_url,
        employeeType: eachJobsItem.employment_type,
        id: eachJobsItem.id,
        jonDescription: eachJobsItem.job_description,
        location: eachJobsItem.location,
        LPA: eachJobsItem.package_per_annum,
        rating: eachJobsItem.rating,
        title: eachJobsItem.title,
      }))

      this.setState({
        jobsDetails: updatedJobsData,
        initialJobStatus: apiConstraint.success,
      })
    } else {
      this.setState({initialJobStatus: apiConstraint.failure})
    }
  }

  renderSuccessProfile = () => {
    const {profileDetails} = this.state
    const {profileImage, profileName, profileBio} = profileDetails
    return (
      <div className="successProfileContainer">
        <img src={profileImage} alt="profile" />
        <h1 className="profileName">{profileName}</h1>
        <p className="profileBio">{profileBio}</p>
      </div>
    )
  }

  renderFailureProfile = () => (
    <div className="loader-container">
      <button
        type="button"
        data-testid="button"
        className="profileRetryButton"
        onClick={this.retryProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingProfile = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessJob = () => {
    const {jobsDetails} = this.state
    return (
      <div>
        {jobsDetails.length === 0 ? (
          this.renderNojobCard()
        ) : (
          <ul className="uljobsContainer">
            {jobsDetails.map(eachJobDetails => (
              <EachJobCard
                eachJobDetails={eachJobDetails}
                key={eachJobDetails.id}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderFailureJob = () => (
    <div className="failureJobContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureViewImage"
      />
      <h1 className="failureJobHeading">Oops! Something Went Wrong</h1>
      <p className="failureJobDescription">
        We cannot seem to find the page you are looking for.
      </p>
      <div>
        <button
          type="button"
          data-testid="button"
          className="profileRetryButton"
          onClick={this.retryJobDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderProfileCard = () => {
    const {initialProfileStatus} = this.state
    switch (initialProfileStatus) {
      case apiConstraint.success:
        return this.renderSuccessProfile()
      case apiConstraint.loading:
        return this.renderLoadingProfile()
      case apiConstraint.failure:
        return this.renderFailureProfile()
      default:
        return null
    }
  }

  renderJobsCard = () => {
    const {initialJobStatus} = this.state
    switch (initialJobStatus) {
      case apiConstraint.success:
        return this.renderSuccessJob()
      case apiConstraint.loading:
        return this.renderLoadingProfile()
      case apiConstraint.failure:
        return this.renderFailureJob()
      default:
        return null
    }
  }

  renderNojobCard = () => (
    <div className="noJobsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="noJobImage"
      />
      <h1 className="failureJobHeading">No Jobs Found</h1>
      <p className="noJobsDescription">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  onGetEmployeeTypeId = employeeType => {
    const {employeeTypeList} = this.state
    if (employeeTypeList.includes(employeeType)) {
      const FilterData = employeeTypeList.filter(
        eachItem => eachItem !== employeeType,
      )
      this.setState({employeeTypeList: FilterData}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          employeeTypeList: [...prevState.employeeTypeList, employeeType],
        }),
        this.getJobsData,
      )
    }
  }

  GetDataBaseSalary = salary => {
    this.setState({minimumPackage: salary}, this.getJobsData)
  }

  render() {
    const {userSearchJob} = this.state

    return (
      <div className="JobsPageContainer">
        <Header />
        <div className="jobsContainer">
          <div className="JobsPageLeftContainer">
            {this.renderProfileCard()}
            <hr className="breakLine" />
            <h1 className="typeOfEmployee">Type of Employment</h1>
            <ul className="employmentTypesListContainer">
              {employmentTypesList.map(eachType => (
                <EmployeeType
                  eachType={eachType}
                  key={eachType.employmentTypeId}
                  getEmployeeTypeId={this.onGetEmployeeTypeId}
                />
              ))}
            </ul>
            <hr className="breakLine" />
            <h1 className="typeOfEmployee">Salary Range</h1>
            <ul className="employmentTypesListContainer">
              {salaryRangesList.map(eachSalaryDetails => (
                <EmployeeSalary
                  eachSalaryDetails={eachSalaryDetails}
                  key={eachSalaryDetails.salaryRangeId}
                  GetDataBaseSalary={this.GetDataBaseSalary}
                />
              ))}
            </ul>
          </div>
          <div className="JobsPageRightContainer">
            <div className="searchContainer">
              <input
                type="search"
                className="searchInput"
                placeholder="Search"
                value={userSearchJob}
                onChange={this.readUserSearchInput}
                onKeyDown={this.renderUserEnteredInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                label="search"
                className="searchIconContainer"
                onClick={this.clickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsCard()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
