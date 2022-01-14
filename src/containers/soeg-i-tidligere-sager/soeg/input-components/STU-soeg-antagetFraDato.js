import { TextField } from '@material-ui/core'

const AntagetFraDato = ({ handleChange }) => {
  return (
    <TextField
      id='antagetFraDato'
      label='Antaget fra dato'
      fullWidth
      type='date'
      variant='outlined'
      InputLabelProps={{ shrink: true }}
      onChange={(event) => handleChange(event)} />
  )
}

export default AntagetFraDato