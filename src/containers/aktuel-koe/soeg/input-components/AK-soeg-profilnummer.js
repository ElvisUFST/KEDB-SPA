import { TextField } from '@material-ui/core'

const Profilnummer = ({ identifier, value, handleChange, handleSubmit }) => {
  const { id, label } = identifier

  return (
    <TextField
      id={id}
      label={label}
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

export default Profilnummer