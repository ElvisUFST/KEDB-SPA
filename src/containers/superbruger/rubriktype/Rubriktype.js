import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Error from '../../../components/progress/Error'
import Loading from '../../../components/progress/Loading'
import useFetching from '../../../hooks/useFetching'
import rubriktypeApi from '../../../services/rubriktypeApi'
import { getTargetIdentifier, getTargetValue } from '../../../utils/eventUtils'
import styles from '../Superbruger.module.css'

const Rubriktype = () => {
  let { rubriktypeId } = useParams()
  const history = useHistory()

  const [rubriktype, setRubriktype] = React.useState({})

  const action = useCallback(async () => await rubriktypeApi.fetchById(rubriktypeId), [rubriktypeId])
  const { data, loading, error } = useFetching(action)

  useEffect(() => {
    setRubriktype(data)
  }, [data])

  const handleChange = (event) => {
    event.preventDefault()

    const target = event.target
    const targetIdentifier = getTargetIdentifier(target)
    const targetValue = getTargetValue(target)

    setRubriktype({
      ...rubriktype,
      [targetIdentifier]: targetValue,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    rubriktypeApi
      .put(rubriktypeId, rubriktype)
      .then(() => alert('Rubriktypen er nu opdateret'))
      .catch((error) =>
        alert(
          'Noget gik galt. Kunne ikke opdatere rubriktypen.\nFejlbesked: ' +
            error.message
        )
      )
      .finally(() => history.goBack())
  }

  if (loading) return <Loading message='Henter rubriktypen..' />
  if (error) return <Error message={`Kunne ikke hente rubriktypen med ID: ${rubriktypeId}. Fejlbesked: ${error.message}`} />

  return (
    <>
      <Paper className={styles.Paper}>
        <h1>Opdater værdien for rubriktypen</h1>
        <form onSubmit={handleSubmit}>
          {rubriktype && (<Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id='navn'
                label='Navn'
                fullWidth
                margin='normal'
                size='medium'
                value={rubriktype.navn || ''}
                onChange={(event) => handleChange(event)}
                variant='outlined'
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id='nummer'
                type='number'
                label='Nummer'
                fullWidth
                margin='normal'
                size='medium'
                value={rubriktype.nummer || ''}
                onChange={(event) => handleChange(event)}
                variant='outlined'
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id='xmlTag'
                label='xmlTag'
                fullWidth
                margin='normal'
                size='medium'
                value={rubriktype.xmlTag || ''}
                onChange={(event) => handleChange(event)}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <Button className={styles.buttonYellow} type='submit'>
                Gem
              </Button>
            </Grid>
          </Grid>)}

        </form>
      </Paper>
    </>
  )
}
export default Rubriktype
