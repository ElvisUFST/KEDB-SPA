import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Error from '../../../components/progress/Error'
import Loading from '../../../components/progress/Loading'
import useFetching from '../../../hooks/useFetching'
import kontrolrapportApi from '../../../services/kontrolrapportApi'
import { getTargetIdentifier, getTargetValue } from '../../../utils/eventUtils'
import AfrapporteringRubrikkerTable from './AfrapporteringRubrikkerTable'
import SkemaTilToldrapport from './skema-til-toldrapport/Skema'
import TopSection from './top-section/TopSection'

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_INITIALSTATE': {
      if (action.payload) {
        let updatedState = action.payload
  
        if (!action.payload.sagsbehandler) {
          updatedState.sagsbehandler = null
        }

        return { ...state, ...updatedState }

      }
      break
    }
    case 'HANDLE_NUMBER': {
      const target = action.payload.target
      const targetIdentifier = target.id
      let targetValue = target.valueAsNumber

      targetValue = isNaN(targetValue) ? 0 : targetValue.toFixed(2)

      return {
        ...state,
        [targetIdentifier]: targetValue,
      }
    }
    case 'HANDLE_CHANGE_TOPSECTION': {
      const target = action.payload.target
      const targetIdentifier = getTargetIdentifier(target)
      let targetValue = getTargetValue(target)

      if (targetIdentifier === 'sagsbehandler') {
        const sagsbehandlerName = action.sagsbehandlere
          .filter((sagsbehandler) => sagsbehandler.id === targetValue)
          .map((sagsbehandler) => sagsbehandler.name)[0]

        return {
          ...state,
          sagsbehandler: {
            ...state.sagsbehandler,
            name: sagsbehandlerName,
            id: targetValue,
          },
        }
      }

      if (targetIdentifier === 'andreUregelmaessigheder') {
        return {
          ...state,
          andreUregelmaessigheder: {
            ...state.andreUregelmaessigheder,
            [target.name]: targetValue,
          },
        }
      } else {
        return {
          ...state,
          [targetIdentifier]: targetValue,
        }
      }
    }
    case 'HANDLE_CHANGE_RUBRIKFEJL': {
      const target = action.payload.target
      const index = action.index

      let targetValue = []

      if (getTargetValue(target) !== '') {
        targetValue = [
          {
            fejltekstId: getTargetValue(target),
          },
        ]
      }

      let rubrikker = [...state.rubrikker]

      rubrikker[index] = {
        ...rubrikker[index],
        valgteFejl: targetValue,
      }

      return { ...state, rubrikker }
    }
    case 'HANDLE_CHANGE_RUBRIKFEJL_MULTIPLE': {
      const target = action.payload.target
      const index = action.index
      const targetValues = getTargetValue(target)

      const valgteFejl = []

      if (!targetValues.includes('')) {
        for (let i = 0, l = targetValues.length; i < l; i += 1) {
          valgteFejl.push({
            fejltekstId: targetValues[i],
          })
        }
      }

      let rubrikker = [...state.rubrikker]

      rubrikker[index] = {
        ...rubrikker[index],
        valgteFejl: valgteFejl,
      }

      return { ...state, rubrikker }
    }
    case 'HANDLE_CHANGE_TOLDRAPPORT': {
      const target = action.payload.target
      const targetIdentifier = getTargetIdentifier(target)
      const targetValue = getTargetValue(target)

      return {
        ...state,
        toldrapport: {
          ...state.toldrapport,
          [targetIdentifier]: targetValue,
        },
      }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const useStyles = makeStyles((theme) => ({
  button: {
    float: 'right',
    marginTop: theme.spacing(4),
  },
}))

const Afrapporter = ({ currentUser }) => {
  const classes = useStyles()
  let { kontrolrapportId } = useParams()
  let history = useHistory()

  const [state, setState] = useReducer(reducer, {})
  const [open, setOpen] = React.useState(false)

  const action = useCallback(async () => await kontrolrapportApi.fetchById(kontrolrapportId), [kontrolrapportId])
  const { data, error, loading } = useFetching(action)

  useEffect(() => {
    setState({ type: 'UPDATE_INITIALSTATE', payload: data, currentUser: currentUser })
  }, [data])

  if (typeof data['toldmaessigAendringOpkraevning'] == 'number') {
    data['toldmaessigAendringOpkraevning'] = data['toldmaessigAendringOpkraevning'].toFixed(2)
  }

  if (typeof data['toldmaessigAendringTilbagebetaling'] == 'number') {
    data['toldmaessigAendringTilbagebetaling'] = data['toldmaessigAendringTilbagebetaling'].toFixed(2)
  }

  const handleSkemaOpen = () => {
    setOpen(true)
  }

  const handleSkemaClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    async function putKontrolrapport() {
      kontrolrapportApi
        .put(kontrolrapportId, state)
        .then((res) => {
          history.push('/vis/' + kontrolrapportId)

          return res.data
        })
        .catch((error) => {
          alert('Something went wrong during afrapportering!\n' + error)}
        )

    }

    if (!state.workzoneJournalnummer) {
      alert('Journalnummer mangler at blive udfyldt')
      return
    }

    putKontrolrapport()
  }

  if (loading) return <Loading />
  if (error) return <Error />

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify='center' alignItems='center' spacing={3}>
        <Grid item xs={6}>
          <Typography variant='h2'>Indsæt kontrolresultat</Typography>
          <Divider />
        </Grid>

        <Grid item xs={6} align='end'>
          <Button
            color='primary'
            variant='contained'
            onClick={handleSkemaOpen}>
            Skema til toldrapport
          </Button>

          <Dialog maxWidth='lg' open={open}>
            <DialogActions>
              <Button
                square
                color='primary'
                variant='contained'
                border={1}
                onClick={handleSkemaClose}
                >
                  Luk
              </Button>
            </DialogActions>
            <DialogTitle id='skema-til-tilrapport-form'>
              Skema til toldrapport
            </DialogTitle>
            <DialogContent>
              {state && (
                <SkemaTilToldrapport state={state} setState={setState} />
              )}
            </DialogContent>

          </Dialog>
        </Grid>
      </Grid>

        <Grid container justify='center' spacing={3} square>
          <Grid item xs={12}>
            {state && <TopSection currentUser={currentUser} state={state} setState={setState} />}
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h5'>Rubrikker</Typography>
            {state && (
              <AfrapporteringRubrikkerTable
                rubrikker={state.rubrikker}
                setState={setState}
              />
            )}
          </Grid>
        </Grid>
          <Button
            id='btnSubmitAfrapportering'
            type='submit'
            variant='contained'
            color='secondary'
            size= 'large'
            disableElevation
            className={classes.button}>
            Gem
          </Button>
      </form>
    )
  }

export default Afrapporter
