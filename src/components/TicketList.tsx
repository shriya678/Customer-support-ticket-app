import type { Ticket } from '../types/ticket'
import { formatDate } from '../utils/format'
import StatusBadge from './StatusBadge'

interface TicketListProps {
  tickets: Ticket[]
  onOpen: (ticketId: string) => void
}

function TicketList({ tickets, onOpen }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="card empty-state">
        <p>No tickets yet.</p>
        <p className="muted">Use “New ticket” to log the first customer issue.</p>
      </div>
    )
  }

  return (
    <ul className="ticket-list">
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <button type="button" className="ticket-row" onClick={() => onOpen(ticket.id)}>
            <span className="ticket-row-main">
              <span className="ticket-row-title">{ticket.title}</span>
              <StatusBadge status={ticket.status} />
            </span>
            <span className="ticket-row-meta">
              {ticket.customerName} · Order {ticket.orderNumber} · Created{' '}
              {formatDate(ticket.createdAt)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TicketList
