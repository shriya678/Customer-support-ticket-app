# Logical Data Model

There is no relational database; data is stored as JSON in localStorage (key `support-tickets:v1`), with each ticket embedding its comments. The diagram shows the logical relationship.

```mermaid
erDiagram
    TICKET ||--o{ COMMENT : contains

    TICKET {
        string id PK
        string title
        string description
        string customerName
        string orderNumber
        string phoneNumber
        string status "open | resolved"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
        string resolvedAt "ISO 8601, optional"
    }

    COMMENT {
        string id PK
        string author
        string text
        string createdAt "ISO 8601"
    }
```

## Ticket
| Field | Notes |
|-------|-------|
| id | UUID |
| title | short, required |
| description | required |
| customerName | required |
| orderNumber | required |
| phoneNumber | required, 7–15 digits |
| status | `open` on creation, `resolved` after resolution |
| comments | array of Comment (embedded) |
| createdAt / updatedAt | ISO timestamps; `updatedAt` changes on comment or resolve |
| resolvedAt | set when resolved; absent while open |

## Comment
| Field | Notes |
|-------|-------|
| id | UUID |
| author | free text |
| text | required |
| createdAt | ISO timestamp, set automatically |

A ticket has zero or more comments; a comment belongs to exactly one ticket.
