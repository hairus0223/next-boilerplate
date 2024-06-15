import { VerticalMenuContext, VerticalMenuContextProps } from '@/components/layouts/menu/vertical/vertical-menu/menu'
import { useContext } from 'react'

const useVerticalMenu = (): VerticalMenuContextProps => {
  // Hooks
  const context = useContext(VerticalMenuContext)

  if (context === undefined) {
    //TODO: set better error message
    throw new Error('Menu Component is required!')
  }

  return context
}

export default useVerticalMenu
