import { TextField } from '@material-ui/core'
import React from 'react'
import withEnterKeyPressed from '../../../../hocs/WithEnterKeyPressed'

const Toldsted = React.memo(({ value, handleEnterKey }) => {
  return (
      <TextField
          id={'toldsted'}
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

export default withEnterKeyPressed(Toldsted)
