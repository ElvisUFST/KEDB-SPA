import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import AfkrydsForOversendelseAfSagTilFinansielAnalyse from './AK-afrapporter-afkrydsForOversendelseAfSagTilFinansielAnalyse'
import OversendtTilToldrapport from './AK-afrapporter-oversendtTilToldrapportg'
import AfrapporteretDato from "./AK-afrapporter-afrapporteretDato";
import AntagetDato from './AK-afrapporter-antagetDato'
import Branchekode from './AK-afrapporter-branchekode'
import AndreUregelmaessigheder from './AK-afrapporter-andreUregelmaessigheder'
import Journalnummer from './AK-afrapporter-journalnummer'
import Referencenummer from './AK-afrapporter-referencenummer'
import ToldmaessigAendringOpkraevning from './AK-afrapporter-toldmaessigAendringOpkraevning'
import ToldmaessigAendringTilbagebetaling from './AK-afrapporter-toldmaessigAendringTilbagebetaling'
import VaremodtagerCvr from './AK-afrapporter-varemodtagercvr'
import Varemodtagernavn from './AK-afrapporter-varemodtagernavn'
import Varepostnummer from './AK-afrapporter-varepostnummer'
import Profilnummer from './AK-afrapporter-profilnummer'
import InputContainer from './InputContainer'
import Sagsbehandler from './AK-Afrapporter-sagsbehandler'
import Toldsted from './AK-afrapporter-toldsted'

const TopSection = ({ currentUser, state, setState }) => {
  return (
    <Paper style={{ padding: '15px' }}>
      <Grid item container spacing={1}>
        <InputContainer label='Referencenummer'>
          <Referencenummer value={state.referencenummer} />
        </InputContainer>

        <InputContainer label='Varepostnummer'>
          <Varepostnummer value={state.varepostnummer} />
        </InputContainer>

        <InputContainer label='Profilnummer'>
          <Profilnummer value={state.profilnummer} />
        </InputContainer>

        <InputContainer label='Antaget dato'>
          <AntagetDato value={state.antagetDato} />
        </InputContainer>

        <InputContainer label='Varemodtager Navn'>
          <Varemodtagernavn value={state.varemodtagerNavn} />
        </InputContainer>

        <InputContainer label='Varemodtager CVR'>
          <VaremodtagerCvr value={state.varemodtagerCVR} />
        </InputContainer>

        <InputContainer label='Branchekode'>
          <Branchekode value={state.branchekode} />
        </InputContainer>

        <InputContainer label='Toldsted'>
          <Toldsted value={state.toldsted} />
        </InputContainer>

        <InputContainer label='Afrapporteret Dato'>
          <AfrapporteretDato value={state.afrapporteretDato} />
        </InputContainer>

        <InputContainer label='Journalnummer'>
          <Journalnummer
              value={state.workzoneJournalnummer}
              setState={setState}
          />
        </InputContainer>

        <InputContainer label='Opkrævning'>
          <ToldmaessigAendringOpkraevning
            value={state.toldmaessigAendringOpkraevning}
            setState={setState}
          />
        </InputContainer>

        <InputContainer label='Tilbagebetaling'>
          <ToldmaessigAendringTilbagebetaling
            value={state.toldmaessigAendringTilbagebetaling}
            setState={setState}
          />
        </InputContainer>

        <InputContainer label='Sagsbehandler'>
          <Sagsbehandler currentUser={currentUser} value={state.sagsbehandler} setState={setState} />
        </InputContainer>

        <InputContainer label='Afkryds for oversendelse af sag til Finansiel Analyse'>
          <AfkrydsForOversendelseAfSagTilFinansielAnalyse
              value={state.oversendtTilAnalyse}
              setState={setState}
          />
        </InputContainer>

        <InputContainer label='Oversendt til toldrapport@toldst.dk'>
          <OversendtTilToldrapport
              value={state.oversendtTilToldrapport}
              setState={setState}
          />
        </InputContainer>

        <InputContainer label='Andre uregelmæssigheder'>
          <AndreUregelmaessigheder
            value={state.andreUregelmaessigheder}
            setState={setState}
          />
        </InputContainer>

      </Grid>
    </Paper>
  )
}

export default TopSection
