import { TextField } from '@material-ui/core'

const Oprindelsesland = ({ value, handleChange, handleSubmit }) => {
  return (
    <TextField
      id='oprindelsesland'
      label='Oprindelsesland'
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

export default Oprindelsesland
