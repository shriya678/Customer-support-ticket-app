# Approach

## Technology choices
- **React + TypeScript** — required by the assessment; strict typing for the data model.
- **Vite** — fast setup and build, minimal config.
- **oxlint** — lint tool shipped with the current Vite template.
- **Plain CSS** — visual polish is secondary; no UI library needed.
- No router or state library: the app has three views, handled with a small `view` state in `App`.

## Why localStorage
The assessment asks for persistence but discourages a backend. localStorage is synchronous, dependency-free and enough for a single-user demo. Trade-off: data is per-browser and limited in size.

## Component architecture (planned)
`App` → `TicketList` (`TicketListItem`, `StatusFilter`, `StatusBadge`), `TicketForm`, `TicketDetail` (`CommentThread`, `CommentForm`, `StatusBadge`). Components are small and presentational where possible.

## State / data flow
`ticketService` is the only module that reads/writes localStorage. A `useTickets` hook loads tickets into React state and exposes actions that call the service and refresh state. Components receive data and callbacks via props. Data flows one way: UI event → hook action → service → localStorage → updated state → re-render.

## Validation
Pure functions in `utils/validation.ts` return a map of field → error message. The form shows errors on submit and clears them as the user edits. Rules: required fields non-empty after trimming; phone 7–15 digits. Comments must have non-empty text and author.

## Error handling
- Reading localStorage uses try/catch with a safe fallback to an empty list.
- Writes are wrapped so quota/serialization errors surface as a visible message rather than a crash.
- Missing ticket id shows a "ticket not found" state.

## Trade-offs
- Comments embedded in the ticket (simple, atomic writes) rather than a separate store.
- No router: URLs aren't shareable and refresh returns to the list. Acceptable for the scope.
- IDs via `crypto.randomUUID()`.

## What would change in production
Backend API + real database (tickets and comments as related tables), authentication and per-user authorship, server-side timestamps and validation, routing with shareable URLs, pagination/search, automated tests, optimistic updates and proper error/loading states, accessibility audit.
