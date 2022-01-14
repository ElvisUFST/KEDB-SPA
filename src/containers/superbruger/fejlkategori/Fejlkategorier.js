import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import withDialog from '../../../hocs/WithDialog'
import fejlkategoriApi from '../../../services/fejlkategoriApi'
import Superbruger from '../Superbruger'
import styles from '../Superbruger.module.css'
import FejlkategoriTilfoejSkema from './FejlkategoriTilfoejSkema'

const headers = [
  {
    id: 'tekst',
    label: 'Tekst',
  },
]

const TilfoejFejlkategori = ({ open, handleSkemaClose }) => {
  return (
      <Dialog maxWidth='lg' open={open}>
        <DialogTitle className={styles.root}>
          Tilføj Opdagende Aktoer
        </DialogTitle>
        <DialogContent>
          <FejlkategoriTilfoejSkema />
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

const Fejlkategorier = ({ handleSkemaClose, handleSkemaOpen, open }) => {
  return (
      <Superbruger
          api={fejlkategoriApi}
          title='Fejlkategorier'
          tilfoejButtonTitle='fejlkategori'
          headers={headers}
          destination='/toldrapportFejlkategori/'
          handleSkemaOpen={handleSkemaOpen}
          editable
          addable>
        <TilfoejFejlkategori
            open={open}
            handleSkemaClose={handleSkemaClose}
        />
      </Superbruger>
  )
}

export default withDialog(Fejlkategorier)
