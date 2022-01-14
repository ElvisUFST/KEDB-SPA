import { TextField } from '@material-ui/core'
import React from 'react'
import withEnterKeyPressed from '../../../../hocs/WithEnterKeyPressed'

const id = 'workzoneJournalnummer'

const Journalnummer = React.memo(({ value, setState, handleEnterKey }) => {
  return (
    <TextField
      id={id}
      type='input'
      style={{ margin: 3 }}
      fullWidth
      margin='normal'
      size='small'
      value={value || ''}
      variant='outlined'
      onChange={(event) =>
        setState({ type: 'HANDLE_CHANGE_TOPSECTION', payload: event })
      }
      error={!value}
      helperText={!value && "* Journalnummer skal udfyldes "}
      onKeyPress={(event) => handleEnterKey(event)}
    />
  )
})

export default withEnterKeyPressed(Journalnummer)
