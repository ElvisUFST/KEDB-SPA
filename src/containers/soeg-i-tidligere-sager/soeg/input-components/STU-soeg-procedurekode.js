import { TextField } from '@material-ui/core'

const Procedurekode = ({ value, handleChange, handleSubmit }) => {
  return (
    <TextField
      id='procedurekode'
      label='Procedurekode'
      fullWidth
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

export default Procedurekode
