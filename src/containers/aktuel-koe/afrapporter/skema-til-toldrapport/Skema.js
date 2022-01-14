import { Grid, Paper } from '@material-ui/core'
import AndreDeltagere from './skema-andreDeltagere'
import Toldkontrol from './skema-toldkontrol'
import styles from './Skema.module.css'
import Sagsbeskrivelse from './skema-sagsbeskrivelse'
import Overtraedelsesaktoerer from './skema-overtraedelsesaktoerer'
import Kommunikationsformer from './skema-kommunikationsformer'
import Fejlkategorier from './skema-fejlkategorier'
import OpdagendeAktoerer from './skema-opdagendeAktoerer'
import HvilkenGodkendtOrdning from './skema-hvilkenGodkendtOrdning'
import ErDerAnvendtGodkendtOrdning from './skema-erDerAnvendtGodkendtOrdning'
import AnkommetDato from './skema-ankommetDato'
import AnkommetMed from './skema-alleTransportmidler'
import RepraesentantCVR from './skema-repraesentantCVR'
import RepraesentantNavn from './skema-repraesentantNavn'
import SkemaVaremodtagernavn from './skema-varemodtagerNavn'
import SkemaJournalnummer from './skema-journalnummer'
import EgetNavn from './skema-egetNavn'
import DagsDato from './skema-dagsDato'
import TaltMedKontaktperson from './skema-taltMedKontaktperson'
import SkemaVaremodtagerCvr from './skema-varemodtagerCVR'
import React, { useEffect } from 'react'
import axios from 'axios'
import transportmiddelApi from '../../../../services/transportmiddelApi'
import fejlkategoriApi from '../../../../services/fejlkategoriApi'
import kommunikationApi from '../../../../services/kommunikationApi'
import opdagendeAktoerApi from '../../../../services/opdagendeAktoerApi'
import overtraedelsesAktoerApi from '../../../../services/overtraedelsesAktoerApi'

const SkemaTilToldrapport = ({ state, setState }) => {
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const [transportmidler, setTransportmidler] = React.useState()
  const [toldrapportFejlkategorier, setToldrapportFejlkategorier] = React.useState()
  const [toldrapportKommunikationsformer, setToldrapportKommunikationsformer] = React.useState()
  const [toldrapportOpdagendeAktoerer, setToldrapportOpdagendeAktoerer] = React.useState()
  const [overtraedelsesaktoerer, setOvertraedelsesaktoerer] = React.useState()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      await axios
        .all([
          transportmiddelApi.fetchAll(),
          fejlkategoriApi.fetchAll(),
          kommunikationApi.fetchAll(),
          opdagendeAktoerApi.fetchAll(),
          overtraedelsesAktoerApi.fetchAll(),
        ])
        .then(
          axios.spread(
            (
              transportmiddel,
              fejlkategori,
              kommunikation,
              opdagendeAktoerer,
              overtraedelsesAktoerer
            ) => {
              setTransportmidler(transportmiddel.data)
              setToldrapportFejlkategorier(fejlkategori.data)
              setToldrapportKommunikationsformer(kommunikation.data)
              setToldrapportOpdagendeAktoerer(opdagendeAktoerer.data)
              setOvertraedelsesaktoerer(overtraedelsesAktoerer.data)

              setLoading(false)
            }
          )
        )
        .catch((error) => {
          setLoading(false)
          setError(error.message)
        })
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  } else if (error) {
    return (
      <h1>
        Could not fetch skema data <br />
        - Error message: {error}
      </h1>
    )
  } else {
    const toldrapport = state.toldrapport || {}

    return (
      <>
        <Paper variant='outlined' className={styles['skema-root']}>
          <Grid container justify='flex-end'>
            <Grid container spacing={3} className={styles.firstGrid}>
              <Grid item xs={6}>
                <EgetNavn value={state.sagsbehandler.name} />
              </Grid>
              <Grid item xs={6}>
                <DagsDato value={toldrapport.dagsDato} />
              </Grid>
            </Grid>

            <Grid container spacing={3} className={styles.secondGrid}>
              <Grid item xs={6}>
                <AndreDeltagere value={toldrapport.andreDeltagere} setState={setState} />
              </Grid>
              <Grid item xs={6}>
                <SkemaJournalnummer value={state.workzoneJournalnummer} />
              </Grid>
            </Grid>

            <Grid container spacing={3} className={styles.firstGrid}>
              <Grid item xs={6}>
                <SkemaVaremodtagerCvr value={state.varemodtagerCVR} />
              </Grid>
              <Grid item xs={6}>
                <SkemaVaremodtagernavn value={state.varemodtagerNavn} />
              </Grid>
            </Grid>

            <Grid container spacing={3} className={styles.secondGrid}>
              <Grid item xs={6}>
                <RepraesentantNavn value={state.repraesentantNavn} />
              </Grid>

              <Grid item xs={6}>
                <RepraesentantCVR value={state.repraesentantCvr} />
              </Grid>
            </Grid>

            <Grid container spacing={0} className={styles.firstGrid}>
              <Grid item xs={12}>
                <TaltMedKontaktperson value={toldrapport.taltMed} setState={setState} />
              </Grid>
            </Grid>

            <Grid container spacing={3} className={styles.secondGrid}>
              <Grid item xs={6}>
                <AnkommetMed value={toldrapport.toldrapportTransportmiddelId} setState={setState} options={transportmidler} />
              </Grid>
              <Grid item xs={6}>
                <AnkommetDato value={state.antagetDato} />
              </Grid>
            </Grid>

            <Grid container spacing={3} className={styles.firstGrid}>
              <Grid item xs={6}>
                <ErDerAnvendtGodkendtOrdning value={toldrapport.godkendtOrdning} setState={setState} />
              </Grid>
              <Grid item xs={6}>
                <HvilkenGodkendtOrdning value={toldrapport.godkendtOrdningTekst} setState={setState} />
              </Grid>

              <Grid item xs={12} className={styles.secondGrid}>
                <OpdagendeAktoerer value={toldrapport.toldrapportOpdagendeAktoerId} setState={setState} options={toldrapportOpdagendeAktoerer} />
              </Grid>

              <Grid item xs={12} className={styles.firstGrid}>
                <Fejlkategorier value={toldrapport.toldrapportFejlKategoriId} setState={setState} options={toldrapportFejlkategorier} />
              </Grid>

              <Grid item xs={12} className={styles.secondGrid}>
                <Kommunikationsformer value={toldrapport.toldrapportKommunikationId} setState={setState} options={toldrapportKommunikationsformer} />
              </Grid>

              <Grid item xs={12} className={styles.firstGrid}>
                <Overtraedelsesaktoerer value={toldrapport.toldrapportOvertraedelsesAktoerId} setState={setState} options={overtraedelsesaktoerer} />
              </Grid>

              <Grid item xs={12} className={styles.secondGrid}>
                <Sagsbeskrivelse value={toldrapport.sagsbeskrivelse} setState={setState} />
              </Grid>

              <Grid item xs={12} className={styles.firstGrid}>
                <Toldkontrol value={toldrapport.toldkontrol} setState={setState} />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    )
  }
}

export default SkemaTilToldrapport
