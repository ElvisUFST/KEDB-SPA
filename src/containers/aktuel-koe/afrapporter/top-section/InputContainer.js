import { Grid, Typography } from '@material-ui/core'
import React from 'react'

const InputContainer = ({ label, children }) => {
  return (
    <Grid container justify='center' alignItems='center' item xs={12}>
      <Grid item xs={6}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={6}>
        {React.Children.only(children)}
      </Grid>
    </Grid>
  )
}

export default InputContainer
