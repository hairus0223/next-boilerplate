import { useContext } from 'react'
import HorizontalNavContext from '../contexts/navigations/horizontal-nav-context'

const useHorizontalNav = () => {
  // Hooks
  const context = useContext(HorizontalNavContext)

  if (context === undefined) {
    //TODO: set better error message
    throw new Error('HorizontalNav Component is required!')
  }

  return context
}

export default useHorizontalNav
