// Drawing references for the blueprint sheets. Positions come from the list
// order, so the numbers stay stable as long as the ordering does.
// ponytail: derived, not stored — no schema change for a label.

const pad = (n: number) => String(n + 1).padStart(2, '0')

/** Projects live on sheet 05, blog entries on sheet 06. */
export const sheetNo = (section: '05' | '06', index: number) => `${section}.${pad(index)}`

export const drawingNo = (project: { year?: string }, index: number) =>
  `GR-PRJ-${project.year || '----'}-${pad(index)}`

export const entryNo = (post: { created_at?: string }, index: number) =>
  `GR-LOG-${post.created_at ? new Date(post.created_at).getFullYear() : '----'}-${pad(index)}`

/** Reading time at ~200 wpm, floored at one minute. */
export const readTime = (html?: string | null) => {
  const words = (html || '').replace(/<[^>]*>?/gm, ' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export const sheetDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
    : ''
