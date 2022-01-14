import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import withDialog from '../../../hocs/WithDialog'
import fejltekstApi from '../../../services/fejltekstApi'
import Superbruger from '../Superbruger'
import styles from '../Superbruger.module.css'
import FejltekstTilfoejSkema from './FejltekstTilfoejSkema'

const headers = [
  {
    id: 'tekst',
    label: 'Tekst',
  },
  {
    id: 'aktiv',
    label: 'Aktiv',
  },
]

const TilfoejFejltekst = ({ open, handleSkemaClose }) => {
  return (
    <Dialog maxWidth='lg' open={open}>
      <DialogTitle className={styles.root}>Tilføj fejltekst</DialogTitle>
      <DialogContent>
        <FejltekstTilfoejSkema />
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

const Fejltekster = ({ handleSkemaClose, handleSkemaOpen, open }) => {
  return (
    <Superbruger
      api={fejltekstApi}
      title='Fejltekster'
      tilfoejButtonTitle='fejltekst'
      headers={headers}
      destination='/fejltekst/'
      handleSkemaOpen={handleSkemaOpen}
      editable
      addable>
      <TilfoejFejltekst
        open={open}
        handleSkemaClose={handleSkemaClose}
      />
    </Superbruger>
  )
}

export default withDialog(Fejltekster)
