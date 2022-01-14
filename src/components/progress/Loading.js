import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Typography } from '@material-ui/core'

const Loading = ({ message = 'Henter data' }) => {
  return (
    <>
      <Typography variant='h5'>{message}</Typography>
      <LinearProgress />
    </>
  )
}

export default Loading
