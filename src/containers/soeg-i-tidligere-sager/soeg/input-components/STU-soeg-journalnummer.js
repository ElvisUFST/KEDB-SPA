import { TextField } from '@material-ui/core'

const Journalnummer = ({ value, handleChange, handleSubmit }) => {
  return (
    <TextField
      id='workzoneJournalnummer'
      fullWidth
      label='Journalnummer'
      type='input'
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

export default Journalnummer
