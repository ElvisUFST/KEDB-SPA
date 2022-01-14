import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  Paper,
  TextField,
} from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getTargetIdentifier, getTargetValue } from '../../../utils/eventUtils'
import styles from '../Superbruger.module.css'
import profilApi from '../../../services/profilApi'
import useFetching from '../../../hooks/useFetching'
import Loading from '../../../components/progress/Loading'
import Error from '../../../components/progress/Error'

const Profil = () => {
  let { profilId } = useParams()
  const history = useHistory()

  const [profil, setProfil] = React.useState({})

  const action = useCallback(async () => await profilApi.fetchById(profilId), [profilId])
  const { data, loading, error } = useFetching(action)

  useEffect(() => {
    setProfil(data)
  }, [data])

  const handleChange = (event) => {
    const target = event.target
    const targetIdentifier = getTargetIdentifier(target)
    const targetValue = getTargetValue(target)

    setProfil({
      ...profil,
      [targetIdentifier]: targetValue,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    profilApi
      .put(profilId, profil)
      .then(() => alert('Profilen er nu opdateret'))
      .catch((error) => alert('Noget gik galt. Kunne ikke opdatere profilen.\nFejlbesked: ' + error.message))
      .finally(() => history.goBack())
  }

  if (loading) return <Loading message='Henter profil..' />
  if (error) return <Error message={`Kunne ikke hente profilen med ID: ${profilId}. Fejlbesked: ${error.message}`} />
  
  return (
    <>
      <Paper className={styles.Paper}>
        <h1>Opdater værdierne for profilen</h1>
        <form onSubmit={handleSubmit}>
          {profil && (
            <>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    id='profilNummer'
                    type='number'
                    label={'Profilnummer i RIS'}
                    fullWidth
                    margin='normal'
                    size='medium'
                    value={profil.profilNummer || ''}
                    onChange={(event) => handleChange(event)}
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id='beskrivelse'
                    label={'Beskrivelse'}
                    fullWidth
                    margin='normal'
                    size='medium'
                    value={profil.beskrivelse || ''}
                    onChange={(event) => handleChange(event)}
                    variant='outlined'
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <InputLabel>Aktiv?</InputLabel>
                <Checkbox
                  id='aktiv'
                  color='primary'
                  checked={profil.aktiv || false}
                  onChange={(event) => handleChange(event)}
                />
              </Grid>
            </>
          )}

          <Button className={styles.buttonYellow} type='submit'>
            Gem
          </Button>
        </form>
      </Paper>
    </>
  )
}
export default Profil
