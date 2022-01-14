import { InputLabel, TextField } from '@material-ui/core'
import React from 'react'
import { formatLocaleDateDK } from '../../../../utils/dateUtils'

const id = 'dagsDato'
const label = 'Dags dato'

const DagsDato = React.memo(({ value }) => {
  if (value) {
    value = formatLocaleDateDK(value)
  }

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

export default DagsDato
