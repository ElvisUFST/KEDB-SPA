import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import withDialog from '../../../hocs/WithDialog'
import kommunikationApi from '../../../services/kommunikationApi'
import Superbruger from '../Superbruger'
import styles from '../Superbruger.module.css'
import KommunikationsformTilfoejSkema from './KommunikationsformTilfoejSkema'

const headers = [
  {
    id: 'tekst',
    label: 'Tekst',
  },
]

const TilfoejKommunikationsform = ({ open, handleSkemaClose }) => {
  return (
    <Dialog maxWidth='lg' open={open}>
      <DialogTitle className={styles.root}>
        Tilføj kommunikationsform
      </DialogTitle>
      <DialogContent>
        <KommunikationsformTilfoejSkema />
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

const Kommunikationsformer = ({ handleSkemaClose, handleSkemaOpen, open }) => {
  return (
    <Superbruger
      api={kommunikationApi}
      title='Kommunikationsformer'
      tilfoejButtonTitle='kommunikationsform'
      headers={headers}
      destination='/toldrapportKommunikationsform/'
      handleSkemaOpen={handleSkemaOpen}
      editable
      addable>
      <TilfoejKommunikationsform
        open={open}
        handleSkemaClose={handleSkemaClose}
      />
    </Superbruger>
  )
}

export default withDialog(Kommunikationsformer)
