export type Tier = 'pole' | 'podium' | 'points' | 'midfield' | 'back' | 'safety'

/** Indicative reference reaction times (ms), no real drivers. */
export const REFERENCE_MS = [175, 200, 220, 245, 270, 300, 335, 400, 600]

/**
 * Level of each grid slot. The level belongs to the POSITION, not to a reference time, so it
 * stays correct when the player's own time shifts the reference rows down:
 * P1 pole, P2-P3 podium, P4-P5 points, P6-P7 midfield, P8-P9 back, P10 safety car.
 */
export const SLOT_TIERS: Tier[] = ['pole', 'podium', 'podium', 'points', 'points', 'midfield', 'midfield', 'back', 'back', 'safety']

export type GridRow = { ms: number; you: boolean; tier: Tier }

/** The 10-row starting grid with the player's time inserted at its position. */
export function buildGrid(time: number): { position: number; tier: Tier; rows: GridRow[] } {
  const position = REFERENCE_MS.filter(ms => ms <= time).length + 1 // a tie puts you behind the reference
  const times = [...REFERENCE_MS.map(ms => ({ ms, you: false })), { ms: time, you: true }]
    .sort((a, b) => a.ms - b.ms || (a.you ? 1 : -1))
  const rows = times.map((r, i) => ({ ...r, tier: SLOT_TIERS[i] }))
  return { position, tier: SLOT_TIERS[position - 1], rows }
}
