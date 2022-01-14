import { TextField } from '@material-ui/core'
import React from 'react'

const Referencenummer = ({ value, handleChange, handleSubmit }) => {
  return (
    <TextField
      id='referencenummer'
      label='Referencenummer'
      fullWidth
      value={value}
      variant='outlined'
      type='number'
      onChange={(event) => handleChange(event)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          handleSubmit()
        }
      }}
    />
  )
}


export default Referencenummer
