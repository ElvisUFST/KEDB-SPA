import { TextField } from '@material-ui/core'

const AntagetTilDato = ({ handleChange }) => {
  return (
    <TextField
      id='antagetTilDato'
      label='Antaget til dato'
      fullWidth
      type='date'
      variant='outlined'
      InputLabelProps={{ shrink: true }}
      onChange={(event) => handleChange(event)} />
  )
}

export default AntagetTilDato