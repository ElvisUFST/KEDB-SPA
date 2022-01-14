import { Button, Grid, Paper } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AfrapporteretFraDato from './input-components/STU-soeg-afrapporteretFraDato'
import AfrapporteretTilDato from './input-components/STU-soeg-afrapporteretTilDato'
import AntagetFraDato from './input-components/STU-soeg-antagetFraDato'
import AntagetTilDato from './input-components/STU-soeg-antagetTilDato'
import Journalnummer from './input-components/STU-soeg-journalnummer'
import Oprindelsesland from './input-components/STU-soeg-oprindelsesland'
import Procedurekode from './input-components/STU-soeg-procedurekode'
import Referencenummer from './input-components/STU-soeg-referencenummer'
import Profilnummer from './input-components/STU-soeg-profilnummer'
import Sagsbehandler from './input-components/STU-soeg-sagsbehandler'
import VaremodtagerCVR from './input-components/STU-soeg-varemodtagerCVR'
import { fetchAfrapporteredeKontrolrapporterByFilter } from '../../../reducers/kontrolrapport/KontrolrapportAfrapporteretAllReducer'
import profilApi from '../../../services/profilApi'
import sagsbehandlerApi from '../../../services/sagsbehandlerApi'

const useStyles = makeStyles((theme) => ({
    root: {
    "& > *": {
      padding: theme.spacing(3),
    }
  },
  button: {
    float: 'left',
    width: '15%',
    margin: theme.spacing(0),
  },
}))

const initialState = {
  referencenummer: '',
  workzoneJournalnummer: '',
  varemodtagercvr: '',
  oprindelsesland: '',
  afrapporteretFraDato: '',
  afrapporteretTilDato: '',
  antagetfradato: '',
  antagettildato: '',
  procedurekode: '',
  sagsbehandler: '',
  profilnummer: '',
}

const Soeg = () => {
  const classes = useStyles()
  const [values, setValues] = React.useState(initialState)

  const [profilnumre, setProfilnumre] = React.useState([])
  const [sagsbehandlere, setSagsbehandlere] = React.useState([])
  const [isLoadingProfilnumre, setLoadingProfilnumre] = React.useState(false)
  const [isLoadingSagsbehandlere, setLoadingSagsbehandlere] = React.useState(false)
  const [errorSagsbehandlere, setErrorSagsbehandlere] = React.useState(null)
  const [errorProfilnumre, setErrorProfilnumre] = React.useState(null)

  const dispatch = useDispatch()

  let history = useHistory()
  let location = useLocation()

  let searchParams = new URLSearchParams(location.search)

  const addQuery = (key, value) => {
    searchParams.set(key, value)
  }

  useEffect(() => {
    async function fetchProfilnumre() {
      setLoadingProfilnumre(true)

      await profilApi
        .fetchAll()
        .then((res) => {
          setProfilnumre(res.data)
          setLoadingProfilnumre(false)
        })
        .catch((error) => {
          setLoadingProfilnumre(false)
          setErrorProfilnumre(error.message)
        })
    }

    async function fetchSagsbehandlere() {
      setLoadingSagsbehandlere(true)

      await sagsbehandlerApi
        .fetchAll()
        .then((res) => {
          setSagsbehandlere(res.data)
          setLoadingSagsbehandlere(false)
        })
        .catch((error) => {
          setLoadingSagsbehandlere(false)
          setErrorSagsbehandlere(error.message)
        })
    }

    fetchProfilnumre()
    fetchSagsbehandlere()
  }, [])

  /**
   * Synchronizing URL search query with the input fields
   * - runs everytime the search query is changed
   * @callback useEffect
   */
  useEffect(() => {
    if (location.search !== '') {
      searchParams.forEach((value, key) =>
        setValues((state) => ({
          ...state,
          [key]: value,
        }))
      )
    } else {
      setValues(initialState)
    }
  }, [location.search])

  const handleChange = (event) => {
    event.preventDefault()

    let eventIdentifier = event.target.id ? event.target.id : event.target.name

    setValues({
      ...values,
      [eventIdentifier]: event.target.value,
    })
  }

  const handleSubmit = () => {
    for (const property in values) {
      const fieldValue = values[property]

      addQuery(property, fieldValue)
    }

    history.push({
      pathname: "/soegitidligeresager",
      search: searchParams.toString(),
    })

    dispatch(fetchAfrapporteredeKontrolrapporterByFilter(history.location.search))
  }

  const {
    referencenummer,
    workzoneJournalnummer,
    varemodtagercvr,
    oprindelsesland,
    procedurekode,
    sagsbehandler,
  } = values

  return (
    <div className={classes.root}>
      <Paper variant='outlined' square>
        <Grid item container spacing={3} justify='flex-start'>
          <Grid item xs={4}>
            <Referencenummer
              value={referencenummer}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>

          <Grid item xs={4}>
            <Journalnummer
              value={workzoneJournalnummer}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>

          <Grid item xs={4}>
            <VaremodtagerCVR
              value={varemodtagercvr}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>

          <Grid item xs={4}>
            <Oprindelsesland
              value={oprindelsesland}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>

          <Grid item xs={4}>
            <AfrapporteretFraDato handleChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <AfrapporteretTilDato handleChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <AntagetFraDato handleChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <AntagetTilDato handleChange={handleChange} />
          </Grid>

          <Grid item xs={4}>
            <Procedurekode
              value={procedurekode}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>

          <Grid item xs={4}>
            <Sagsbehandler
              disabled={errorSagsbehandlere || isLoadingSagsbehandlere}
              value={sagsbehandler}
              options={sagsbehandlere}
              handleChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <Profilnummer
              disabled={errorProfilnumre || isLoadingProfilnumre}
              value={values.profilnummer}
              options={profilnumre}
              handleChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              id='btnSoeg'
              className={classes.button}
              variant='contained'
              size='medium'
              color='secondary'
              onClick={handleSubmit}>
              Søg
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Soeg
