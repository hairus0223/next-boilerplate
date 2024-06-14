import { Settings } from '../contexts/settings-context'

const ThemeConfigs: { [key: string]: Settings } = {
  'theme-1': {
    mode: 'light'
  },
  'theme-2': {
    mode: 'light',
    skin: 'bordered'
  },
  'theme-3': {
    mode: 'light',
    semiDark: true
  },
  'theme-4': {
    mode: 'dark'
  },
  'theme-5': {
    mode: 'light',
    layout: 'horizontal'
  },
  'theme-6': {
    layout: 'horizontal',
    skin: 'bordered',
    mode: 'dark'
  }
}

export default ThemeConfigs
