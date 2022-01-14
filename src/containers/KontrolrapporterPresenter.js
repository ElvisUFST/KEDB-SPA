import { Grid, Typography, LinearProgress } from '@material-ui/core'
import React from 'react'
import { Route } from 'react-router-dom'
import KontrolrapporterTable from '../components/kontrolrapporter-table/KontrolrapporterTable'

const KontrolrapporterPresenter = ({
  title,
  path,
  btnAfrapporter,
  error,
  status,
  data,
  headers,
  children,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h3'>{title}</Typography>
      </Grid>

      <Grid item container xs={12}>
        {React.Children.only(children)}
      </Grid>
      <Route path={path}>
        <Grid item xs={12}>
          {status === 'loading' ? (
            <>
              <LinearProgress />
              <Typography variant='h4'>Henter data..</Typography>
            </>
          ) : error ? (
            <Typography variant='h4'>Noget gik galt med at hente data.. få fat i systemadministratoren</Typography>
          ) : (
            <KontrolrapporterTable
              headers={headers}
              data={data}
              btnVisAfrapportering={true}
              btnAfrapporter={btnAfrapporter}
              pagination={true}
            />
          )}
        </Grid>
      </Route>
    </Grid>
  )
}

export default KontrolrapporterPresenter
