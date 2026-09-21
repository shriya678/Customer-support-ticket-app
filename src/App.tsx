import { useState } from 'react'
import TicketForm from './components/TicketForm'
import { createTicket } from './services/ticketService'
import type { NewTicketInput, Ticket } from './types/ticket'

type View = 'home' | 'create'

function App() {
  const [view, setView] = useState<View>('home')
  const [createdTicket, setCreatedTicket] = useState<Ticket | null>(null)

  function handleCreate(input: NewTicketInput) {
    const ticket = createTicket(input)
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
            {/* Replaced by the ticket list in Iteration 3. */}
            <p className="muted">The ticket list is coming in the next iteration.</p>
          </>
        )}
      </main>
    </div>
  )
}

export default App
