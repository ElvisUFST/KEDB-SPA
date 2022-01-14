import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import fejlkategoriApi from '../../../services/fejlkategoriApi'
import styles from '../Superbruger.module.css'

const Fejlkategori = () => {
  const [fejlkategori, setFejlkategori] = React.useState({})
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState()
  const history = useHistory()
  let { fejlkategoriId } = useParams()

  useEffect(() => {
    async function fetchFejlkategori() {
      setLoading(true)

      fejlkategoriApi
        .fetchById(fejlkategoriId)
        .then((response) => {
          const data = response.data
          setFejlkategori(data)
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          setError(error)
        })
    }
    fetchFejlkategori()
  }, [fejlkategoriId])

  const handleChange = (event) => {
    event.preventDefault()

    const target = event.target
    const targetValue = target.value

    setFejlkategori({
      ...fejlkategori,
      tekst: targetValue,
    })
  }

  const handleSubmit = () => {
    fejlkategoriApi
      .put(fejlkategoriId, fejlkategori)
      .then(() => alert('Fejlkategorien er nu opdateret'))
      .catch((error) =>
        alert(
          'Noget gik galt. Kunne ikke opdatere fejlkategorien.\nFejlbesked: ' +
            error.message
        )
      )
      .finally(function () {
        history.goBack()
      })
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  } else if (error) {
    return (
      <h1>
        Kunne ikke hente fejlkategorien med ID: {fejlkategoriId} <br />
        Fejlbesked: {error.message}
      </h1>
    )
  } else {
    return (
      <>
        <Paper className={styles.Paper}>
        <h1>Opdater værdien for fejlkategorien</h1>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id={fejlkategori.id}
                label={'ID: ' + fejlkategori.id}
                margin='normal'
                size='medium'
                fullWidth
                value={fejlkategori.tekst}
                title={fejlkategori.tekst}
                onChange={(event) => handleChange(event)}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={styles.buttonYellow}
                onClick={handleSubmit}
              >
                Gem
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </>
    )
  } 
}
export default Fejlkategori
