import React from 'react'
import Alert from '@material-ui/lab/Alert';

const Error = ({ message = 'Noget gik galt.. prøv igen' }) => {
  return <Alert severity="error">{message}</Alert>
}

export default Error