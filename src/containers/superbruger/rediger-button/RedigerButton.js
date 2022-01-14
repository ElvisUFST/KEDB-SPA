import React from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button'
import styles from './RedigerButton.module.css'

const RedigerButton = ({destination}) => {

  return (
    <Button
      id='btnLink'
      component={Link}
      to={destination}
      variant='contained'
      size='small'
      className={styles.button}
      startIcon={<EditIcon />}>
      Rediger
    </Button>
  )
}

export default RedigerButton
