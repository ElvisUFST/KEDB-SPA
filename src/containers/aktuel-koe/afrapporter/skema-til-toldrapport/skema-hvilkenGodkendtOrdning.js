import { InputLabel, TextareaAutosize } from '@material-ui/core'
import React from 'react'

const id ='godkendtOrdningTekst'
const label = 'Hvilken godkendt ordning'

const HvilkenGodkendtOrdning = React.memo(({ value, setState }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextareaAutosize
        id={id}
        type='input'
        style={{ width: '100%' }}
        size='small'
        value={value || ''}
        variant='outlined'
        rowsMin={10}
        rowsMax={15}
        onChange={(event) => setState({ type: 'HANDLE_CHANGE_TOLDRAPPORT', payload: event })}
      />
    </>
  )
})

export default HvilkenGodkendtOrdning
