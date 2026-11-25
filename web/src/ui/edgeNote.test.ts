import { describe, expect, it } from 'vitest'
import { edgeContact } from '../engine/fire/edge'
import { edgeNote, edgeSides, edgeStatNote } from './edgeNote'

const T0 = '2025-02-08T12:00:00-03:00'

function contact(set: [number, number, number][]) {
  const rows = 4
  const cols = 5
  const a = new Float32Array(rows * cols).fill(Infinity)
  for (const [r, c, t] of set) a[r * cols + c] = t
  return edgeContact(rows, cols, a)
}

describe('edge copy', () => {
  it('says nothing when the fire stays inside', () => {
    const e = contact([[1, 1, 10]])
    expect(edgeNote(e, T0, Infinity)).toBeNull()
    expect(edgeStatNote(e, T0)).toBeNull()
  })

  it('names one side and its local time', () => {
    const e = contact([[0, 2, 561]])
    expect(edgeNote(e, T0, 561)).toBe('El fuego llega al borde norte del área simulada a las 21:21.')
    expect(edgeStatNote(e, T0)).toBe('Sin lo que quemaría fuera del área simulada: el fuego llega a su borde a las 21:21.')
  })

  it('lists several sides, earliest first', () => {
    // East at 13:00, north at 14:30, then the south-west corner (south and west) at 15:00.
    const e = contact([[1, 4, 60], [0, 2, 150], [3, 0, 180]])
    expect(edgeSides(e, T0).map((s) => s.side)).toEqual(['este', 'norte', 'sur', 'oeste'])
    expect(edgeNote(e, T0, 180)).toBe('El fuego llega a los bordes del área simulada: este a las 13:00, norte a las 14:30, sur a las 15:00 y oeste a las 15:00.')
  })

  it('shows the map note only once the clock reaches the contact, side by side', () => {
    const e = contact([[1, 4, 60], [0, 2, 150]])
    expect(edgeNote(e, T0, 0)).toBeNull()
    expect(edgeNote(e, T0, 59.9)).toBeNull()
    expect(edgeNote(e, T0, 60)).toBe('El fuego llega al borde este del área simulada a las 13:00.')
    expect(edgeNote(e, T0, 149)).toBe('El fuego llega al borde este del área simulada a las 13:00.')
    expect(edgeNote(e, T0, 150)).toBe('El fuego llega a los bordes del área simulada: este a las 13:00 y norte a las 14:30.')
    // the line under the final burned area does not depend on the clock
    expect(edgeStatNote(e, T0)).toBe('Sin lo que quemaría fuera del área simulada: el fuego llega a su borde a las 13:00.')
  })

  it('adds the date when the contact falls on a later day than the start', () => {
    // 12:00 + 20 h 42 min = 08:42 the next morning.
    const e = contact([[0, 2, 20 * 60 + 42]])
    expect(edgeNote(e, T0, 24 * 60)).toBe('El fuego llega al borde norte del área simulada a las 08:42 del 9 feb 2025.')
    expect(edgeStatNote(e, T0)).toBe('Sin lo que quemaría fuera del área simulada: el fuego llega a su borde a las 08:42 del 9 feb 2025.')
  })
})
