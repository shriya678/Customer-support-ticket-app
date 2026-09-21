import type { Comment, NewCommentInput, NewTicketInput, Ticket } from '../types/ticket'

const STORAGE_KEY = 'support-tickets:v1'
const AUTHOR_KEY = 'support-tickets:comment-author'

/** Fields of a ticket that callers may change through updateTicket. */
export type TicketChanges = Partial<
  Omit<Ticket, 'id' | 'comments' | 'createdAt' | 'updatedAt'>
>

function readTickets(): Ticket[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Ticket[]) : []
  } catch {
    // Missing, blocked or corrupt storage should not crash the app.
    return []
  }
}

/** Throws if the browser rejects the write (e.g. storage quota exceeded). */
function writeTickets(tickets: Ticket[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
}

/** Applies `change` to the ticket with `id`, saves, and returns it. Undefined if not found. */
function modifyTicket(id: string, change: (ticket: Ticket) => Ticket): Ticket | undefined {
  const tickets = readTickets()
  const index = tickets.findIndex((ticket) => ticket.id === id)
  if (index === -1) return undefined

  const updated = change(tickets[index])
  tickets[index] = updated
  writeTickets(tickets)
  return updated
}

/** All tickets, newest first. */
export function getTickets(): Ticket[] {
  return readTickets().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function getTicketById(id: string): Ticket | undefined {
  return readTickets().find((ticket) => ticket.id === id)
}

export function createTicket(input: NewTicketInput): Ticket {
  const now = new Date().toISOString()
  const ticket: Ticket = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    description: input.description.trim(),
    customerName: input.customerName.trim(),
    orderNumber: input.orderNumber.trim(),
    phoneNumber: input.phoneNumber.trim(),
    status: 'open',
    comments: [],
    createdAt: now,
    updatedAt: now,
  }
  writeTickets([...readTickets(), ticket])
  return ticket
}

/** Updates editable ticket fields. Returns the updated ticket, or undefined if not found. */
export function updateTicket(id: string, changes: TicketChanges): Ticket | undefined {
  return modifyTicket(id, (ticket) => ({
    ...ticket,
    ...changes,
    updatedAt: new Date().toISOString(),
  }))
}

/** Appends a comment to a ticket. Returns the updated ticket, or undefined if not found. */
export function addComment(ticketId: string, input: NewCommentInput): Ticket | undefined {
  const now = new Date().toISOString()
  const comment: Comment = {
    id: crypto.randomUUID(),
    author: input.author.trim(),
    text: input.text.trim(),
    createdAt: now,
  }
  return modifyTicket(ticketId, (ticket) => ({
    ...ticket,
    comments: [...ticket.comments, comment],
    updatedAt: now,
  }))
}

/**
 * Marks a ticket as resolved. Resolving an already-resolved ticket is a no-op
 * that returns the ticket unchanged. Returns undefined if not found.
 */
export function resolveTicket(id: string): Ticket | undefined {
  return modifyTicket(id, (ticket) => {
    if (ticket.status === 'resolved') return ticket
    const now = new Date().toISOString()
    return { ...ticket, status: 'resolved', resolvedAt: now, updatedAt: now }
  })
}

/** The author name last used for a comment, so the agent doesn't retype it. */
export function getSavedAuthor(): string {
  try {
    return localStorage.getItem(AUTHOR_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveAuthor(author: string): void {
  try {
    localStorage.setItem(AUTHOR_KEY, author)
  } catch {
    // Remembering the name is a convenience; ignore storage failures.
  }
}
