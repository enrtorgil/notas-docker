import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'

export default function Form() {
    const { id } = useParams()
    const editing = Boolean(id)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (editing) {
            api(`/notes/${id}`)
                .then(r => { setTitle(r.data.title || ''); setContent(r.data.content || '') })
                .catch(() => alert('No se pudo cargar la nota'))
        }
    }, [id, editing])

    async function onSubmit(e) {
        e.preventDefault()
        setErrors({})
        if (!title.trim()) {
            setErrors({ title: ['El título es obligatorio'] })
            return
        }
        setLoading(true)
        try {
            if (editing) {
                await api(`/notes/${id}`, { method: 'PUT', body: { title, content } })
            } else {
                await api('/notes', { method: 'POST', body: { title, content } })
            }
            navigate('/')
        } catch (err) {
            setErrors(err?.errors || {})
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="form">
            <h2 style={{ margin: '10px 0' }}>{editing ? 'Editar nota' : 'Nueva nota'}</h2>

            <label className="label">Título *</label>
            <input
                className={`input ${errors.title ? 'error-border' : ''}`}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Escribe el título…"
                required
            />
            {errors.title && <div className="error-text">{errors.title[0]}</div>}

            <label className="label">Contenido</label>
            <textarea
                className="textarea"
                rows={6}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Texto opcional…"
            />

            <div className="form-actions">
                <button type="button" className="btn" onClick={() => navigate('/')}>
                    ←
                </button>
                <button type="submit" className="btn primary" disabled={loading}>
                    {editing ? 'Guardar' : 'Crear'}
                </button>
            </div>
        </form>
    )
}
