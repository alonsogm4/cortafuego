import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { TIMELINE } from '../engine/types'
import { Topbar } from './Topbar'

describe('Cortafuego creator credits', () => {
  const html = renderToStaticMarkup(
    <Topbar subtitle="Escenario histórico" timeline={TIMELINE.VINA_2024} onTimeline={() => {}} offline />,
  )

  it('offers the About dialog even without scenario sources', () => {
    expect(html).toContain('aria-label="Acerca de Cortafuego" aria-haspopup="dialog"')
    expect(html).toMatch(/<dialog[^>]+aria-labelledby="about-title"/)
    expect(html).toContain('<h2 id="about-title">Acerca de Cortafuego</h2>')
  })

  it.each([
    ['Alonso Felipe Gac Monárdez', 'alonsogm4'],
    ['Anaís Neira Zúñiga', 'chichitaocss'],
    ['José Rodolfo Cañete López', 'josecannete'],
  ])('links %s to the matching GitHub profile', (name, github) => {
    expect(html).toContain(`<a href="https://github.com/${github}" target="_blank" rel="noreferrer"><span>${name}</span>`)
  })
})
