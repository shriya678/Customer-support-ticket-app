import type { NewCommentInput, Ticket } from '../types/ticket'
import { formatDateTime } from '../utils/format'
import CommentForm from './CommentForm'
import CommentThread from './CommentThread'
import StatusBadge from './StatusBadge'

interface TicketDetailProps {
  ticket: Ticket
  onBack: () => void
  onAddComment: (input: NewCommentInput) => void
}

function TicketDetail({ ticket, onBack, onAddComment }: TicketDetailProps) {
  return (
    <article>
      <button type="button" className="btn" onClick={onBack}>
        ← Back to tickets
      </button>

      <div className="card detail">
        <div className="detail-title">
          <h2>{ticket.title}</h2>
          <StatusBadge status={ticket.status} />
        </div>

        <dl className="detail-fields">
          <dt>Customer</dt>
          <dd>{ticket.customerName}</dd>
          <dt>Order number</dt>
          <dd>{ticket.orderNumber}</dd>
          <dt>Phone number</dt>
          <dd>{ticket.phoneNumber}</dd>
          <dt>Created</dt>
          <dd>{formatDateTime(ticket.createdAt)}</dd>
          {ticket.resolvedAt && (
            <>
              <dt>Resolved</dt>
              <dd>{formatDateTime(ticket.resolvedAt)}</dd>
            </>
          )}
        </dl>

        <h3>Description</h3>
        <p className="description">{ticket.description}</p>
      </div>

      <section className="card">
        <h3>Comments ({ticket.comments.length})</h3>
        <CommentThread comments={ticket.comments} />
        <CommentForm onSubmit={onAddComment} />
      </section>
    </article>
  )
}

export default TicketDetail
