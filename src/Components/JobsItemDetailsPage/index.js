import Loader from 'react-loader-spinner'
import {IoLocationSharp, IoBag} from 'react-icons/io5'
import {RiExternalLinkLine} from 'react-icons/ri'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const apiConstraint = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class JobsItemDetailsPage extends Component {
  state = {
    eachJobDetails: {},
    skillsData: [],
    lifeAtCompany: {},
    similarJobs: [],
    initialStatus: apiConstraint.initial,
  }

  componentDidMount() {
    this.getEachJobDetails()
  }

  retryJobDetails = () => {
    this.getEachJobDetails()
  }

  getEachJobDetails = async () => {
    this.setState({initialStatus: apiConstraint.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const ULR = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(ULR, options)
    const Data = await response.json()
    if (response.ok === true) {
      const updatedJobDetailsData = {
        companyLogo: Data.job_details.company_logo_url,
        companyWebsiteUrl: Data.job_details.company_website_url,
        employeeType: Data.job_details.employment_type,
        jobDescription: Data.job_details.job_description,
        location: Data.job_details.location,
        LPA: Data.job_details.package_per_annum,
        rating: Data.job_details.rating,
        title: Data.job_details.title,
      }
      const updatedSkillsData = Data.job_details.skills.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      const updatedLifeAtCompany = {
        description: Data.job_details.life_at_company.description,
        imageUrl: Data.job_details.life_at_company.image_url,
      }
      const updatedSimilarJobsData = Data.similar_jobs.map(eachItem => ({
        companyLogo: eachItem.company_logo_url,
        title: eachItem.title,
        rating: eachItem.rating,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        employeeType: eachItem.employment_type,
        id: eachItem.id,
      }))
      this.setState({
        eachJobDetails: updatedJobDetailsData,
        skillsData: updatedSkillsData,
        lifeAtCompany: updatedLifeAtCompany,
        similarJobs: updatedSimilarJobsData,
        initialStatus: apiConstraint.success,
      })
    } else {
      this.setState({initialStatus: apiConstraint.failure})
    }
  }

  renderLoadingCard = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessCard = () => {
    const {eachJobDetails, skillsData, lifeAtCompany, similarJobs} = this.state
    return (
      <div>
        <div className="specificCardDetailsContainer">
          <div className="jobTopSide">
            <div>
              <img
                src={eachJobDetails.companyLogo}
                alt="job details company logo"
                className="eachCompanyLogo"
              />
            </div>
            <div>
              <h1 className="eachCompanyTitle">{eachJobDetails.title}</h1>
              <div className="ratingContainer">
                <FaStar className="starIcon" />
                <p className="rating">{eachJobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="locationAndlpaContainer">
            <div className="locationContainer">
              <div className="location">
                <IoLocationSharp className="icon" />
                <p>{eachJobDetails.location}</p>
              </div>
              <div className="location">
                <IoBag className="icon" />
                <p>{eachJobDetails.employeeType}</p>
              </div>
            </div>
            <div>
              <p>{eachJobDetails.LPA}</p>
            </div>
          </div>
          <hr />
          <div className="visitAndHeadingContainer">
            <h1 className="descriptionHeading">Description</h1>
            <div className="anchorContainer">
              <a href={eachJobDetails.companyWebsiteUrl} className="visit">
                Visit
              </a>
              <RiExternalLinkLine className="visitLogo" />
            </div>
          </div>
          <p className="jobDescription">{eachJobDetails.jobDescription}</p>
          <h1 className="descriptionHeading">Skills</h1>
          <ul className="skillsContainer">
            {skillsData.map(eachItem => (
              <li key={eachItem.name} className="eachSkillItem">
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="skillImage"
                />
                <p className="skillPara">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="descriptionHeading">Life at Company</h1>
          <div className="lifeAtCompanyContainer">
            <p className="lifeAtCompanyPara">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="lifeAtCompanyImage"
            />
          </div>
        </div>
        <h1 className="descriptionHeading">Similar Jobs</h1>
        <ul className="SimilarJobsContainer">
          {similarJobs.map(eachSimilarJobs => (
            <li className="eachSmiliarJobsContainer" key={eachSimilarJobs.id}>
              <div className="jobTopSide">
                <div>
                  <img
                    src={eachSimilarJobs.companyLogo}
                    alt="similar job company logo"
                    className="eachCompanyLogo"
                  />
                </div>
                <div>
                  <h1 className="eachCompanyTitle">{eachSimilarJobs.title}</h1>
                  <div className="ratingContainer">
                    <FaStar className="starIcon" />
                    <p className="rating">{eachSimilarJobs.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="descriptionHeading">Description</h1>
              <p className="similarjobsPara">
                {eachSimilarJobs.jobDescription}
              </p>
              <div className="belowContainer">
                <div className="eachlogoAndLabelItem">
                  <MdLocationOn className="eachLogoItem" />
                  <p className="labelItem">{eachSimilarJobs.location}</p>
                </div>
                <div className="eachlogoAndLabelItem">
                  <IoBag className="eachLogoItem" />
                  <p className="labelItem">{eachSimilarJobs.employeeType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFailureCard = () => (
    <div className="eachFailureJobContainer">
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
    </div>
  )

  renderCards = () => {
    const {initialStatus} = this.state
    switch (initialStatus) {
      case apiConstraint.loading:
        return this.renderLoadingCard()
      case apiConstraint.success:
        return this.renderSuccessCard()
      case apiConstraint.failure:
        return this.renderFailureCard()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="eachJobsDetailsContainer">{this.renderCards()}</div>
      </div>
    )
  }
}

export default withRouter(JobsItemDetailsPage)
