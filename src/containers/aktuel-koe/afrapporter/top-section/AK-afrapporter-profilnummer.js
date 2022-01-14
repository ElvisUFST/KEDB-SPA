import { TextField } from '@material-ui/core'
import React from 'react'
import withEnterKeyPressed from '../../../../hocs/WithEnterKeyPressed'

const Profilnummer = React.memo(({ value, handleEnterKey }) => {
  return (
    <TextField
      id='profilnummer'
      style={{ margin: 3 }}
      fullWidth
      margin='normal'
      value={value || ''}
      size='small'
      variant='outlined'
      InputProps={{
        readOnly: true,
      }}
      onKeyPress={(event) => handleEnterKey(event)}
    />
  )
})

export default withEnterKeyPressed(Profilnummer)