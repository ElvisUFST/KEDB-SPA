import { Checkbox, InputLabel } from '@material-ui/core'
import React from 'react'

const id = 'toldkontrol'
const label = 'Toldkontrol'

const Toldkontrol = React.memo(({ value, setState }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Checkbox
        id={id}
        color='primary'
        checked={value || null}
        onChange={(event) => setState({ type: 'HANDLE_CHANGE_TOLDRAPPORT', payload: event })}
      />
    </>
  )
})

export default Toldkontrol
