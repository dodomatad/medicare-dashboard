'use client'

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!data?.session) {
        window.location.href = '/login'
      } else {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold">🩺 Medicare System</h1>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            window.location.href = '/login'
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Pacientes', value: '1.023', color: 'blue' },
          { title: 'Medicamentos', value: '346', color: 'green' },
          { title: 'Tratamentos', value: '742', color: 'purple' },
          { title: 'Alertas Ativos', value: '6', color: 'red' }
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-${item.color}-100 text-${item.color}-800 p-4 rounded shadow`}
          >
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-2xl">{item.value}</p>
          </div>
        ))}
      </main>

      <section className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">⚡ Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Novo Paciente', 'Novo Medicamento', 'Prescrever', 'Histórico'].map((action, i) => (
            <button
              key={i}
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              {action}
            </button>
          ))}
        </div>
      </section>

      <footer className="mt-8 text-center text-sm text-gray-600">
        © 2025 Medicare System. Todos os direitos reservados.
      </footer>
    </div>
  )
}
