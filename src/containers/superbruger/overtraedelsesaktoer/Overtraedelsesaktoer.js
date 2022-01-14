import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Error from '../../../components/progress/Error'
import Loading from '../../../components/progress/Loading'
import useFetching from '../../../hooks/useFetching'
import overtraedelsesaktoerApi from '../../../services/overtraedelsesAktoerApi'
import styles from '../Superbruger.module.css'

const Overtraedelsesaktoer = () => {
  let { aktoerId } = useParams()
  const history = useHistory()

  const [aktoer, setAktoer] = React.useState({})

  const action = useCallback(async () => await overtraedelsesaktoerApi.fetchById(aktoerId), [aktoerId])
  const { data, loading, error } = useFetching(action)

  useEffect(() => {
    setAktoer(data)
  }, [data])

  const handleChange = (event) => {
    event.preventDefault()

    const target = event.target
    const targetValue = target.value

    setAktoer({
      ...aktoer,
      tekst: targetValue,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    overtraedelsesaktoerApi
      .put(aktoerId, aktoer)
      .then(() => alert('Overtrædelsesaktøren er nu opdateret'))
      .catch((error) => alert('Noget gik galt. Kunne ikke opdatere overtrædelsesaktøren.\nFejlbesked: ' + error.message))
      .finally(() => history.goBack())
  }

  if (loading) return <Loading message='Henter aktør..' />
  if (error) return <Error message={`Kunne ikke hente overtrædelsesaktøren med ID: ${aktoerId}. Fejlbesked: ${error.message}`} />

  return (
    <>
      <Paper className={styles.Paper}>
        <h1>Opdater værdien for overtrædelsesaktøren</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id={aktoerId}
                label={'ID: ' + aktoerId}
                fullWidth
                margin='normal'
                size='medium'
                value={aktoer ? aktoer.tekst : ''}
                onChange={(event) => handleChange(event)}
                variant='outlined'
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button className={styles.buttonYellow} type='submit'>
                Gem
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  )
}
export default Overtraedelsesaktoer
