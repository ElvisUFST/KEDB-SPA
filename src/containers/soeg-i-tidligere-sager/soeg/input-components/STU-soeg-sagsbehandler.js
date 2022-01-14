import { MenuItem, TextField } from '@material-ui/core'

const Sagsbehandler = ({ disabled, value, options, handleChange }) => {
  return (
    <TextField
      name='sagsbehandler'
      select
      label='Sagsbehandler'
      variant='outlined'
      fullWidth
      value={value}
      disabled={disabled}
      onChange={(event) => handleChange(event)}>
      <MenuItem value=''>
        <em>----</em>
      </MenuItem>

      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Sagsbehandler
