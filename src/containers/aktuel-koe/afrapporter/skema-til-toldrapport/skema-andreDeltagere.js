import { InputLabel, TextField } from '@material-ui/core'
import React from 'react'

const id = 'andreDeltagere'
const label = 'Andre deltagere'

const AndreDeltagere = React.memo(({ value, setState }) => {
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
        onChange={(event) => setState({ type: 'HANDLE_CHANGE_TOLDRAPPORT', payload: event })}
      />
    </>
  )
})

export default AndreDeltagere
