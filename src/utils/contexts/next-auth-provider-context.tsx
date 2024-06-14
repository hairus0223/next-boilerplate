'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'

export const NextAuthProvider = ({ children, ...rest }: SessionProviderProps) => {
  return <SessionProvider {...rest}>{children}</SessionProvider>
}
