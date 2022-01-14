import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React, { useEffect, useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Error from '../../../components/progress/Error'
import Loading from '../../../components/progress/Loading'
import useFetching from '../../../hooks/useFetching'
import kommunikationApi from '../../../services/kommunikationApi'
import styles from '../Superbruger.module.css'

const Kommunikationsform = () => {
  let { kommunikationsformId } = useParams()
  const history = useHistory()

  const [kommunikationsform, setKommunikationsform] = useState({})

  const action = useCallback(async () => await kommunikationApi.fetchById(kommunikationsformId), [kommunikationsformId])
  const { data, loading, error } = useFetching(action)

  useEffect(() => {
    setKommunikationsform(data)
  }, [data])

  const handleChange = (event) => {
    event.preventDefault()

    const target = event.target
    const targetValue = target.value

    setKommunikationsform({
      ...kommunikationsform,
      tekst: targetValue,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    kommunikationApi
      .put(kommunikationsformId, kommunikationsform)
      .then(() => alert('Kommunikationsformen er nu opdateret'))
      .catch((error) => alert('Noget gik galt. Kunne ikke opdatere kommunikationsformen.\nFejlbesked: ' + error.message))
      .finally(() => history.goBack())
  }

  if (loading) return <Loading message='Henter fejltekst..' />
  if (error) return <Error message={`Kunne ikke hente kommunikationsformen med ID: ${kommunikationsformId}. Fejlbesked: ${error.message}`}/>
  
  return (
    <>
      <Paper className={styles.Paper}>
        <h1>Opdater værdien for kommunikationsformen</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id={kommunikationsformId}
                label={'ID: ' + kommunikationsformId}
                margin='normal'
                size='medium'
                fullWidth
                value={kommunikationsform ? kommunikationsform.tekst : ''}
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
export default Kommunikationsform
