'use client'

import { ChildrenType } from '@/utils/models/core-model'
import Link, { LinkProps } from 'next/link'
import { forwardRef } from 'react'

type RouterLinkProps = LinkProps &
  Partial<ChildrenType> & {
    className?: string
  }

// eslint-disable-next-line react/display-name
export const RouterLink = forwardRef((props: RouterLinkProps, ref: any) => {
  // Props
  const { href, className, ...other } = props

  return (
    <Link ref={ref} href={href} className={className} {...other}>
      {props.children}
    </Link>
  )
})
