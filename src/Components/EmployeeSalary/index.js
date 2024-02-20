import './index.css'

const EmployeeSalary = props => {
  const {eachSalaryDetails, GetDataBaseSalary} = props
  const {salaryRangeId, label} = eachSalaryDetails

  const onGetDataBaseSalary = event => {
    GetDataBaseSalary(event.target.value)
  }

  return (
    <li className="eachEmployeeTypeItem">
      <input
        type="radio"
        id={salaryRangeId}
        name="myname"
        value={salaryRangeId}
        onClick={onGetDataBaseSalary}
      />
      <label
        htmlFor={salaryRangeId}
        className="eachEmployeeLabelItem"
        value={label}
      >
        {label}
      </label>
    </li>
  )
}

export default EmployeeSalary
