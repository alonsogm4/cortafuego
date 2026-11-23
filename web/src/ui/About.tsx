import { useRef } from 'react'

const creators = [
  { name: 'Alonso Felipe Gac Monárdez', github: 'alonsogm4' },
  { name: 'Anaís Neira Zúñiga', github: 'chichitaocss' },
  { name: 'José Rodolfo Cañete López', github: 'josecannete' },
]

export function About() {
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        className="btn ghost about-btn"
        aria-label="Acerca de Cortafuego"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <span className="long">Acerca de</span>
        <svg className="short" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 7.5v3.75" strokeLinecap="round" />
          <circle cx="8" cy="5" r=".8" fill="currentColor" stroke="none" />
        </svg>
      </button>
      <dialog ref={dialog} className="modal about-modal" aria-labelledby="about-title" onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}>
        <div className="modal-body">
          <div className="modal-head">
            <h2 id="about-title">Acerca de Cortafuego</h2>
            <button type="button" className="btn small ghost" onClick={() => dialog.current?.close()}>
              Cerrar
            </button>
          </div>
          <p>Un simulador de incendios y evacuación para explorar escenarios y planificar la prevención.</p>
          <h3>Creadores</h3>
          <ul className="about-creators">
            {creators.map(({ name, github }) => (
              <li key={github}>
                <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
                  <span>{name}</span>
                  <span className="small muted">GitHub: @{github}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  )
}
