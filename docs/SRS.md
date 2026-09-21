# Software Requirements Specification (lightweight)

## 1. Purpose
Define what the Customer Support Ticket App must do so a support agent can track customer issues.

## 2. Scope
A single-page browser app. All data lives in the user's browser (localStorage). No server.

## 3. Actors
- **Support agent** — the only actor. No login; anyone opening the app is the agent.

## 4. Functional requirements
| ID | Requirement |
|----|-------------|
| FR-1 | The agent can create a ticket with title, description, customer name, order number and phone number. |
| FR-2 | Ticket creation validates input and shows field-level errors. |
| FR-3 | The agent can view a list of tickets showing title, customer, order number, status and created date. |
| FR-4 | The agent can open a ticket to see all its details and comments. |
| FR-5 | The agent can add a comment (author, text); the timestamp is set automatically. |
| FR-6 | Comments display chronologically as a thread. |
| FR-7 | The agent can mark an open ticket as resolved; resolving is not repeatable. |
| FR-8 | Open and resolved tickets are visually distinct. |
| FR-9 | The agent can filter the list by All / Open / Resolved. |
| FR-10 | Data persists across page refreshes. |

## 5. Non-functional requirements
- NFR-1: React + TypeScript; minimal dependencies.
- NFR-2: Works in current evergreen browsers; responsive layout.
- NFR-3: Corrupt or missing stored data must not crash the app.
- NFR-4: Clear empty states (no tickets, no comments, ticket not found).

## 6. Data requirements
See [ER-DIAGRAM.md](ER-DIAGRAM.md). Ticket: id, title, description, customerName, orderNumber, phoneNumber, status (`open` | `resolved`), comments, createdAt, updatedAt, resolvedAt (optional). Comment: id, author, text, createdAt.

## 7. Assumptions
- Comment author is free text (no user accounts).
- Phone numbers: 7–15 digits, optionally with `+`, spaces, `-`, `(`, `)`.
- Comments may still be added to resolved tickets; tickets cannot be reopened.
- Timestamps are ISO strings, displayed in the browser's locale.

## 8. Constraints
- localStorage only (~5 MB, per-browser, not shared between devices).
- Small scope: keep the implementation simple.

## 9. Out of scope
Authentication, users, permissions, backend/database, editing/deleting, reopening, notifications.
