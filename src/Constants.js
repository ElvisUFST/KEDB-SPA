import React from 'react'
import {
  ContactSupport,
  LibraryBooks,
  List,
  NavigateNext,
  Search
} from '@material-ui/icons'
import BarChartIcon from '@material-ui/icons/BarChart';

export const mainNavComponents = [
  {
    label: 'Aktuel kø',
    path: '/aktuelkoe/page/0',
    menuIcon: <List/>,
  },
  {
    label: 'Søg i tidligere sager',
    path: '/soegitidligeresager/page/0',
    menuIcon: <Search/>,
  },
  {
    label: 'Statistik overblik',
    path: '/statistik-overblik',
    menuIcon: <BarChartIcon/>,
  },
]

export const externalNavigationComponents = [
  {
    label: 'FAQ',
    path: 'https://skat.sharepoint.com/:w:/r/sites/org_1535/Delte%20dokumenter/KEDB/FAQ%20KEDB.docx?d=wdb04c511e6104e15a613a5155f34a925&csf=1&web=1&e=FdS3A8',
    menuIcon: <ContactSupport/>,
  },
  {
    label: 'Brugervejledning',
    path: 'https://skat.sharepoint.com/:w:/r/sites/org_1535/Delte%20dokumenter/KEDB/BrugervejledningKEDB.docx?d=w57d9082973da480182cede82a00b602f&csf=1&web=1&e=Maeeuu',
    menuIcon: <LibraryBooks/>,
  },
]

export const superbrugerNavigationComponents = [
  {
    label: 'Profil',
    path: '/superbruger/profiler',
    menuIcon: <NavigateNext/>,
  },
  {
    label: 'Rubriktype',
    path: '/superbruger/rubriktyper',
    menuIcon: <NavigateNext/>,
  },
  {
    label: 'Fejltekst',
    path: '/superbruger/fejltekster',
    menuIcon: <NavigateNext/>,
  },
  {
    label: 'Rubrik mulig fejl',
    path: '/superbruger/rubrikMuligeFejl',
    menuIcon: <NavigateNext/>,
  },
]

export const superbrugerToldrapportNavigationComponents = [
  {
    label: 'Transportmiddel',
    path: '/superbruger/toldrapportTransportmidler',
    menuIcon: <NavigateNext/>,
  },
  {
    label: 'Opdagende aktører',
    path: '/superbruger/toldrapportOpdagendeAktoerer',
    menuIcon: <NavigateNext/>,
  },
  {
    label: 'Fejlkategori',
    path: '/superbruger/toldrapportFejlkategorier',
    menuIcon: <NavigateNext/>,
  },
  {
    label: 'Kommunikationsform',
    path: '/superbruger/toldrapportkommunikationsformer',
    menuIcon: <NavigateNext/>,
  },
  {
    label: 'Overtrædelsesaktør',
    path: '/superbruger/toldrapportOvertraedelsesAktoerer',
    menuIcon: <NavigateNext/>,
  },
]

/**
 * Remove decimals from OrginalVærdi and KorrigeretVærdi from given Rubriktupenumbers
 * @type {number[]}
 */
const Rubriktyper = {
  VAERDIOPLYSNINGER: 12,
  FAKTURA_BELOEB: 22.2,
  TOLDKONTINGENT: 39,
  VARENS_PRIS: 42,
  STATISTISK_VAERDI: 46
}

export const RubrikTypeValuesNoDecimals = [Rubriktyper.VAERDIOPLYSNINGER, Rubriktyper.FAKTURA_BELOEB, Rubriktyper.TOLDKONTINGENT, Rubriktyper.VARENS_PRIS, Rubriktyper.STATISTISK_VAERDI]

