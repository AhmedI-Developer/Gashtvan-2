import { apiBase } from '@/config/site'

const TOKEN_KEY = 'gashtvan-admin-token'

export function getAdminToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAdminToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

export class AdminApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message)
    this.name = 'AdminApiError'
    this.status = status
    this.errors = errors || {}
  }
}

async function parseBody(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function firstError(payload) {
  if (!payload || typeof payload !== 'object') return null
  if (typeof payload.message === 'string') return payload.message
  const errors = payload.errors
  if (!errors || typeof errors !== 'object') return null
  const first = Object.values(errors)[0]
  return Array.isArray(first) ? first[0] : String(first)
}

export async function adminRequest(path, { method = 'GET', body, token, formData } = {}) {
  const headers = {
    Accept: 'application/json',
  }
  const auth = token ?? getAdminToken()
  if (auth) headers.Authorization = `Bearer ${auth}`

  const init = { method, headers }
  if (formData) {
    init.body = formData
  } else if (body != null) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  const res = await fetch(`${apiBase}${path}`, init)
  const payload = await parseBody(res)

  if (!res.ok) {
    throw new AdminApiError(firstError(payload) || `Request failed (${res.status})`, {
      status: res.status,
      errors: payload?.errors || {},
    })
  }

  return payload
}

export function unwrapList(payload) {
  if (Array.isArray(payload)) return payload
  return payload?.data || []
}

export function unwrapItem(payload) {
  return payload?.data ?? payload
}

/* —— Auth —— */
export function loginAdmin(email, password) {
  return adminRequest('/admin/login', {
    method: 'POST',
    body: { email, password },
    token: null,
  })
}

export function fetchAdminMe() {
  return adminRequest('/admin/me')
}

export function logoutAdmin() {
  return adminRequest('/admin/logout', { method: 'POST' })
}

/* —— Offers —— */
export function fetchAdminOffers() {
  return adminRequest('/admin/offers').then(unwrapList)
}

export function fetchAdminOffer(id) {
  return adminRequest(`/admin/offers/${id}`).then(unwrapItem)
}

export function createAdminOffer(formData) {
  return adminRequest('/admin/offers', { method: 'POST', formData }).then(unwrapItem)
}

export function updateAdminOffer(id, formData) {
  formData.append('_method', 'PUT')
  return adminRequest(`/admin/offers/${id}`, { method: 'POST', formData }).then(unwrapItem)
}

export function deleteAdminOffer(id) {
  return adminRequest(`/admin/offers/${id}`, { method: 'DELETE' })
}

/* —— Destinations / flight fares —— */
export function fetchAdminFares() {
  return adminRequest('/admin/fares').then(unwrapList)
}

export function fetchAdminFare(id) {
  return adminRequest(`/admin/fares/${id}`).then(unwrapItem)
}

export function createAdminFare(body) {
  return adminRequest('/admin/fares', { method: 'POST', body }).then(unwrapItem)
}

export function updateAdminFare(id, body) {
  return adminRequest(`/admin/fares/${id}`, { method: 'PUT', body }).then(unwrapItem)
}

export function deleteAdminFare(id) {
  return adminRequest(`/admin/fares/${id}`, { method: 'DELETE' })
}

export const OFFER_CATEGORIES = [
  { value: 'ticket', label: 'Tickets' },
  { value: 'hotel', label: 'Hotels' },
  { value: 'visa', label: 'Visa' },
]

export const OFFER_INCLUDES = [
  { value: 'ticket', label: 'Flight ticket' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'visa', label: 'Visa' },
  { value: 'tour', label: 'Tour' },
  { value: 'transfer', label: 'Transfer' },
]

export const TRIP_TYPES = [
  { value: 'round_trip', label: 'Round trip' },
  { value: 'one_way', label: 'One way' },
]

export const CABINS = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium_economy', label: 'Premium economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' },
]
