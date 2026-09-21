function parseDate(iso: string): Date | undefined {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? undefined : date
}

/** e.g. "21 Sep 2026" */
export function formatDate(iso: string): string {
  const date = parseDate(iso)
  return date ? date.toLocaleDateString(undefined, { dateStyle: 'medium' }) : 'Unknown date'
}

/** e.g. "21 Sep 2026, 14:05" */
export function formatDateTime(iso: string): string {
  const date = parseDate(iso)
  return date
    ? date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : 'Unknown date'
}
