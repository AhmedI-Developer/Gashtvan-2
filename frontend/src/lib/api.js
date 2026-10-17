import axios from 'axios'
import { apiBase } from '@/config/site'

/** Shared Axios client for the Laravel API (`/api` in dev via Vite proxy). */
export const api = axios.create({
  baseURL: 'https://gashtvan.ahmed-dev.org/api',
  headers: {
    Accept: 'application/json',
  },
  timeout: 25000,
})

export function unwrapList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  return payload?.offers || payload?.news || []
}

export function unwrapItem(payload) {
  if (!payload || typeof payload !== 'object') return payload
  if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
    return payload.data
  }
  return payload
}
