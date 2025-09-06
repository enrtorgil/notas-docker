import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from '../pages/Form.jsx'

describe('Form', () => {
    beforeEach(() => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ data: { id: 1, title: 'x', content: '' }, message: null, errors: null })
        })
    })

    it('crea una nota (POST) con título', async () => {
        render(<MemoryRouter initialEntries={['/new']}><Form /></MemoryRouter>)
        await userEvent.type(screen.getByPlaceholderText(/título/i), 'Mi nota')
        await userEvent.click(screen.getByRole('button', { name: /crear/i }))

        await waitFor(() => expect(global.fetch).toHaveBeenCalled())
        const init = global.fetch.mock.calls[0][1]
        expect(JSON.parse(init.body).title).toBe('Mi nota')
    })
})