import { InputLabel, TextField } from '@material-ui/core'
import React from 'react'

const id = 'varemodtagerNavn'
const label = 'Varemodtager navn'

const SkemaVaremodtagernavn = React.memo(({ value }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextField
        id={id}
        fullWidth
        margin='normal'
        size='small'
        value={value || ''}
        variant='outlined'
        disabled
      />
    </>
  )
})

export default SkemaVaremodtagernavn
