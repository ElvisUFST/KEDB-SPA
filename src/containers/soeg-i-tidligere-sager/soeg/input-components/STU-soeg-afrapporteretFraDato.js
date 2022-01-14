import { TextField } from '@material-ui/core'

const AfrapporteretFraDato = ({ handleChange }) => {
  return (
    <TextField
      id='afrapporteretFraDato'
      label='Afrapportereret fra dato'
      fullWidth
      type='date'
      variant='outlined'
      InputLabelProps={{ shrink: true }}
      onChange={(event) => handleChange(event)} />
  )
}

export default AfrapporteretFraDato