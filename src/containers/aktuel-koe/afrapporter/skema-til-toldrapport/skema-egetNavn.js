import { InputLabel, TextField } from '@material-ui/core'
import React from 'react'

const id = 'egetNavn'
const label = 'Eget navn'

const EgetNavn = React.memo(({ value }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextField
        id={id}
        type='input'
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

export default EgetNavn
