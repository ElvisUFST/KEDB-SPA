import { Button, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import overtraedelsesaktoerApi from '../../../services/overtraedelsesAktoerApi'
import styles from '../Superbruger.module.css'

const OvertraedelsesaktoerTilfoejSkema = () => {
  const [aktoer, setAktoer] = React.useState({})
  const history = useHistory()

  const handleAddChanges = (event) => {
    event.preventDefault()

    const target = event.target
    const targetValue = target.value

    setAktoer({
      tekst: targetValue,
    })
  }

  const handleSubmitAdd = () => {
    overtraedelsesaktoerApi
      .post(aktoer)
      .then(() => alert('Aktøren er nu tilføjet!\n'))
      .catch((error) => alert('Noget gik galt. Kunne ikke oprette aktøren.\nFejlbesked: ' + error.message))
      .finally(function () {
        history.go(0)
      })
  }

  return (
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
          className={styles.buttonYellowAbsolute}
          onClick={handleSubmitAdd}
        >
          Gem
        </Button>
      </Grid>
    </Grid>
  )
}

export default OvertraedelsesaktoerTilfoejSkema
