import { InputLabel, TextareaAutosize } from '@material-ui/core'
import React from 'react'

const id = 'taltMed'
const label = 'Talt med (kontaktperson)'

const TaltMedKontaktperson = React.memo(({ value, setState }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextareaAutosize
        id={id}
        type='input'
        style={{ width: '100%' }}
        value={value || ''}
        variant='outlined'
        rowsMin={10}
        rowsMax={15}
        onChange={(event) => setState({ type: 'HANDLE_CHANGE_TOLDRAPPORT', payload: event })}
      />
    </>
  )
})

export default TaltMedKontaktperson
