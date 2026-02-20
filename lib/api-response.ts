// /lib/api-response.ts
import { NextResponse } from 'next/server'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
) {
  return NextResponse.json(
    {
      success: true,
      data,
      message
    } as ApiResponse<T>,
    { status }
  )
}

export function errorResponse(
  error: string,
  status: number = 400
) {
  return NextResponse.json(
    {
      success: false,
      error
    } as ApiResponse<null>,
    { status }
  )
}

export function createdResponse<T>(
  data: T,
  message: string = 'Created successfully'
) {
  return successResponse(data, message, 201)
}

export function unauthorizedResponse(
  error: string = 'Unauthorized'
) {
  return errorResponse(error, 401)
}

export function forbiddenResponse(
  error: string = 'Forbidden'
) {
  return errorResponse(error, 403)
}

export function notFoundResponse(
  error: string = 'Not found'
) {
  return errorResponse(error, 404)
}
