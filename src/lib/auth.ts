import { cookies } from 'next/headers'

const SESSION_COOKIE = 'admin_session'
const SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 hours

function getAdminCreds() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[AUTH ERROR] ADMIN_EMAIL or ADMIN_PASSWORD environment variable is missing!')
    }
  }

  return { email: email || '', password: password || '' }
}

export async function createSession(): Promise<string> {
  const { randomBytes } = await import('node:crypto')
  const token = randomBytes(32).toString('hex')
  const expires = Date.now() + SESSION_DURATION
  const c = await cookies()
  c.set(SESSION_COOKIE, `${token}:${expires}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION / 1000,
  })
  return token
}

export async function validateSession(): Promise<boolean> {
  const c = await cookies()
  const session = c.get(SESSION_COOKIE)?.value
  if (!session) return false
  const parts = session.split(':')
  if (parts.length !== 2) return false
  const expires = parseInt(parts[1], 10)
  if (isNaN(expires) || Date.now() > expires) {
    c.delete(SESSION_COOKIE)
    return false
  }
  return true
}

export async function destroySession() {
  const c = await cookies()
  c.delete(SESSION_COOKIE)
}

export function validateCredentials(email: string, password: string): boolean {
  const creds = getAdminCreds()
  if (!creds.email || !creds.password) {
    return false
  }
  return email === creds.email && password === creds.password
}

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ''

