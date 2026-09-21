import type { NewTicketInput } from '../types/ticket'

export type TicketFormErrors = Partial<Record<keyof NewTicketInput, string>>

export const TITLE_MAX_LENGTH = 100
const PHONE_MIN_DIGITS = 7
const PHONE_MAX_DIGITS = 15
// Optional leading "+", then digits with common separators.
const PHONE_FORMAT = /^\+?[\d\s().-]+$/

export function validatePhoneNumber(value: string): string | undefined {
  const phone = value.trim()
  if (!phone) return 'Phone number is required.'
  if (!PHONE_FORMAT.test(phone)) {
    return 'Use only digits, spaces, and + ( ) - . characters.'
  }
  const digitCount = phone.replace(/\D/g, '').length
  if (digitCount < PHONE_MIN_DIGITS || digitCount > PHONE_MAX_DIGITS) {
    return `Phone number must have ${PHONE_MIN_DIGITS}-${PHONE_MAX_DIGITS} digits.`
  }
  return undefined
}

/** Returns an error message per invalid field. An empty object means the input is valid. */
export function validateTicketInput(input: NewTicketInput): TicketFormErrors {
  const errors: TicketFormErrors = {}

  const title = input.title.trim()
  if (!title) errors.title = 'Title is required.'
  else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Title must be ${TITLE_MAX_LENGTH} characters or fewer.`
  }

  if (!input.description.trim()) errors.description = 'Description is required.'
  if (!input.customerName.trim()) errors.customerName = 'Customer name is required.'
  if (!input.orderNumber.trim()) errors.orderNumber = 'Order number is required.'

  const phoneError = validatePhoneNumber(input.phoneNumber)
  if (phoneError) errors.phoneNumber = phoneError

  return errors
}
