import { TextField } from '@material-ui/core'
import React from 'react'
import withEnterKeyPressed from '../../../../hocs/WithEnterKeyPressed'

const Varepostnummer = React.memo(({ value, handleEnterKey }) => {
  return (
    <TextField
      id='varepostnummer'
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

export default withEnterKeyPressed(Varepostnummer)