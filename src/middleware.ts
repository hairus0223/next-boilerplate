// Next Imports
import { NextRequest, NextResponse } from 'next/server'

// Third-party Imports
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'

// Config Imports
import { i18n } from './utils/configs/i18n'
import { getLocalizedUrl, isUrlMissingLocale } from './utils/helpers/i18n'
import { ensurePrefix } from './utils/helpers/string'

// Util Imports

// Constants
const HOME_PAGE_URL = '/dashboard'

const getLocale = (request: NextRequest): string | undefined => {
  // Try to get locale from URL
  const urlLocale = i18n.locales.find(locale => request.nextUrl.pathname.startsWith(`/${locale}`))

  if (urlLocale) return urlLocale

  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}

  request.headers.forEach((value: any, key: any) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localmatcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

const localizedRedirect = (url: string, locale: string | undefined, request: NextRequestWithAuth) => {
  let _url = url

  const isLocaleMissing = isUrlMissingLocale(_url)

  if (isLocaleMissing) {
    // e.g. incoming request is /products
    // The new URL is now /en/products
    _url = getLocalizedUrl(_url, locale ?? i18n.defaultLocale)
  }

  let _basePath = process.env.BASEPATH ?? ''

  _basePath = _basePath.replace('demo-1', request.headers.get('X-server-header') ?? 'demo-1')

  _url = ensurePrefix(_url, `${_basePath ?? ''}`)

  const redirectUrl = new URL(_url, request.url).toString()

  return NextResponse.redirect(redirectUrl)
}

export default withAuth(async function middleware(request: NextRequestWithAuth) {}, {
  callbacks: {
    authorized: () => {
      // This is a work-around for handling redirect on auth pages.
      // We return true here so that the middleware function above
      // is always called.
      return true
    }
  }
})

// Matcher Config
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - all items inside the public folder
     *    - images (public images)
     *    - next.svg (Next.js logo)
     *    - vercel.svg (Vercel logo)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|next.svg|vercel.svg).*)'
  ]
}
