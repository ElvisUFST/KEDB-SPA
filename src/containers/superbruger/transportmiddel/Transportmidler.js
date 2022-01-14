import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core'
import React from 'react'
import styles from '../Superbruger.module.css'
import transportmiddelApi from '../../../services/transportmiddelApi'
import Superbruger from '../Superbruger'
import { useHistory } from 'react-router-dom'
import withDialog from '../../../hocs/WithDialog'

const headers = [
  {
    id: 'tekst',
    label: 'Tekst',
  },
]

const TilfoejTransportmiddel = ({ open, handleSkemaClose }) => {
  const [transportmiddel, setTransportmiddel] = React.useState({})
  const history = useHistory()

  const handleAddChanges = (event) => {
    event.preventDefault()

    const target = event.target
    const targetValue = target.value

    setTransportmiddel({
      tekst: targetValue,
    })
  }

  const handleSubmitAdd = () => {
    transportmiddelApi
      .post(transportmiddel)
      .then(() => alert('Transportmidlet er nu tilføjet!\n'))
      .catch((error) => alert('Noget gik galt. Kunne ikke oprette transportmidler.\nFejlbesked: ' + error.message))
      .finally(function () {
        history.go(0)
      })
  }

  return (
    <Dialog maxWidth='lg' open={open}>
      <DialogTitle className={styles.root}>Tilføj transportmiddel</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin='normal'
              size='medium'
              variant='outlined'
              onChange={(event) => handleAddChanges(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ backgroundColor: '#ffbb16', position: 'absolute' }}
              onClick={handleSubmitAdd}>
              Gem
            </Button>
          </Grid>
        </Grid>
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

const Transportmidler = ({ handleSkemaClose, handleSkemaOpen, open }) => {
  return (
    <Superbruger
      api={transportmiddelApi}
      title='Transportmidler'
      tilfoejButtonTitle='transportmiddel'
      headers={headers}
      destination='/toldrapportTransportmiddel/'
      handleSkemaOpen={handleSkemaOpen}
      editable
      addable>
      <TilfoejTransportmiddel
        open={open}
        handleSkemaClose={handleSkemaClose}
      />
    </Superbruger>
  )
}

export default withDialog(Transportmidler)
