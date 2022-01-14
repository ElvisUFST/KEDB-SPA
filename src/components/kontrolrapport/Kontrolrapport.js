import { Grid, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import toldLogo from '../../containers/aktuel-koe/told-logo.svg'
import {
  fetchKontrolrapportById,
  selectStamdata,
  selectRubrikker,
} from '../../reducers/kontrolrapport/KontrolrapportSpecificReducer'
import { formatCurrency } from '../../utils/currencyUtils'
import kladde from './kladde.png'
import KontrolrapportRubrikkerTable from './KontrolrapportRubrikkerTable'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    marginTop: 10,
    backgroundImage: (props) => (props.journalnummer ? null : `url(${kladde})`),
  },
}))

const TopButtons = ({ kontrolrapportId }) => {
  const destination = `/afrapporter/${kontrolrapportId}`

  return (
    <>
      <Grid item xs={2} align='end'>
        <Button
          id='btnRediger'
          component={Link}
          to={destination}
          variant='contained'
          color='primary'
          size='small'
          startIcon={<EditIcon />}>
          Rediger
        </Button>
      </Grid>

      <Grid item xs={2} align='end'>
        <Button
          id='btnPdfDK'
          variant='contained'
          color='secondary'
          size='small'
          onClick={() => window.open(process.env.REACT_APP_BASEURL + '/Report/' + kontrolrapportId)}
          startIcon={<PictureAsPdfIcon />}>
          PDF (DK)
        </Button>
      </Grid>
    </>
  )
}

const ToldLogo = () => {
  return <img src={toldLogo} alt='logo' className='img' width='350px' />
}

const TopSection = () => {
  const stamdata = useSelector(selectStamdata)
  const journalnummer = stamdata.workzoneJournalnummer.value

  const classes = useStyles({ journalnummer })

  return (
    <>
      <Grid item xs container alignItems='flex-end'>
        <Grid item xs={6}>
          <ToldLogo />
        </Grid>
        <Grid item xs={6} align='end'>
          <Typography variant='h2'>Kontrolrapport</Typography>
        </Grid>
      </Grid>

      <Paper className={classes.paper}>
        <Grid item xs container spacing={3}>
          {Object.values(stamdata).map((item) => {
            let value = item.value
            let label = item.label

            if (typeof value === 'boolean') {
              value = value ? 'Ja' : 'Nej'
            }

            if (item.id === 'andreUregelmaessigheder') {
              value = item.value ? 'Ja' : 'Nej'
            }

            if (item.id === 'toldmaessigAendringOpkraevning' || item.id === 'toldmaessigAendringTilbagebetaling') {
              if (item.value.toString().length > 0) {
                value = 'DKK ' +  formatCurrency(item.value)
              }
            }

            if (item.id === 'sagsbehandler') {
              value = value?.name
            }

            return (
              <Grid key={item.id} item xs={2}>
                <Typography variant='subtitle1'>{label}</Typography>
                <Typography variant='overline'>{value}</Typography>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    </>
  )
}

const Kontrolrapport = () => {
  let { kontrolrapportId } = useParams()

  const dispatch = useDispatch()

  const rubrikker = useSelector(selectRubrikker)

  useEffect(() => {
    dispatch(fetchKontrolrapportById(kontrolrapportId))
  }, [kontrolrapportId, dispatch])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} container justify='flex-end'>
        <TopButtons kontrolrapportId={kontrolrapportId} />
      </Grid>

      <Grid item xs={12} container>
        <TopSection />
      </Grid>

      <Grid item xs={12}>
        <KontrolrapportRubrikkerTable data={rubrikker} />
      </Grid>
    </Grid>
  )
}

export default Kontrolrapport
