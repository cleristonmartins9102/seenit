import { type HttpResponse } from './http'

export const badRequest = (error: Error): HttpResponse => ({ statusCode: 400, body: { error: error.message } })
export const ok = (body: unknown): HttpResponse => ({ statusCode: 200, body })
export const created = (body: unknown): HttpResponse => ({ statusCode: 201, body })
