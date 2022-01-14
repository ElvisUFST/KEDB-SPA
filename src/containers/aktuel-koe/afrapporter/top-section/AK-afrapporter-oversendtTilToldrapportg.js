import { Checkbox } from '@material-ui/core'
import React from 'react'
import HelperText from './HelperText'

const id = 'oversendtTilToldrapport'

const OversendtTilToldrapport = React.memo(({ value, setState }) => {
  return (
    <HelperText title='Dette felt afkrydses når sagen er sendt til ansvarsvurdering.'>
      <Checkbox
        id={id}
        color='primary'
        checked={value || null}
        onChange={(event) =>
          setState({ type: 'HANDLE_CHANGE_TOPSECTION', payload: event })
        }
      />
    </HelperText>
  )
})

export default OversendtTilToldrapport
