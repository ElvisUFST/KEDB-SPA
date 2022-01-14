import { Button, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import rubriktypeApi from '../../../services/rubriktypeApi'
import { getTargetIdentifier, getTargetValue } from '../../../utils/eventUtils'
import styles from '../Superbruger.module.css'

const RubriktypeTilfoejSkema = () => {
  const [rubriktype, setRubriktype] = React.useState({})
  const history = useHistory()

  const handleAddChanges = (event) => {
    event.preventDefault()

    const target = event.target
    const targetIdentifier = getTargetIdentifier(target)
    const targetValue = getTargetValue(target)

    setRubriktype({
      ...rubriktype,
      [targetIdentifier]: targetValue,
    })
  }

  const handleSubmitAdd = () => {
    rubriktypeApi
      .post(rubriktype)
      .then(() => alert('Rubriktypen er nu tilføjet!\n'))
      .catch((error) => alert('Noget gik galt. Kunne ikke oprette rubriktypen.\nFejlbesked: ' + error.message))
      .finally(function () {
        history.go(0)
      })
  }

  return (
    <Grid container>
      <Grid item xs={6}>
        <TextField
          id='navn'
          label='Navn'
          fullWidth
          margin='normal'
          variant='outlined'
          onChange={(event) => handleAddChanges(event)}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          id='nummer'
          label='Nummer'
          type='number'
          fullWidth
          margin='normal'
          variant='outlined'
          onChange={(event) => handleAddChanges(event)}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          id='xmlTag'
          label='XML tag'
          fullWidth
          margin='normal'
          variant='outlined'
          onChange={(event) => handleAddChanges(event)}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          className={styles.buttonYellowAbsolute}
          onClick={handleSubmitAdd}>
          Gem
        </Button>
      </Grid>
    </Grid>
  )
}

export default RubriktypeTilfoejSkema
