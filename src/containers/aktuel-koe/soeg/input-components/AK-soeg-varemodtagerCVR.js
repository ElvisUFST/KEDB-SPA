import { TextField } from '@material-ui/core'

const VaremodtagerCVR = ({ identifier, value, handleChange, handleSubmit }) => {
  const { id, label } = identifier

  return (
    <TextField
      id={id}
      fullWidth
      label={label}
      value={value}
      variant='outlined'
      onChange={(event) => handleChange(event)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          handleSubmit()
        }
      }}
    />
  )
}

export default VaremodtagerCVR
