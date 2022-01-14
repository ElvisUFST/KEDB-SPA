import { Tooltip, Typography } from '@material-ui/core'
import React from 'react'

const HelperText = ({ title, children }) => {
  return (
    <Tooltip arrow title={<Typography>{title}</Typography>}>
      {React.Children.only(children)}
    </Tooltip>
  )
}

export default HelperText