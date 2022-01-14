import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import React from 'react'
import withDialog from '../../../hocs/WithDialog'
import rubriktypeApi from '../../../services/rubriktypeApi'
import Superbruger from '../Superbruger'
import styles from '../Superbruger.module.css'
import RubriktypeTilfoejSkema from './RubriktypeTilfoejSkema'

const headers = [
  {
    id: 'navn',
    label: 'Navn',
  },
  {
    id: 'nummer',
    label: 'Nummer',
  },
  {
    id: 'xmlTag',
    label: 'XML Tag',
  },
]

const TilfoejRubriktype = ({ open, handleSkemaClose }) => {
  return (
    <Dialog maxWidth='lg' open={open}>
      <DialogTitle className={styles.root}>Tilføj rubriktype</DialogTitle>
      <DialogContent>
        <RubriktypeTilfoejSkema />
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

const Rubriktyper = ({ handleSkemaClose, handleSkemaOpen, open }) => {
  return (
    <Superbruger
      api={rubriktypeApi}
      title='Rubriktyper'
      tilfoejButtonTitle='rubriktype'
      headers={headers}
      destination='/rubriktype/'
      handleSkemaOpen={handleSkemaOpen}
      editable
      addable>
      <TilfoejRubriktype
        open={open}
        handleSkemaClose={handleSkemaClose}
      />
    </Superbruger>
  )
}

export default withDialog(Rubriktyper)
