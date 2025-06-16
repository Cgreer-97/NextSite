'use client'

import { useEffect, useState } from 'react'

export default function CarsPage() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/cars')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch cars')
        return res.json()
      })
      .then((data) => {
        setCars(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="p-6">Loading cars...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cars List</h1>
      {cars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {cars.map(({ id, make, model, year }) => (
            <li key={id}>
              {make} {model} ({year})
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
