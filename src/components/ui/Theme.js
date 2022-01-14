import { createMuiTheme } from '@material-ui/core/styles'

const toldsBlue = '#14143c'
const toldsYellow = '#ffbb16'
const toldsGrey = '#f4f4f4'

// Custom Theme Color
const theme = createMuiTheme({
  root: {
    display: 'flex',
  },
  palette: {
    background: {
      default: `${toldsGrey}`,
    },
    common: {
      Blue: `${toldsBlue}`,
      Yellow: `${toldsYellow}`,
      Grey: `${toldsGrey}`,
    },
    primary: {
      main: `${toldsBlue}`,
    },
    secondary: {
      main: `${toldsYellow}`,
    },
    typography: {
      fontFamily: [
        'Academy Sans',
        '"Helvetica Neue"',
        'Helvetica',
        'Roboto',
        'Arial',
        'sans-serif'
      ].join(','),
    },
    warning: {
      main: '#f50057',
    },
    shape: {
    borderRadius: 0,
  },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': ['AcademySans'],
          WebkitFontSmoothing: 'auto',
        },
      },
    },
  },
})

export default theme
