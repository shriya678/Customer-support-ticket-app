import type { TicketFilter } from '../types/ticket'

interface StatusFilterProps {
  value: TicketFilter
  counts: Record<TicketFilter, number>
  onChange: (filter: TicketFilter) => void
}

const OPTIONS: { value: TicketFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'resolved', label: 'Resolved' },
]

function StatusFilter({ value, counts, onChange }: StatusFilterProps) {
  return (
    <div className="filter-tabs" role="group" aria-label="Filter tickets by status">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`filter-tab${option.value === value ? ' filter-tab-active' : ''}`}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label} ({counts[option.value]})
        </button>
      ))}
    </div>
  )
}

export default StatusFilter
