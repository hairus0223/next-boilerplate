import {
  HorizontalMenuContext,
  HorizontalMenuContextProps
} from '@/components/layouts/menu/horizontal/horizontal-menu/menu'
import { useContext } from 'react'

const useHorizontalMenu = (): HorizontalMenuContextProps => {
  // Hooks
  const context = useContext(HorizontalMenuContext)

  if (context === undefined) {
    //TODO: set better error message
    throw new Error('Menu Component is required!')
  }

  return context
}

export default useHorizontalMenu
