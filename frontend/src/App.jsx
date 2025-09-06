import { Outlet, Link, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()
  const showNew = !(pathname.startsWith('/new') || pathname.startsWith('/edit'))

  return (
    <div className="container">
      <header className="row" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Notas</h1>
        {showNew && <Link to="/new" className="btn">Nueva nota</Link>}
      </header>
      <Outlet />
    </div>
  )
}
