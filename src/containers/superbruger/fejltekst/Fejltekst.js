import {
  Button,
  Checkbox,
  Grid,
  Paper,
  TextField,
  InputLabel,
} from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getTargetValue } from '../../../utils/eventUtils'
import styles from '../Superbruger.module.css'
import fejltekstApi from '../../../services/fejltekstApi'
import useFetching from '../../../hooks/useFetching'
import Loading from '../../../components/progress/Loading'
import Error from '../../../components/progress/Error'

const Fejltekst = () => {
  let { fejltekstId } = useParams()
  const history = useHistory()

  const action = useCallback(async () => await fejltekstApi.fetchById(fejltekstId), [fejltekstId])
  const { data, loading, error } = useFetching(action)

  const [fejltekst, setFejltekst] = useState()

  useEffect(() => {
    setFejltekst(data)
  }, [data])

  const handleChange = (event) => {
    const target = event.target
    const targetValue = getTargetValue(target)

    setFejltekst({
      ...fejltekst,
      [target.id]: targetValue,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    fejltekstApi
      .put(fejltekstId, fejltekst)
      .then(() => alert('Fejlteksten er nu opdateret'))
      .catch((error) => alert('Noget gik galt. Kunne ikke opdatere fejlteksten.\nFejlbesked: ' + error.message))
      .finally(() => history.goBack())
  }

  if (loading) return <Loading message='Henter fejltekst..' />
  if (error) return <Error message='Kunne ikke hente fejlteksten. Prøv igen..' />

  return (
    <>
      <Paper className={styles.Paper}>
        <h1>Opdater værdierne for fejlteksten</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id='tekst'
                label={'ID: ' + fejltekstId}
                fullWidth
                margin='normal'
                size='medium'
                value={fejltekst ? fejltekst.tekst : ''}
                onChange={(event) => handleChange(event)}
                variant='outlined'
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Aktiv?</InputLabel>
              <Checkbox
                id='aktiv'
                color='primary'
                checked={fejltekst ? fejltekst.aktiv : false}
                onChange={(event) => handleChange(event)}
              />
            </Grid>
          </Grid>

          <Button type='submit' className={styles.buttonYellow}>
            Gem
          </Button>
        </form>
      </Paper>
    </>
  )
}
export default Fejltekst
