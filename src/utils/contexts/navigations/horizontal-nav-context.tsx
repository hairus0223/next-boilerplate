'use client'

import { ChildrenType } from '@/utils/models/core-model'
import { createContext, useMemo, useState } from 'react'

export type HorizontalNavContextProps = {
  isBreakpointReached?: boolean
  updateIsBreakpointReached: (isBreakpointReached: boolean) => void
}

const HorizontalNavContext = createContext({} as HorizontalNavContextProps)

export const HorizontalNavProvider = ({ children }: ChildrenType) => {
  // States
  const [isBreakpointReached, setIsBreakpointReached] = useState(false)

  // update isBreakpointReached value
  const updateIsBreakpointReached = (isBreakpointReached: boolean) => {
    setIsBreakpointReached(isBreakpointReached)
  }

  // Hooks
  const HorizontalNavProviderValue = useMemo(
    () => ({
      isBreakpointReached,
      updateIsBreakpointReached
    }),
    [isBreakpointReached]
  )

  return <HorizontalNavContext.Provider value={HorizontalNavProviderValue}>{children}</HorizontalNavContext.Provider>
}

export default HorizontalNavContext
