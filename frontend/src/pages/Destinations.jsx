const routes = [
  {
    name: 'Caspian Curve',
    region: 'North coast',
    days: '4–6 days',
    note: 'Forest roads, tea houses, and soft sea light along the shoreline.',
    tone: 'lime',
  },
  {
    name: 'Desert Line',
    region: 'Central plateau',
    days: '5–7 days',
    note: 'Wide horizons, adobe towns, and evenings under a clear sky.',
    tone: 'navy',
  },
  {
    name: 'Mountain Pass',
    region: 'Alborz foothills',
    days: '3–5 days',
    note: 'Cool air, switchback views, and villages tucked into the slopes.',
    tone: 'mist',
  },
  {
    name: 'Heritage Loop',
    region: 'Historic cities',
    days: '6–8 days',
    note: 'Courtyards, bazaars, and architecture that still sets the pace.',
    tone: 'sand',
  },
]

export default function Destinations() {
  return (
    <main className="page">
      <header className="page__header">
        <p className="eyebrow">Destinations</p>
        <h1>Routes with a clear character</h1>
        <p>
          Each path is paced for discovery — enough structure to move with
          confidence, enough space to wander.
        </p>
      </header>

      <ol className="routes">
        {routes.map((route, index) => (
          <li key={route.name} className={`routes__item tone-${route.tone}`}>
            <div className="routes__index">{String(index + 1).padStart(2, '0')}</div>
            <div className="routes__body">
              <div className="routes__meta">
                <span>{route.region}</span>
                <span>{route.days}</span>
              </div>
              <h2>{route.name}</h2>
              <p>{route.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  )
}
