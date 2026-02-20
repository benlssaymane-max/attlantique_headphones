// /lib/auth.ts
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface DecodedToken {
  id: number
  email: string
  role: string
}

export function verifyAuth(token: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret'
    ) as DecodedToken

    return decoded
  } catch (error) {
    return null
  }
}

export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

export function checkAdmin(decoded: DecodedToken): boolean {
  return decoded.role === 'ADMIN'
}
