import { TextField } from '@material-ui/core'
import React from 'react'
import withEnterKeyPressed from '../../../../hocs/WithEnterKeyPressed'

const Branchekode = React.memo(({ value, handleEnterKey }) => {
  return (
    <TextField
      id='branchekode'
      style={{ margin: 3 }}
      size='small'
      fullWidth
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

export default withEnterKeyPressed(Branchekode)
