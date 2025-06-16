'use client'

import { useState, useEffect } from 'react'

export default function CarsPage() {
  const [cars, setCars] = useState([])
  const [form, setForm] = useState({ make: '', model: '', year: '' })

  useEffect(() => {
    fetch('/api/cars')
      .then(res => res.json())
      .then(setCars)
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.make || !form.model || !form.year) return
    const res = await fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const newCar = await res.json()
    setCars([...cars, newCar])
    setForm({ make: '', model: '', year: '' })
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cars</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-x-2">
        <input
          name="make"
          placeholder="Make"
          value={form.make}
          onChange={handleChange}
          required
          className="border p-1"
        />
        <input
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
          required
          className="border p-1"
        />
        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          required
          className="border p-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
          Add Car
        </button>
      </form>

      <ul>
        {cars.map(car => (
          <li key={car.id}>
            {car.make} {car.model} ({car.year})
          </li>
        ))}
      </ul>
    </main>
  )
}
