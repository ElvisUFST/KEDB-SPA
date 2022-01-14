import { TextField } from '@material-ui/core'

const VaremodtagerCVR = ({ value, handleChange, handleSubmit }) => {
  return (
    <TextField
      id='varemodtagercvr'
      fullWidth
      label='CVR'
      value={value}
      type='number'
      variant='outlined'
      onChange={(event) => handleChange(event)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          handleSubmit()
        }
      }} />
  )
}

export default VaremodtagerCVR