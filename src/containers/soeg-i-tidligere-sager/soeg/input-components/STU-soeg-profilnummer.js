import { MenuItem, TextField } from '@material-ui/core'

const Profilnummer = ({ disabled, value, options, handleChange }) => {
  return (
    <TextField
      name='profilnummer'
      label='Profilnumre'
      select
      fullWidth
      variant='outlined'
      value={value}
      disabled={disabled}
      onChange={(event) => handleChange(event)}>
      <MenuItem value=''>
        <em>----</em>
      </MenuItem>

      {options.map((option) => (
        <MenuItem key={option.id} value={option.profilNummer}>
          {option.profilNummer}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Profilnummer
