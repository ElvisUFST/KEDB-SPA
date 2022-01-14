import { Button, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { fetchKontrolrapporterByFilter } from '../../../reducers/kontrolrapport/KontrolrapportAllReducer'
import kontrolrapportApi from '../../../services/kontrolrapportApi'
import AntagetFraDato from './input-components/AK-soeg-antagetFraDato'
import AntagetTilDato from './input-components/AK-soeg-antagetTilDato'
import Profilnummer from './input-components/AK-soeg-profilnummer'
import Referencenummer from './input-components/AK-soeg-referencenummer'
import Repraesentat from './input-components/AK-soeg-repraesentat'
import Toldsted from './input-components/AK-soeg-toldsted'
import VaremodtagerCVR from './input-components/AK-soeg-varemodtagerCVR'

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

const identifiers = {
  referencenummer: {
    id: 'referencenummer',
    label: 'Referencenummer',
  },

  varemodtagercvr: {
    id: 'varemodtagercvr',
    label: 'Varemodtagers CVR',
  },

  klarerercvr: {
    id: 'klarerercvr',
    label: 'Klareren/repræsentant',
  },

  toldsted: {
    id: 'toldsted',
    label: 'Toldsted',
  },

  antagetfradato: {
    id: 'antagetfradato',
    label: 'Antaget fra dato',
  },
  antagettildato: {
    id: 'antagettildato',
    label: 'Antaget til dato',
  },

  profilnummer: {
    id: 'profilnummer',
    label: 'Profil',
  },
}

const initialState = {
  referencenummer: '',
  varemodtagercvr: '',
  klarerercvr: '',
  toldsted: '',
  antagetfradato: '',
  antagettildato: '',
  profilnummer: '',
}

const Soeg = () => {
  const classes = useStyles()
  const [values, setValues] = React.useState(initialState)
  const [toldsteder, setToldsteder] = React.useState()

  const dispatch = useDispatch()

  const addQuery = (key, value) => {
    searchParams.set(key, value)
  }

  let history = useHistory()
  let location = useLocation()
  let searchParams = new URLSearchParams(location.search)

  useEffect(() => {
    async function fetchToldsteder() {
      await kontrolrapportApi
        .fetchToldsteder()
        .then((res) => setToldsteder(res.data))
        .catch((error) => {
          const errorMessage = error.message

          console.error(errorMessage)
        })
    }

    fetchToldsteder()
  }, [])

  /**
   * Synchronizing URL search query with input fields
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
      pathname: "/aktuelkoe",
      search: searchParams.toString(),
    })

    dispatch(fetchKontrolrapporterByFilter(history.location.search))
  }

  const {
    referencenummer,
    varemodtagercvr,
    klarerercvr,
    toldsted,
    profilnummer,
  } = values

  return (
      <div className={classes.root}>
      <Paper variant='outlined' square>
        <Grid item container spacing={3} justify='flex-start'>
          <Grid item xs={4}>
            <Referencenummer
              identifier={identifiers.referencenummer}
              value={referencenummer}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>

          <Grid item xs={4}>
            <VaremodtagerCVR
              identifier={identifiers.varemodtagercvr}
              value={varemodtagercvr}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>

          <Grid item xs={4}>
            <Repraesentat
              identifier={identifiers.klarerercvr}
              value={klarerercvr}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel>{identifiers.toldsted.label}</InputLabel>
              <Toldsted
                identifier={identifiers.toldsted.id}
                options={toldsteder}
                value={toldsted}
                handleChange={handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <AntagetFraDato
              identifier={identifiers.antagetfradato}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>

          <Grid item xs={4}>
            <AntagetTilDato
              identifier={identifiers.antagettildato}
              handleChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <Profilnummer
              identifier={identifiers.profilnummer}
              value={profilnummer}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
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
