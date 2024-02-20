import './index.css'

const EmployeeType = props => {
  const {eachType, getEmployeeTypeId} = props
  const {label, employmentTypeId} = eachType
  const onEmployeeType = event => {
    getEmployeeTypeId(event.target.value)
  }

  return (
    <li className="eachEmployeeTypeItem">
      <input
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        onClick={onEmployeeType}
      />
      <label
        htmlFor={employmentTypeId}
        className="eachEmployeeLabelItem"
        value={employmentTypeId}
      >
        {label}
      </label>
    </li>
  )
}

export default EmployeeType
