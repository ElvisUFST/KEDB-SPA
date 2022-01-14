import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Error from '../../../components/progress/Error'
import Loading from '../../../components/progress/Loading'
import useFetching from '../../../hooks/useFetching'
import transportmiddelApi from '../../../services/transportmiddelApi'
import styles from '../Superbruger.module.css'

const Transportmiddel = () => {
  let { transportId } = useParams()
  const history = useHistory()

  const [transportmiddel, setTransportmiddel] = React.useState({})

  const action = useCallback(async () => await transportmiddelApi.fetchById(transportId), [transportId])
  const { data, loading, error } = useFetching(action)

  useEffect(() => {
    setTransportmiddel(data)
  }, [data])

  const handleChange = (event) => {
    event.preventDefault()

    const target = event.target
    const targetValue = target.value

    setTransportmiddel({
      ...transportmiddel,
      tekst: targetValue,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    transportmiddelApi
      .put(transportId, transportmiddel)
      .then(() => alert('Transportmidlet er nu opdateret'))
      .catch((error) => alert('Noget gik galt. Kunne ikke opdatere transportmidlet.\nFejlbesked: ' + error.message))
      .finally(() => history.goBack())
  }

  if (loading) return <Loading message='Henter transportmiddel..' />
  if (error) return <Error message={`Kunne ikke hente transportmidlet med ID: ${transportId}. Fejlbesked: ${error.message}`} />

  return (
    <>
      <Paper className={styles.Paper}>
        <h1>Opdater værdien for transportmidlet</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id={transportId}
                label={'ID: ' + transportId}
                margin='normal'
                size='medium'
                fullWidth
                value={transportmiddel.tekst || ''}
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
export default Transportmiddel
