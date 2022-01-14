import React from 'react'
import withDialog from '../../../hocs/WithDialog'
import profilApi from '../../../services/profilApi'
import Superbruger from '../Superbruger'

const headers = [
  {
    id: 'profilNummer',
    label: 'Profilnummer i RIS',
  },
  {
    id: 'beskrivelse',
    label: 'Beskrivelse',
  },
  {
    id: 'aktiv',
    label: 'Aktiv?',
  },
]

const Profiler = ({ handleSkemaOpen }) => {
  return (
    <Superbruger
      api={profilApi}
      title='Profiler'
      headers={headers}
      destination='/profil/'
      handleSkemaOpen={handleSkemaOpen}
      editable />
  )
}

export default withDialog(Profiler)
