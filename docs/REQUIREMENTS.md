# Requirements

Source: take-home assessment "Customer Support Ticket App".

## Must-have (functional)
1. **Create ticket** with: short title, description, customer name, order number, phone number.
2. **View tickets**: list of tickets; open one to see its details.
3. **Comments**: thread on each ticket; each comment shows author, text, timestamp.
4. **Resolve tickets**: mark a ticket resolved; open vs resolved clearly distinguishable.

## Nice-to-have
- Filter the ticket list by status (All / Open / Resolved) — targeted for Iteration 5.
- Remember the comment author name between comments.

## Non-functional
- React + TypeScript (mandatory); Vite preferred.
- Persistence via localStorage (data survives refresh).
- Minimal dependencies; readable, sensibly structured code.
- Good basic UX: validation messages, empty states, clear button labels; usable on desktop and mobile.
- Clear documentation, including an honest AI usage note.
- Priorities: correctness → clean code → structure → UX → visual polish.

## Out of scope
- Authentication, user management, permissions
- Real database, backend/API
- Complex state management, unnecessary UI libraries
- Reopening tickets, editing/deleting tickets or comments, assignment, notifications
