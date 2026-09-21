import { useState } from 'react'
import TicketForm from './components/TicketForm'
import { createTicket, getTickets } from './services/ticketService'
import type { NewTicketInput, Ticket } from './types/ticket'

type View = 'home' | 'create'

function App() {
  const [view, setView] = useState<View>('home')
  const [tickets, setTickets] = useState<Ticket[]>(getTickets)
  const [createdTicket, setCreatedTicket] = useState<Ticket | null>(null)

  function handleCreate(input: NewTicketInput) {
    const ticket = createTicket(input)
    setTickets(getTickets())
    setCreatedTicket(ticket)
    setView('home')
  }

  function openCreateForm() {
    setCreatedTicket(null)
    setView('create')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Customer Support Tickets</h1>
        {view === 'home' && (
          <button type="button" className="btn btn-primary" onClick={openCreateForm}>
            New ticket
          </button>
        )}
      </header>
      <main>
        {view === 'create' && (
          <TicketForm onSubmit={handleCreate} onCancel={() => setView('home')} />
        )}
        {view === 'home' && (
          <>
            {createdTicket && (
              <p className="banner banner-success" role="status">
                Ticket created: <strong>{createdTicket.title}</strong>
              </p>
            )}
            {/* Minimal read-back of saved tickets; replaced by the full list in Iteration 3. */}
            {tickets.length === 0 ? (
              <p className="muted">No tickets yet.</p>
            ) : (
              <ul className="simple-list">
                {tickets.map((ticket) => (
                  <li key={ticket.id}>
                    <strong>{ticket.title}</strong> — {ticket.customerName}, order {ticket.orderNumber}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
