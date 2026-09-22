# Approach

## Technology choices
- **React + TypeScript** — required by the assessment; strict typing for the data model.
- **Vite** — fast setup and build, minimal config.
- **oxlint** — lint tool shipped with the current Vite template.
- **Plain CSS** — visual polish is secondary; no UI library needed.
- No router or state library: the app has three views, handled with a small `view` state in `App`.

## Why localStorage
The assessment asks for persistence but discourages a backend. localStorage is synchronous, dependency-free and enough for a single-user demo. Trade-off: data is per-browser and limited in size.

## Component architecture
`App` owns the current view (`list` | `create` | `detail`), the tickets, and the status filter. It renders:
- `StatusFilter` + `TicketList` (rows use `StatusBadge`)
- `TicketForm`
- `TicketDetail` → `CommentThread`, `CommentForm`, `StatusBadge`

Each component has one job. Forms own their input and error state; everything else is props.

## State / data flow
`ticketService` is the only module that reads/writes the ticket data in localStorage. `App` holds the tickets in React state and re-reads them from the service after every change (create, comment, resolve). Components receive data and callbacks via props. Data flows one way: UI event → handler in `App` → service → localStorage → updated state → re-render. With this little state, a custom hook or state library would add indirection without benefit.

## Validation
Pure functions in `utils/validation.ts` return a map of field → error message. The form shows errors on submit and clears them as the user edits. Rules: required fields non-empty after trimming; title at most 100 characters; phone 7–15 digits with only `+ ( ) - .` and spaces as separators. Comments need a non-empty author and text. The service also trims input before saving.

## Error handling
- Reading localStorage uses try/catch with a safe fallback to an empty list. Entries that don't look like tickets are skipped.
- Writes can throw (e.g. quota exceeded). The forms and the Resolve button catch this and show a visible error instead of crashing.
- A missing ticket id shows a "Ticket not found" state.
- The remembered comment author is a convenience; its storage errors are ignored.

## Trade-offs
- Comments embedded in the ticket (simple, atomic writes) rather than a separate store.
- No router: URLs aren't shareable and refresh returns to the list. Acceptable for the scope.
- IDs via `crypto.randomUUID()`, which needs a secure context (`localhost` or HTTPS).
- `updateTicket` and `getTicketById` are part of the storage API requested in the brief but are not used by the UI yet.

## What would change in production
Backend API + real database (tickets and comments as related tables), authentication and per-user authorship, server-side timestamps and validation, routing with shareable URLs, pagination/search, automated tests, optimistic updates and proper error/loading states, accessibility audit.
