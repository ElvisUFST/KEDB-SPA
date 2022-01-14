import {
  Button,
  Checkbox,
  Grid,
  InputLabel,
  TextField,
} from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { getTargetIdentifier, getTargetValue } from '../../../utils/eventUtils'
import styles from '../Superbruger.module.css'
import fejltekstApi from '../../../services/fejltekstApi'

const FejltekstTilfoejSkema = () => {
  const [fejltekst, setFejltekst] = React.useState({})
  const history = useHistory()

  const handleAddChanges = (event) => {
    event.preventDefault()

    const target = event.target
    const targetIdentifier = getTargetIdentifier(target)
    const targetValue = getTargetValue(target)

    setFejltekst({
      ...fejltekst,
      [targetIdentifier]: targetValue,
    })
  }

  const handleSubmitAdd = () => {
    fejltekstApi
      .post(fejltekst)
      .then(() => alert('Fejlteksten er nu tilføjet!\n'))
      .catch((error) => alert('Noget gik galt. Kunne ikke oprette fejlteksten.\nFejlbesked: ' + error.message))
      .finally(function () {
        history.go(0)
      })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          id='tekst'
          fullWidth
          margin='normal'
          variant='outlined'
          onChange={(event) => handleAddChanges(event)}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Aktiv?</InputLabel>
        <Checkbox
          id='aktiv'
          color='primary'
          checked={null}
          onChange={(event) => handleAddChanges(event)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          className={styles.buttonYellowAbsolute}
          onClick={handleSubmitAdd}
        >
          Gem
        </Button>
      </Grid>
    </Grid>
  )
}

export default FejltekstTilfoejSkema
