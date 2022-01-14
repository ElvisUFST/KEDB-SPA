import { TextField } from '@material-ui/core'

const AfrapporteretTilDato = ({ handleChange }) => {
  return (
    <TextField
      id='afrapporteretTilDato'
      label='Afrapportereret til dato'
      fullWidth
      type='date'
      variant='outlined'
      InputLabelProps={{ shrink: true }}
      onChange={(event) => handleChange(event)} />
  )
}

export default AfrapporteretTilDato