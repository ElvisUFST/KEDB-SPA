import { TextField } from '@material-ui/core'

const AntagetTilDato = ({ identifier, handleChange }) => {
  const { id, label } = identifier

  return (
    <TextField
      id={id}
      label={label}
      fullWidth
      type='date'
      variant='outlined'
      InputLabelProps={{ shrink: true }}
      onChange={(event) => handleChange(event)} />
  )
}

export default AntagetTilDato