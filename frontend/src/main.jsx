import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import List from './pages/List.jsx'
import Form from './pages/Form.jsx'

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { index: true, element: <List /> },
      { path: 'new', element: <Form /> },
      { path: 'edit/:id', element: <Form /> },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)
