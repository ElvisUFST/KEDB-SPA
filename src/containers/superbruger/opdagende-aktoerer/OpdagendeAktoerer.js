import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import withDialog from '../../../hocs/WithDialog'
import opdagendeAktoerApi from '../../../services/opdagendeAktoerApi'
import Superbruger from '../Superbruger'
import styles from '../Superbruger.module.css'
import OpdagendeAktoerTilfoejSkema from './OpdagendeAktoerTilfoejSkema'

const headers = [
  {
    id: 'tekst',
    label: 'Tekst',
  },
]

const TilfoejOpdagendeAktoer= ({ open, handleSkemaClose }) => {
  return (
      <Dialog maxWidth='lg' open={open}>
        <DialogTitle className={styles.root}>
          Tilføj Opdagende Aktoer
        </DialogTitle>
        <DialogContent>
          <OpdagendeAktoerTilfoejSkema />
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

const OpdagendeAktoerer = ({ handleSkemaClose, handleSkemaOpen, open }) => {
  return (
      <Superbruger
          api={opdagendeAktoerApi}
          title='Opdagende Aktøer'
          tilfoejButtonTitle='opdagende aktør'
          headers={headers}
          destination='/toldrapportOpdagendeAktoer/'
          handleSkemaOpen={handleSkemaOpen}
          editable
          addable>
        <TilfoejOpdagendeAktoer
            open={open}
            handleSkemaClose={handleSkemaClose}
        />
      </Superbruger>
  )
}

export default withDialog(OpdagendeAktoerer)
