import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import opdagendeAktoerApi from '../../../services/opdagendeAktoerApi'
import styles from '../Superbruger.module.css'

const OpdagendeAktoer = () => {
  const [aktoer, setAktoer] = React.useState({})
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState()
  const history = useHistory()
  let { aktoerId } = useParams()

  useEffect(() => {
    async function fetchAktoer() {
      setLoading(true)

      opdagendeAktoerApi
        .fetchById(aktoerId)
        .then((response) => {
          const data = response.data
          setAktoer(data)
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          setError(error)
        })
    }
    fetchAktoer()
  }, [aktoerId])

  const handleChange = (event) => {
    event.preventDefault()

    const target = event.target
    const targetValue = target.value

    setAktoer({
      ...aktoer,
      tekst: targetValue,
    })
  }

  const handleSubmit = () => {
    opdagendeAktoerApi
      .put(aktoerId, aktoer)
      .then(() => alert('Opdagende aktør er nu opdateret'))
      .catch((error) => alert('Noget gik galt. Kunne ikke opdatere opdagende aktør.\nFejlbesked: ' + error.message))
      .finally(function () {
        history.goBack()
      })
  }
  
  if (isLoading) {
    return <h1>Loading...</h1>
  } else if (error) {
    return (
      <h1>
        Kunne ikke hente opdagende aktør med ID: {aktoerId} <br />
        Fejlbesked: {error.message}
      </h1>
    )
  } else {
    return (
      <>
        <Paper className={styles.Paper}>
        <h1>Opdater værdien for opdagende aktør</h1>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id={aktoer.id}
                label={'ID: ' + aktoer.id}
                fullWidth
                margin='normal'
                size='medium'
                value={aktoer.tekst}
                title={aktoer.tekst}
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
export default OpdagendeAktoer
