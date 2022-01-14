import { TextField } from '@material-ui/core'
import React from 'react'
import withEnterKeyPressed from '../../../../hocs/WithEnterKeyPressed'
import { formatLocaleDateDK } from '../../../../utils/dateUtils'

const AfrapporteretDato = React.memo(({ value, handleEnterKey }) => {
  if (value) {
    value = formatLocaleDateDK(value)
  }

  return (
      <TextField
          id='afrapporteretDato'
          style={{ margin: 3 }}
          fullWidth
          size='small'
          margin='normal'
          variant='outlined'
          value={value || ''}
          InputProps={{
            readOnly: true,
          }}
          onKeyPress={(event) => handleEnterKey(event)}
      />
  )
})

export default withEnterKeyPressed(AfrapporteretDato)
