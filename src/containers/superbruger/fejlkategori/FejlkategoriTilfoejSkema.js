import { Button, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from '../Superbruger.module.css'
import fejlkategoriApi from '../../../services/fejlkategoriApi'

const FejlkategoriTilfoejSkema = () => {
  const [fejlkategori, setFejlkategori] = React.useState({})
  const history = useHistory()

  const handleAddChanges = (event) => {
    event.preventDefault()

    const target = event.target
    const targetValue = target.value

    setFejlkategori({
      tekst: targetValue,
    })
  }

  const handleSubmitAdd = () => {
    fejlkategoriApi
      .post(fejlkategori)
      .then(() => alert('fejlkategorien er nu tilføjet!\n'))
      .catch((error) =>
        alert(
          'Noget gik galt. Kunne ikke oprette fejlkategorien.\nFejlbesked: ' +
            error.message
        )
      )
      .finally(function () {
        history.go(0)
      })
  }

  return (
      <Grid container spacing={2}>
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

export default FejlkategoriTilfoejSkema
