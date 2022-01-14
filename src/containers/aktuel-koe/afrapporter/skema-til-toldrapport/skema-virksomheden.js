import { InputLabel, TextField } from '@material-ui/core'
import React from 'react'
const SkemaVaremodtagernavn = ({ object, handleToldrapportChanges }) => {
  const { id, value } = object
  const label = 'Varemodtager navn'
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextField
        id={id}
        style={{ margin: 8 }}
        fullWidth
        margin='normal'
        size='small'
        value={value || ''}
        variant='outlined'
        onChange={(event) => handleToldrapportChanges(event)}
        disabled
      />
    </>
  )
}
export default SkemaVaremodtagernavn
