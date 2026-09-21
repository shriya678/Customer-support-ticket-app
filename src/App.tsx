import { useState } from 'react'
import TicketDetail from './components/TicketDetail'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import { addComment, createTicket, getTickets } from './services/ticketService'
import type { NewCommentInput, NewTicketInput, Ticket } from './types/ticket'

type View = { name: 'list' } | { name: 'create' } | { name: 'detail'; ticketId: string }

function App() {
  const [view, setView] = useState<View>({ name: 'list' })
  const [tickets, setTickets] = useState<Ticket[]>(getTickets)
  const [createdTicket, setCreatedTicket] = useState<Ticket | null>(null)

  function showList() {
    setView({ name: 'list' })
  }

  function handleCreate(input: NewTicketInput) {
    const ticket = createTicket(input)
    setTickets(getTickets())
    setCreatedTicket(ticket)
    showList()
  }

  function openCreateForm() {
    setCreatedTicket(null)
    setView({ name: 'create' })
  }

  function openTicket(ticketId: string) {
    setCreatedTicket(null)
    setView({ name: 'detail', ticketId })
  }

  function handleAddComment(ticketId: string, input: NewCommentInput) {
    if (!addComment(ticketId, input)) throw new Error('Ticket not found')
    setTickets(getTickets())
  }

  function renderDetail(ticketId: string) {
    const ticket = tickets.find((t) => t.id === ticketId)
    if (!ticket) {
      return (
        <div className="card empty-state">
          <p>Ticket not found.</p>
          <p className="muted">It may have been removed from browser storage.</p>
          <button type="button" className="btn" onClick={showList}>
            Back to tickets
          </button>
        </div>
      )
    }
    return (
      <TicketDetail
        ticket={ticket}
        onBack={showList}
        onAddComment={(input) => handleAddComment(ticket.id, input)}
      />
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Customer Support Tickets</h1>
        {view.name === 'list' && (
          <button type="button" className="btn btn-primary" onClick={openCreateForm}>
            New ticket
          </button>
        )}
      </header>
      <main>
        {view.name === 'create' && <TicketForm onSubmit={handleCreate} onCancel={showList} />}
        {view.name === 'detail' && renderDetail(view.ticketId)}
        {view.name === 'list' && (
          <>
            {createdTicket && (
              <p className="banner banner-success" role="status">
                Ticket created: <strong>{createdTicket.title}</strong>
              </p>
            )}
            <TicketList tickets={tickets} onOpen={openTicket} />
          </>
        )}
      </main>
    </div>
  )
}

export default App
