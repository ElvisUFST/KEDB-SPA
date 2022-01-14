import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import axios from 'axios'
import styles from '../Superbruger.module.css'
import RubrikMuligFejlTilfoejSkema from './RubrikMuligFejlTilfoejSkema'
import { getTargetIdentifier, getTargetValue } from '../../../utils/eventUtils'
import rubrikMuligFejlApi from '../../../services/rubrikMuligFejlApi'
import rubriktypeApi from '../../../services/rubriktypeApi'
import profilApi from '../../../services/profilApi'
import fejltekstApi from '../../../services/fejltekstApi'
import Superbruger from '../Superbruger'
import withDialog from '../../../hocs/WithDialog'
import Loading from '../../../components/progress/Loading'
import Error from '../../../components/progress/Error'

const headers = [
  {
    id: 'rubrikTypeNavn',
    label: 'Rubriktype',
  },
  {
    id: 'fejltekst',
    label: 'Fejltekst',
  },
  {
    id: 'profilNummer',
    label: 'Profil nummer',
  },
]

const TilfoejRubrikMuligFejl = ({
  open,
  value,
  handleSkemaClose,
  handleSubmit,
  handleChange,
  rubriktyper,
  profiler,
  fejltekster,
}) => {
  return (
    <Dialog maxWidth='lg' open={open}>
      <DialogTitle className={styles.root}>
        Tilføj rubrik mulig fejl
      </DialogTitle>
      <DialogContent>
        <RubrikMuligFejlTilfoejSkema
          value={value}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          rubriktyper={rubriktyper}
          profiler={profiler}
          fejltekster={fejltekster}
        />
      </DialogContent>
      <DialogActions>
        <Button className={styles.btnDialogLuk} onClick={handleSkemaClose}>
          Luk
        </Button>

        <Button className={styles.btnDialogLuk} onClick={handleSubmit}>
          Gem
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const RubrikMuligeFejl = ({ handleSkemaClose, handleSkemaOpen, open }) => {
  const [rubrikMuligeFejl, setRubrikMuligeFejl] = React.useState([])
  const [rubrikMuligFejl, setRubrikMuligFejl] = React.useState({})
  const [rubriktyper, setRubriktyper] = React.useState([])
  const [profiler, setProfiler] = React.useState([])
  const [fejltekster, setFejltekster] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState()

  async function fetchData() {
    setLoading(true)

    await axios
      .all([
        rubrikMuligFejlApi.fetchAll(),
        rubriktypeApi.fetchAll(),
        profilApi.fetchAll(),
        fejltekstApi.fetchAll(),
      ])
      .then(
        axios.spread((rubrikMuligeFejl, rubriktyper, profiler, fejltekster) => {
          setRubrikMuligeFejl(rubrikMuligeFejl.data)
          setRubriktyper(rubriktyper.data)
          setProfiler(profiler.data)
          setFejltekster(fejltekster.data)

          setLoading(false)
        })
      )
      .catch((error) => {
        setLoading(false)
        setError(error.message)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = (index) => {
    const rubrikMuligFejl = rubrikMuligeFejl[index]

    rubrikMuligFejlApi
      .delete(
        rubrikMuligFejl.rubrikTypeId,
        rubrikMuligFejl.profilId,
        rubrikMuligFejl.fejltekstId
      )
      .then(() => {
        setRubrikMuligeFejl((state) => state.filter((_, i) => i !== index))
        alert('Slettet!')
      })
      .catch((error) => alert(error))
  }

  const handleChange = (event) => {
    event.preventDefault()

    const target = event.target
    const targetIdentifier = getTargetIdentifier(target)
    const targetValue = getTargetValue(target)

    setRubrikMuligFejl({
      ...rubrikMuligFejl,
      [targetIdentifier]: targetValue,
    })
  }

  // TODO: use form validator instead!
  const handleSubmit = () => {
    if (!Object.keys(rubrikMuligFejl).length) {
      handleSkemaClose()
      return
    }

    for (const property in rubrikMuligFejl) {
      const value = rubrikMuligFejl[property]

      if (value === '') {
        alert('Alle felter skal udfyldes!')
        return
      }
    }

    rubrikMuligFejlApi
      .post(rubrikMuligFejl)
      .then(() => {
        fetchData()
        alert('Oprettet!')
      })
      .catch(() => alert('Rubrik mulig fejlen findes allerede!'))

    handleSkemaClose()

    setRubrikMuligFejl({})
  }

  if (isLoading) return <Loading message='Vent venglist..' />
  if (error) return <Error message={`Der skete en fejl: ${error}`} />

  return (
    <Superbruger
      defaultData={rubrikMuligeFejl}
      title='Rubrik mulige fejl'
      tilfoejButtonTitle='rubrik mulig fejl'
      headers={headers}
      handleSkemaOpen={handleSkemaOpen}
      deleteable
      addable
      handleDelete={handleDelete}>
      <TilfoejRubrikMuligFejl
        open={open}
        value={rubrikMuligFejl}
        handleSkemaClose={handleSkemaClose}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        rubriktyper={rubriktyper}
        profiler={profiler}
        fejltekster={fejltekster}
      />
    </Superbruger>
  )
}

export default withDialog(RubrikMuligeFejl)
