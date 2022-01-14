import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import withDialog from '../../../hocs/WithDialog'
import overtraedelsesaktoerApi from '../../../services/overtraedelsesAktoerApi'
import Superbruger from '../Superbruger'
import styles from '../Superbruger.module.css'
import OvertraedelsesaktoerTilfoejSkema from './OvertraedelsesaktoerTilfoejSkema'

const headers = [
  {
    id: 'tekst',
    label: 'Tekst',
  },
]

const TilfoejOvertraedelsesaktoer = ({ open, handleSkemaClose }) => {
  return (
    <Dialog maxWidth='lg' open={open}>
      <DialogTitle className={styles.root}>
        Tilføj overtrædelsesaktør
      </DialogTitle>
      <DialogContent>
        <OvertraedelsesaktoerTilfoejSkema />
      </DialogContent>
      <DialogActions>
        <Button
          className={styles.btnDialogLuk}
          onClick={handleSkemaClose}>
          Luk
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const OvertraedelsesAktoer = ({ handleSkemaClose, handleSkemaOpen, open }) => {
  return (
    <Superbruger
      api={overtraedelsesaktoerApi}
      title='Overtrædelsesaktører'
      tilfoejButtonTitle='overtrædelsesaktør'
      headers={headers}
      destination='/toldrapportOvertraedelsesAktoer/'
      handleSkemaOpen={handleSkemaOpen}
      editable
      addable>
      <TilfoejOvertraedelsesaktoer
        open={open}
        handleSkemaClose={handleSkemaClose}
      />
    </Superbruger>
  )
}

export default withDialog(OvertraedelsesAktoer)
