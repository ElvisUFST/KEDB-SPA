import React from 'react'
import { Container, Grid } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import AktuelKoe from '../containers/aktuel-koe/AktuelKoe'
import SoegITidligereSager from '../containers/soeg-i-tidligere-sager/SoegITidligereSager'
import StatistikOverblik from '../containers/statistik-overblik/StatistikOverblik'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { AzureAD, AuthenticationState } from 'react-aad-msal'
import Header from '../components/ui/Header'
import NavigationMenu from '../components/navigation-menu/NavigationMenu'
import Kontrolrapport from '../components/kontrolrapport/Kontrolrapport'
import Afrapporter from '../containers/aktuel-koe/afrapporter/Afrapporter'
import Transportmidler from '../containers/superbruger/transportmiddel/Transportmidler'
import Transportmiddel from '../containers/superbruger/transportmiddel/Transportmiddel'
import OvertraedelsesAktoerer from '../containers/superbruger/overtraedelsesaktoer/Overtraedelsesaktoerer'
import OvertraedelsesAktoer from '../containers/superbruger/overtraedelsesaktoer/Overtraedelsesaktoer'
import Fejltekster from '../containers/superbruger/fejltekst/Fejltekster'
import Fejltekst from '../containers/superbruger/fejltekst/Fejltekst'
import Profiler from '../containers/superbruger/profil/Profiler'
import Profil from '../containers/superbruger/profil/Profil'
import RubriktypeContainer from '../containers/superbruger/rubriktype/Rubriktyper'
import Rubriktype from '../containers/superbruger/rubriktype/Rubriktype'
import Fejlkategori from '../containers/superbruger/fejlkategori/Fejlkategori'
import Fejlkategorier from '../containers/superbruger/fejlkategori/Fejlkategorier'
import Kommunikationsformer from '../containers/superbruger/kommunikationsform/Kommunikationsformer'
import Kommunikationsform from '../containers/superbruger/kommunikationsform/Kommunikationsform'
import RubrikMuligeFejl from '../containers/superbruger/rubrik-mulige-fejl/RubrikMuligeFejl'
import OpdagendeAktoerer from '../containers/superbruger/opdagende-aktoerer/OpdagendeAktoerer'
import OpdagendeAktoer from '../containers/superbruger/opdagende-aktoerer/OpdagendeAktoer'

import { authProvider } from '../authProvider'

function App() {
  return (
      <Router>
        <AzureAD provider={authProvider} forceLogin>
          {({ login, authenticationState, error, accountInfo }) => {
            switch (authenticationState) {
              case AuthenticationState.Authenticated:
                return (
                  <>
                  <div>
                  <CssBaseline />
                    <Header />
                    <Container justify='center' maxWidth='xl' spacing={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={2}>
                          <NavigationMenu/>
                        </Grid>
                      <Grid item xs={9}>
                        <Switch>
                          <Route exact path='/'>
                            <Redirect to='/aktuelkoe/page/0' />
                          </Route>

                            <Route
                              exact
                              path={['/aktuelkoe/', '/aktuelkoe/page/:pagenumber']}
                              component={AktuelKoe}
                            />
                            <Route
                              exact
                              path={[
                                '/soegitidligeresager',
                                '/soegitidligeresager/page/:pagenumber',
                              ]}
                              component={SoegITidligereSager}
                            />
                            <Route
                              path='/statistik-overblik'
                              component={StatistikOverblik}
                            />
                            <Route
                              path='/vis/:kontrolrapportId'
                              exact
                              component={Kontrolrapport}
                            />
                            <Route
                              path='/afrapporter/:kontrolrapportId'
                              exact
                              render={(props) => <Afrapporter currentUser={accountInfo.account} {...props} />}
                            />
                            <Route
                              path='/superbruger/toldrapportTransportmidler'
                              exact
                              component={Transportmidler}
                            />
                            <Route
                              path='/superbruger/toldrapportTransportmiddel/:transportId'
                              exact
                              component={Transportmiddel}
                            />
                            <Route
                              path='/superbruger/toldrapportFejlkategorier'
                              exact
                              component={Fejlkategorier}
                            />
                            <Route
                              path='/superbruger/toldrapportFejlkategori/:fejlkategoriId'
                              exact
                              component={Fejlkategori}
                            />
                            <Route
                              path='/superbruger/toldrapportKommunikationsformer'
                              exact
                              component={Kommunikationsformer}
                            />
                            <Route
                              path='/superbruger/toldrapportKommunikationsform/:kommunikationsformId'
                              exact
                              component={Kommunikationsform}
                            />
                            <Route
                              path='/superbruger/toldrapportOvertraedelsesAktoerer'
                              exact
                              component={OvertraedelsesAktoerer}
                            />
                            <Route
                              path='/superbruger/toldrapportOvertraedelsesAktoer/:aktoerId'
                              exact
                              component={OvertraedelsesAktoer}
                            />
                            <Route
                              path='/superbruger/ToldrapportOpdagendeAktoerer'
                              exact
                              component={OpdagendeAktoerer}
                            />
                            <Route
                              path='/superbruger/ToldrapportOpdagendeAktoer/:aktoerId'
                              exact
                              component={OpdagendeAktoer}
                            />
                            <Route
                              path='/superbruger/profiler'
                              exact
                              component={Profiler}
                            />
                            <Route
                              path='/superbruger/profil/:profilId'
                              exact
                              component={Profil}
                            />
                            <Route
                              path='/superbruger/rubriktyper'
                              exact
                              component={RubriktypeContainer}
                            />
                            <Route
                              path='/superbruger/rubriktype/:rubriktypeId'
                              exact
                              component={Rubriktype}
                            />
                            <Route
                              path='/superbruger/fejltekster'
                              exact
                              component={Fejltekster}
                            />
                            <Route
                              path='/superbruger/fejltekst/:fejltekstId'
                              exact
                              component={Fejltekst}
                            />
                            <Route
                              path='/superbruger/rubrikMuligeFejl'
                              exact
                              component={RubrikMuligeFejl}
                            />
                          </Switch>
                    </Grid>
                  </Grid>
                    </Container>
                    </div>
                  </>
                )
              case AuthenticationState.Unauthenticated:
                return (
                  <div>
                    {error && (
                      <p>
                        <span>Log ind mislykkedes. Prøv igen.</span>
                      </p>
                    )}
                    <p>
                      <span>Du er ikke logget ind</span>
                      <button type='button' onClick={login}>Log ind</button>
                    </p>
                  </div>
                )
              case AuthenticationState.InProgress:
                return <p>Authenticating...</p>

              default:
            }
          }}
        </AzureAD>
      </Router>
  )
}

export default App
