import { TextField } from '@material-ui/core'

const AntagetFraDato = ({ identifier, handleChange, handleSubmit }) => {
  const { id, label } = identifier

  return (
    <TextField
      id={id}
      fullWidth
      label={label}
      type='date'
      variant='outlined'
      InputLabelProps={{ shrink: true }}
      onChange={(event) => handleChange(event)}
      />
  )
}

export default AntagetFraDato