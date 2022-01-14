import { TextField } from '@material-ui/core'
import React from 'react'
import withEnterKeyPressed from '../../../../hocs/WithEnterKeyPressed'

const id = 'referencenummer'

const Referencenummer = React.memo(({ value, handleEnterKey }) => {
  return (
    <TextField
      id={id}
      style={{ margin: 3 }}
      fullWidth
      size='small'
      variant='outlined'
      value={value || ''}
      InputProps={{
        readOnly: true,
      }}
      onKeyPress={(event) => handleEnterKey(event)}
    />
  )
})

export default withEnterKeyPressed(Referencenummer)
