import {
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from '@material-ui/core'
import React from 'react'

const RubrikType = ({ value, handleChange, options }) => {
  return (
    <TextField
    name='rubrikTypeId'
      select
      value={value}
      fullWidth
      onChange={(event) => handleChange(event)}
      variant='outlined'>
      <MenuItem value=''>
        <em>----</em>
      </MenuItem>

      {options.length > 0 &&
        options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.navn}
          </MenuItem>
        ))}
    </TextField>
  )
}

const FejlTekst = ({ value, handleChange, options }) => {
  return (
    <>
      <TextField
        name='fejltekstId'
        value={value}
        select
        fullWidth
        onChange={(event) => handleChange(event)}
        variant='outlined'>
        <MenuItem value=''>
          <em>----</em>
        </MenuItem>

        {options.length > 0 &&
          options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.tekst}
            </MenuItem>
          ))}
      </TextField>
    </>
  )
}

const Profiler = ({ value, handleChange, options }) => {
  return (
    <TextField
      name='profilId'
      value={value}
      select
      fullWidth
      onChange={(event) => handleChange(event)}
      variant='outlined'>
      <MenuItem value=''>
        <em>----</em>
      </MenuItem>

      {options.length > 0 &&
        options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.profilNummer}
          </MenuItem>
        ))}
    </TextField>
  )
}

const RubrikMuligFejlTilfoejSkema = ({
  value,
  handleChange,
  handleSubmit,
  rubriktyper,
  profiler,
  fejltekster,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems='center'>
          <Grid item xs={6}>
            <InputLabel>Rubriktype:</InputLabel>
          </Grid>

          <Grid item xs={6}>
            <RubrikType
              value={value.rubrikTypeId || ''}
              options={rubriktyper}
              handleChange={handleChange}
            />
          </Grid>

        <Grid item xs={6}>
          <InputLabel>Fejltekst:</InputLabel>
        </Grid>

        <Grid item xs={6}>
          <FejlTekst
            value={value.fejltekstId || ''}
            options={fejltekster}
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel>Profiler:</InputLabel>
        </Grid>

        <Grid item xs={6} style={{ marginBottom: 15 }}>
          <Profiler
            value={value.profilId || ''}
            options={profiler}
            handleChange={handleChange}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default RubrikMuligFejlTilfoejSkema
