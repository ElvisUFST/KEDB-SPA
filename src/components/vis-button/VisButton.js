import React from 'react'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Button from '@material-ui/core/Button'
import styles from './VisButton.module.css'

const VisButton = ({ spacing, kontrolrapportId }) => {
  const destination = `/vis/${kontrolrapportId}`

  return (
    <Button
      id='btnviskontrolrapport'
      component={Link}
      to={destination}
      variant='contained'
      color='primary'
      size='small'
      className={`${spacing} ${styles.button}`}
      startIcon={<VisibilityIcon />}>
      Vis
    </Button>
  )
}

export default VisButton
