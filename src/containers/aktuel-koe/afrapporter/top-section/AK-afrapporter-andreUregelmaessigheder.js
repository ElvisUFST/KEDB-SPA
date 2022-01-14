import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import React from 'react'
import HelperText from './HelperText'

const id = 'andreUregelmaessigheder'
const dopingObj = { id: 'doping', label: 'Doping' }
const iprvarerObj = { id: 'ipRvarer', label: 'IPR varer' }
const narkotikaObj = { id: 'narkotika', label: 'Narkotika' }
const vaabenObj = { id: 'vaaben', label: 'Våben' }
const andetObj = { id: 'andet', label: 'Andet' }

const KontrolCheckbox = ({ setState, label, checked, name }) => {
  return (
    <FormControlLabel
      labelPlacement='top'
      style={{
        paddingRight: '25px',
        marginLeft: '-4.5px'
      }}
      control={
        <Checkbox
          id={id}
          checked={checked}
          name={name}
          color='primary'
          onChange={(event) =>
            setState({ type: 'HANDLE_CHANGE_TOPSECTION', payload: event })
          }
        />
      }
      label={label}
    />
  )
}

const AndreUregelmaessigheder = ({ value, setState }) => {
  const {
    doping = null,
    ipRvarer = null,
    narkotika = null,
    vaaben = null,
    andet = null,
  } = value || {}

  return (
    <HelperText title='Dette felt afkrydses når der er gennemført fysisk kontrol af varerne'>
      <FormGroup row>
        <KontrolCheckbox
          setState={setState}
          label={dopingObj.label}
          checked={doping}
          name={dopingObj.id}
        />
        <KontrolCheckbox
          setState={setState}
          label={iprvarerObj.label}
          checked={ipRvarer}
          name={iprvarerObj.id}
        />
        <KontrolCheckbox
          setState={setState}
          label={narkotikaObj.label}
          checked={narkotika}
          name={narkotikaObj.id}
        />
        <KontrolCheckbox
          setState={setState}
          label={vaabenObj.label}
          checked={vaaben}
          name={vaabenObj.id}
        />

        <KontrolCheckbox
          setState={setState}
          label={andetObj.label}
          checked={andet}
          name={andetObj.id}
        />
      </FormGroup>
    </HelperText>
  )
}
export default AndreUregelmaessigheder
