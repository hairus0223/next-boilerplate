import { useContext } from 'react'
import VerticalNavContext from '../contexts/navigations/vertical-nav-context'

const useVerticalNav = () => {
  // Hooks
  const context = useContext(VerticalNavContext)

  if (context === undefined) {
    //TODO: set better error message
    throw new Error('VerticalNav Component is required!')
  }

  return context
}

export default useVerticalNav
