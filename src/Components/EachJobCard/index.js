import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {IoLocationSharp, IoBag} from 'react-icons/io5'
import './index.css'

const EachJobCard = props => {
  const {eachJobDetails} = props
  const {
    compantLogo,
    title,
    rating,
    location,
    employeeType,
    LPA,
    jonDescription,
    id,
  } = eachJobDetails
  return (
    <li className="eachJobListItem">
      <Link to={`/jobs/${id}`}>
        <div className="jobTopSide">
          <div>
            <img
              src={compantLogo}
              alt="company logo"
              className="eachCompanyLogo"
            />
          </div>
          <div>
            <h1 className="eachCompanyTitle">{title}</h1>
            <div className="ratingContainer">
              <FaStar className="starIcon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="locationAndlpaContainer">
          <div className="locationContainer">
            <div className="location">
              <IoLocationSharp className="icon" />
              <p>{location}</p>
            </div>
            <div className="location">
              <IoBag className="icon" />
              <p>{employeeType}</p>
            </div>
          </div>
          <div>
            <p>{LPA}</p>
          </div>
        </div>
        <hr />
        <h1 className="descriptionHeading">Description</h1>
        <p className="jobDescription">{jonDescription}</p>
      </Link>
    </li>
  )
}

export default EachJobCard
