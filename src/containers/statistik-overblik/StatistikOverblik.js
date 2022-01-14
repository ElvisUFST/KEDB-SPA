import React, { useCallback } from 'react'
import { Grid, Typography, Paper, Divider, TextField, MenuItem } from '@material-ui/core'
import { Route } from 'react-router-dom'
import PieChart from '../../components/diagrams/pie-chart/PieChart'
import BarChart from '../../components/diagrams/bar-chart/BarChart'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import statistikOverblikApi from '../../services/statistikOverblikApi'
import LoadData from '../../components/loading-wrapper/LoadData'
import { formatCurrencyWithValuta, formatPercentage } from '../../utils/currencyUtils'

const AntalKontrollerOgFejl = ({ antalKontrollerOgFejl }) => {
  return (
    <>
      <Typography variant='h4'>Antal kontroller og fejl</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Kontroller</b></TableCell>
              <TableCell><b>Antal/Fejlprocent</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Vareposter udtaget til kontrol</TableCell>
              <TableCell>
                {antalKontrollerOgFejl.totalUdtagetTilKontrol}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Antal afrapporterede kontroller</TableCell>
              <TableCell>{antalKontrollerOgFejl.totalAfrapporteret}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Antal afrapporterede med fejl</TableCell>
              <TableCell>
                {antalKontrollerOgFejl.totalAfrapporteretMedFejl}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Antal afrapporterede uden fejl</TableCell>
              <TableCell>
                {antalKontrollerOgFejl.totalAfrapporteretUdenFejl}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fejlprocent</TableCell>
              <TableCell>{formatPercentage(antalKontrollerOgFejl.procentMedFejl)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const BeloebsmaessigReguleringerTold = ({ reguleringer }) => {
  return (
    <>
      <Typography variant='h4'>Beløbsmæssig reguleringer (told)</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Reguleringer</b></TableCell>
              <TableCell><b>Antal/Beløb</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                Antal sager som har medført regulering i told
              </TableCell>
              <TableCell>{reguleringer.reguleringCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reguleret beløb tilbagebetalt total</TableCell>
              <TableCell>
                {formatCurrencyWithValuta(reguleringer.reguleringTilbagebetalt)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reguleret beløb opkrævet total</TableCell>
              <TableCell>
                {formatCurrencyWithValuta(reguleringer.reguleringOpkreavet)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const AfledteEffekter = ({ afledteEffekter }) => {
  return (
    <>
      <Typography variant='h4'>Afledte effekter</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Afledninger</b></TableCell>
              <TableCell><b>Antal</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Antal oversendt til toldrapport</TableCell>
              <TableCell>
                {afledteEffekter.oversendtTilToldrapportCount} (
                {formatPercentage(afledteEffekter.oversendtTilToldrapportPercent)} af total)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Antal sendt til analyse</TableCell>
              <TableCell>
                {afledteEffekter.sendtTilAnalyseCount} (
                {formatPercentage(afledteEffekter.sendtTilAnalysePercent)} af total)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Andre uregelmæssigheder</TableCell>
              <TableCell>
                {afledteEffekter.sendtTilAndreUregelmaessighederCount} (
                {formatPercentage(afledteEffekter.sendtTilAndreUregelmaessighederPercent)} af total)
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const ModtagereMedFlestKontroller = ({ top10VaremodtagereUdtaget }) => {
  return (
    <>
      <Typography variant='h4'>Modtagere med flest kontroller</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Modtagernavn</b>
              </TableCell>
              <TableCell>
                <b>CVR</b>
              </TableCell>
              <TableCell>
                <b>Antal kontroller</b>
              </TableCell>
              <TableCell>
                <b>Andel af samlet antal kontroller</b>
              </TableCell>
              <TableCell>
                <b>Antal med fejl</b>
              </TableCell>
              <TableCell>
                <b>Antal uden fejl</b>
              </TableCell>
              <TableCell>
                <b>Fejlprocent</b>
              </TableCell>
              <TableCell>
              <b>Reguleret beløb <i>Opkrævet</i></b>
              </TableCell>
              <TableCell>
              <b>Reguleret beløb <i>Tilbagebetalt</i></b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top10VaremodtagereUdtaget.virksomheder.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.navn}</TableCell>
                  <TableCell>{item.cvr}</TableCell>
                  <TableCell>{item.antal}</TableCell>
                  <TableCell>
                    {formatPercentage(item.andelAfSamlet)}
                  </TableCell>
                  <TableCell>{item.antalMedFejl}</TableCell>
                  <TableCell>{item.antalUdenFejl}</TableCell>
                  <TableCell>
                    {formatPercentage(item.fejlprocent)}
                  </TableCell>
                  <TableCell>
                    {formatCurrencyWithValuta(item.reguleringOpkreavet)}
                  </TableCell>
                  <TableCell>
                    {formatCurrencyWithValuta(item.reguleringTilbagebetalt)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const ModtagereMedFlestFejl = ({ top10VaremodtagereMedFejl }) => {
  return (
    <>
      <Typography variant='h4'>Modtagere med flest fejl</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Modtagernavn</b>
              </TableCell>
              <TableCell>
                <b>CVR</b>
              </TableCell>
              <TableCell>
                <b>Antal kontroller</b>
              </TableCell>
              <TableCell>
                <b>Andel af samlet antal kontroller</b>
              </TableCell>
              <TableCell>
                <b>Antal med fejl</b>
              </TableCell>
              <TableCell>
                <b>Antal uden fejl</b>
              </TableCell>
              <TableCell>
                <b>Fejlprocent</b>
              </TableCell>
              <TableCell>
                <b>
                  Reguleret beløb <i>Opkrævet</i>
                </b>
              </TableCell>
              <TableCell>
                <b>
                  Reguleret beløb <i>Tilbagebetalt</i>
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top10VaremodtagereMedFejl.virksomheder.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.navn}</TableCell>
                  <TableCell>{item.cvr}</TableCell>
                  <TableCell>{item.antal}</TableCell>
                  <TableCell>
                    {formatPercentage(item.andelAfSamlet)}
                  </TableCell>
                  <TableCell>{item.antalMedFejl}</TableCell>
                  <TableCell>{item.antalUdenFejl}</TableCell>
                  <TableCell>
                    {formatPercentage(item.fejlprocent)}
                  </TableCell>
                  <TableCell>
                    {formatCurrencyWithValuta(item.reguleringOpkreavet)}
                  </TableCell>
                  <TableCell>
                    {formatCurrencyWithValuta(item.reguleringTilbagebetalt)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const RepraesentanterMedFlestKontroller = ({ top10KlarererUdtaget }) => {
  return (
    <>
      <Typography variant='h4'>Repræsentanter med flest kontroller</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Repræsentantnavn</b>
              </TableCell>
              <TableCell>
                <b>CVR</b>
              </TableCell>
              <TableCell>
                <b>Antal kontroller</b>
              </TableCell>
              <TableCell>
                <b>Andel af samlet antal kontroller</b>
              </TableCell>
              <TableCell>
                <b>Antal med fejl</b>
              </TableCell>
              <TableCell>
                <b>Antal uden fejl</b>
              </TableCell>
              <TableCell>
                <b>Fejlprocent</b>
              </TableCell>
              <TableCell>
                <b>
                  Reguleret beløb <i>Opkrævet</i>
                </b>
              </TableCell>
              <TableCell>
                <b>
                  Reguleret beløb <i>Tilbagebetalt</i>
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top10KlarererUdtaget.virksomheder.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.navn}</TableCell>
                  <TableCell>{item.cvr}</TableCell>
                  <TableCell>{item.antal}</TableCell>
                  <TableCell>
                    {formatPercentage(item.andelAfSamlet)}
                  </TableCell>
                  <TableCell>{item.antalMedFejl}</TableCell>
                  <TableCell>{item.antalUdenFejl}</TableCell>
                  <TableCell>
                    {formatPercentage(item.fejlprocent)}
                  </TableCell>
                  <TableCell>
                    {formatCurrencyWithValuta(item.reguleringOpkreavet)}
                  </TableCell>
                  <TableCell>
                    {formatCurrencyWithValuta(item.reguleringTilbagebetalt)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const RepraesentanterMedFlestFejl = ({ top10KlarererMedFejl }) => {
  return (
    <>
      <Typography variant='h4'>Repræsentanter med flest fejl</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Repræsentantnavn</b>
              </TableCell>
              <TableCell>
                <b>CVR</b>
              </TableCell>
              <TableCell>
                <b>Antal kontroller</b>
              </TableCell>
              <TableCell>
                <b>Andel af samlet antal kontroller</b>
              </TableCell>
              <TableCell>
                <b>Antal med fejl</b>
              </TableCell>
              <TableCell>
                <b>Antal uden fejl</b>
              </TableCell>
              <TableCell>
                <b>Fejlprocent</b>
              </TableCell>
              <TableCell>
                <b>
                  Reguleret beløb <i>Opkrævet</i>
                </b>
              </TableCell>
              <TableCell>
                <b>
                  Reguleret beløb <i>Tilbagebetalt</i>
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top10KlarererMedFejl.virksomheder.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.navn}</TableCell>
                  <TableCell>{item.cvr}</TableCell>
                  <TableCell>{item.antal}</TableCell>
                  <TableCell>
                    {formatPercentage(item.andelAfSamlet)}
                  </TableCell>
                  <TableCell>{item.antalMedFejl}</TableCell>
                  <TableCell>{item.antalUdenFejl}</TableCell>
                  <TableCell>
                    {formatPercentage(item.fejlprocent)}
                  </TableCell>
                  <TableCell>
                    {formatCurrencyWithValuta(item.reguleringOpkreavet)}
                  </TableCell>
                  <TableCell>
                    {formatCurrencyWithValuta(item.reguleringTilbagebetalt)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const END_YEAR = new Date().getFullYear()

const getYears = () => {
  const startYear = 2019

  let years = []

  for (let index = startYear; index <= END_YEAR; index++) {
    years.push(index)
  }

  return years.sort((y1, y2) => y1 < y2 ? 1 : -1);
}

const StatistikOverblik = () => {
  const [year, setYear] = React.useState(END_YEAR)

  const action = useCallback(async () => await statistikOverblikApi.fetchByYear(year), [year])

  const handleChange = (event) => {
    setYear(event.target.value)
  }

  return (
    <Route exact path='/statistik-overblik'>
      <LoadData
        action={action}
        errorMessage='Noget gik galt med at hente data.. få fat i systemadministratoren'
        render={(data) => {
          return (
            <Grid container justify='center' spacing={8} xs={12}>
              <Grid container item xs spacing={2}>
                <Grid item xs={6}>
                  <Typography variant='h3'>Statistik Overblik</Typography>
                </Grid>

                <Grid item xs={6} align='end'>
                  <TextField
                    name='year'
                    select
                    label='Vælg år'
                    style={{ minWidth: '250px' }}
                    variant='outlined'
                    value={year}
                    onChange={(event) => handleChange(event)}>
                    {getYears().map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <PieChart
                  udenFejl={data.antalKontrollerOgFejl.procentUdenFejl}
                  medFejl={data.antalKontrollerOgFejl.procentMedFejl}
                />
              </Grid>

              <Grid item xs={12}>
                <AntalKontrollerOgFejl
                  antalKontrollerOgFejl={data.antalKontrollerOgFejl}
                />
              </Grid>

              <Grid item xs={12}>
                <BeloebsmaessigReguleringerTold
                  reguleringer={data.reguleringer}
                />
              </Grid>

              <Grid item xs={12}>
                <AfledteEffekter afledteEffekter={data.afledteEffekter} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h4'>Regulerede beløb</Typography>
                <BarChart
                  tilbagebetalt={data.reguleringer.tilbagebetalt}
                  opkraevet={data.reguleringer.opkravet}
                />
              </Grid>

              <Grid item xs={12}>
                <ModtagereMedFlestKontroller
                  top10VaremodtagereUdtaget={data.top10VaremodtagereUdtaget}
                />
              </Grid>

              <Grid item xs={12}>
                <ModtagereMedFlestFejl
                  top10VaremodtagereMedFejl={data.top10VaremodtagereMedFejl}
                />
              </Grid>

              <Grid item xs={12}>
                <RepraesentanterMedFlestKontroller
                  top10KlarererUdtaget={data.top10KlarererUdtaget}
                />
              </Grid>

              <Grid item xs={12}>
                <RepraesentanterMedFlestFejl
                  top10KlarererMedFejl={data.top10KlarererMedFejl}
                />
              </Grid>
            </Grid>
          )
        }}
      />
    </Route>
  )
}

export default StatistikOverblik
