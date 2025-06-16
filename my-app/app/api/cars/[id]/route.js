import { NextResponse } from 'next/server'
import { updateCar, deleteCar } from '../../../../lib/db'

export async function PUT(req, { params }) {
  const data = await req.json()
  const updated = updateCar(params.id, data)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(req, { params }) {
  const success = deleteCar(params.id)
  if (!success) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
