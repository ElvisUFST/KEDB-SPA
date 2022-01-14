import { Button, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import kommunikationApi from '../../../services/kommunikationApi'
import styles from '../Superbruger.module.css'

const KommunikationsformTilfoejSkema = () => {
  const [kommunikationsform, setKommunikationsform] = React.useState({})
  const history = useHistory()

  const handleAddChanges = (event) => {
    event.preventDefault()

    const target = event.target
    const targetValue = target.value

    setKommunikationsform({
      tekst: targetValue,
    })
  }

  const handleSubmitAdd = () => {
    kommunikationApi
      .post(kommunikationsform)
      .then(() => alert('Kommunikationsformen er nu tilføjet!\n'))
      .catch((error) => alert('Noget gik galt. Kunne ikke oprette kommunikationsformen.\nFejlbesked: ' + error.message))
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

export default KommunikationsformTilfoejSkema
