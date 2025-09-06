import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

const fmt = (iso) => new Date(iso).toLocaleString()

export default function List() {
    const [items, setItems] = useState([])
    const [q, setQ] = useState('')
    const [sortDesc, setSortDesc] = useState(true)
    const [page, setPage] = useState(1)
    const [pg, setPg] = useState({ current_page: 1, last_page: 1, total: 0 })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function load(search = q, p = page, keepOrder = false) {
        setLoading(true); setError(null)
        try {
            const r = await api(`/notes?q=${encodeURIComponent(search)}&page=${p}`)
            let arr = r.data.items || []
            if (!sortDesc && !keepOrder) arr = [...arr].reverse()
            setItems(arr)
            setPg(r.data.pagination)
            setPage(r.data.pagination.current_page)
        } catch {
            setError('Error cargando notas')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    function toggleSort() {
        setSortDesc(s => !s)
        setItems(s => [...s].reverse())
    }

    async function onDelete(id) {
        if (!confirm('¿Eliminar nota?')) return
        try {
            await api(`/notes/${id}`, { method: 'DELETE' })
            load(q, page, true)
        } catch {
            alert('Error al eliminar')
        }
    }

    return (
        <div>
            <div className="toolbar" style={{ flexWrap: 'nowrap' }}>
                <input
                    className="input"
                    placeholder="Buscar por título…"
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && load(e.target.value, 1)}
                    style={{ flex: '1 1 auto', width: 'auto', minWidth: 0 }}
                />

                <div style={{ display: 'flex', gap: 10, flex: '0 0 auto' }}>
                    <button className="btn" onClick={() => load(q, 1)} style={{ flex: '0 0 auto' }}>
                        Buscar
                    </button>
                    <button className="icon-btn" onClick={toggleSort} aria-label="Cambiar orden" title="Cambiar orden" style={{ flex: '0 0 auto' }}>
                        {sortDesc ? (
                            <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {loading && <p>Cargando…</p>}
            {error && <p>{error}</p>}
            {!loading && items.length === 0 && <p>Sin resultados.</p>}

            <ul className="grid" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {items.map(n => (
                    <li key={n.id} className="card">
                        <div className="row">
                            <div className="row" style={{ gap: 10 }}>
                                <span className="title">{n.title}</span>
                                <span className="meta">
                                    {fmt(n.created_at)}
                                    {n.updated_at && n.updated_at !== n.created_at && (
                                        <span>· editado {fmt(n.updated_at)}</span>
                                    )}
                                </span>
                            </div>
                            <div className="row" style={{ gap: 8 }}>
                                <Link to={`/edit/${n.id}`} className="icon-btn" aria-label="Editar" title="Editar">
                                    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                    </svg>
                                </Link>
                                <button onClick={() => onDelete(n.id)} className="icon-btn danger" aria-label="Borrar" title="Borrar">
                                    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6M14 11v6" />
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {n.content && (
                            <p className="clamp-4 break-words" title={n.content} style={{ marginTop: 8 }}>
                                {n.content}
                            </p>
                        )}
                    </li>
                ))}
            </ul>

            <div className="pagination">
                <button className="btn" disabled={page <= 1} onClick={() => load(q, page - 1)}>
                    ← Anterior
                </button>
                <span> Página {pg.current_page} de {pg.last_page} · Hay un total de {pg.total} notas </span>
                <button className="btn" disabled={page >= pg.last_page} onClick={() => load(q, page + 1)}>
                    Siguiente →
                </button>
            </div>
        </div>
    )
}
