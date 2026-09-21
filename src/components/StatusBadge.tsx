import type { TicketStatus } from '../types/ticket'

const LABELS: Record<TicketStatus, string> = {
  open: 'Open',
  resolved: 'Resolved',
}

function StatusBadge({ status }: { status: TicketStatus }) {
  return <span className={`badge badge-${status}`}>{LABELS[status]}</span>
}

export default StatusBadge
