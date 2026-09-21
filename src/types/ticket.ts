export type TicketStatus = 'open' | 'resolved'

export interface Comment {
  id: string
  author: string
  text: string
  createdAt: string // ISO 8601
}

export interface Ticket {
  id: string
  title: string
  description: string
  customerName: string
  orderNumber: string
  phoneNumber: string
  status: TicketStatus
  comments: Comment[]
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
  resolvedAt?: string // ISO 8601, set only when status is 'resolved'
}

/** Fields the agent provides when creating a ticket. */
export type NewTicketInput = Pick<
  Ticket,
  'title' | 'description' | 'customerName' | 'orderNumber' | 'phoneNumber'
>

/** Fields the agent provides when adding a comment. */
export type NewCommentInput = Pick<Comment, 'author' | 'text'>
