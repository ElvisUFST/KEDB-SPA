import { TextField } from '@material-ui/core'
import React from 'react'
import withEnterKeyPressed from '../../../../hocs/WithEnterKeyPressed'

const VaremodtagerCvr = React.memo(({ value, handleEnterKey }) => {
  return (
    <TextField
      id='varemodtagerCVR'
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

export default withEnterKeyPressed(VaremodtagerCvr)
