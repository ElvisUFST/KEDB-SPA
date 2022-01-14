import { InputLabel, TextField } from '@material-ui/core'
import React from 'react'

const id = 'repraensentantNavn'
const label = 'Repræsentant navn'

const RepraesentantNavn = React.memo(({ value }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextField
        id={id}
        type='string'
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

export default RepraesentantNavn
