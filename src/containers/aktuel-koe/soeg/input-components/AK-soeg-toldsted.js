import { MenuItem, Select } from '@material-ui/core'

const Toldsted = ({ identifier, options, value, handleChange }) => {
  return (
    <Select
      name={identifier}
      fullWidth
      value={value}
      onChange={(event) => handleChange(event)}>
      <MenuItem value=''>
        <em>----</em>
      </MenuItem>

      {options && options.map((option) => (
        <MenuItem key={option} value={option}>{option}</MenuItem>
      ))}
    </Select>
  )
}

export default Toldsted
