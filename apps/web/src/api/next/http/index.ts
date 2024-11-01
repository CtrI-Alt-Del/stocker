import { cookies as NextCookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'
import type { UserDto } from '@stocker/core/dtos'
import { BROWSER_ENV, COOKIES } from '@/constants'
import { jwtDecode } from 'jwt-decode'

type Cookie = {
  key: string
  value: string
  duration: number
}

type Header = {
  key: string
  value: string
}

export const NextHttp = (request: NextRequest): IHttp => {
  const cookies: Cookie[] = []
  const headers: Header[] = []

  return {
    send(data: unknown, statusCode = HTTP_STATUS_CODE.ok) {
      const response = NextResponse.json(data, { status: statusCode })

      if (cookies.length) {
        for (const cookie of cookies)
          response.cookies.set(cookie.key, cookie.value, {
            path: '/',
            httpOnly: true,
            maxAge: cookie.duration,
          })
      }

      if (headers.length) {
        for (const header of headers) response.headers.set(header.key, header.value)
      }

      return response
    },

    pass() {
      return
    },

    redirect(route) {
      const url = new URL(route, request.url)
      const response = NextResponse.redirect(url)

      if (cookies.length) {
        for (const cookie of cookies)
          response.cookies.set(cookie.key, cookie.value, {
            path: '/',
            httpOnly: false,
            maxAge: cookie.duration,
          })
      }

      if (headers.length) {
        for (const header of headers) response.headers.set(header.key, header.value)
      }

      return response
    },

    setHeader(key: string, value: string) {
      headers.push({ key, value })
    },

    setCookie(key: string, value: string, duration: number) {
      cookies.push({
        key,
        value,
        duration,
      })
    },

    getCookie<Data>(key: string) {
      const cookie = NextCookies().get(key)
      return cookie?.value ? (JSON.stringify(cookie.value) as Data) : null
    },

    async setJwt(userDto: UserDto): Promise<string> {
      throw new Error('Method not implemented')
    },

    async getUser(): Promise<UserDto> {
      const jwt = this.getCookie<string>(COOKIES.jwt.key)
      return jwt ? jwtDecode<UserDto>(jwt) : ({} as UserDto)
    },

    getCurrentRoute() {
      return `${request.url.split(BROWSER_ENV.appUrl)[1]}`
    },

    getQueryParams<QueryParams>(): QueryParams {
      const searchParams = Object.entries(new URL(request.url).searchParams)
      let queryParams = {}

      for (const [key, value] of searchParams) {
        queryParams = { ...queryParams, [key]: value }
      }

      return queryParams as QueryParams
    },

    verifyJwt() {
      throw new Error('Method not implemented')
    },

    destroyJwt() {
      throw new Error('Method not implemented')
    },

    async getImageFile() {
      throw new Error('Method not implemented')
    },

    getBody<Body>(): Body {
      return request.body as Body
    },

    getRouteParams() {
      throw new Error('Method not implemented')
    },

    getFile() {
      throw new Error('Method not implemented')
    },
  }
}
