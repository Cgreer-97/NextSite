import { NextResponse } from 'next/server'
import { cars, saveCars } from '@/lib/db'

export async function PUT(req, { params }) {
  const data = await req.json()
  const i = cars.findIndex(c => c.id == params.id)
  if (i === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  cars[i] = { ...cars[i], ...data }
  saveCars()
  return NextResponse.json(cars[i])
}

export async function DELETE(req, { params }) {
  const i = cars.findIndex(c => c.id == params.id)
  if (i === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  cars.splice(i, 1)
  saveCars()
  return NextResponse.json({ ok: true })
}
