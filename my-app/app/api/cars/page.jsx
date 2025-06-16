'use client'

import { useEffect, useState } from 'react'

export default function CarsPage() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newCar, setNewCar] = useState({ make: '', model: '', year: '' })

  // Fetch all cars on mount
  useEffect(() => {
    fetchCars()
  }, [])

  async function fetchCars() {
    setLoading(true)
    try {
      const res = await fetch('/api/cars')
      if (!res.ok) throw new Error('Failed to fetch cars')
      const data = await res.json()
      setCars(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddCar(e) {
    e.preventDefault()
    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCar),
      })
      if (!res.ok) throw new Error('Failed to add car')
      const created = await res.json()
      setCars(prev => [...prev, created])
      setNewCar({ make: '', model: '', year: '' })
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/cars/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete car')
      setCars(prev => prev.filter(car => car.id !== id))
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }



  if (loading) return <p className="p-6">Loading cars...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cars List</h1>

      <form onSubmit={handleAddCar} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Make"
          value={newCar.make}
          onChange={e => setNewCar({ ...newCar, make: e.target.value })}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Model"
          value={newCar.model}
          onChange={e => setNewCar({ ...newCar, model: e.target.value })}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Year"
          value={newCar.year}
          onChange={e => setNewCar({ ...newCar, year: e.target.value })}
          required
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Car
        </button>
      </form>

      {cars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {cars.map(({ id, make, model, year }) => (
            <li key={id} className="flex justify-between items-center">
              <span>
                {make} {model} ({year})
              </span>
              <button
                onClick={() => handleDelete(id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
