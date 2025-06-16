import { NextResponse } from 'next/server'
import { cars, saveCars } from '@/lib/db'

export async function GET() {
  return NextResponse.json(cars)
}

export async function POST(req) {
  const data = await req.json()
  const newCar = {
    id: Date.now(),
    ...data,
    created_at: new Date().toISOString(),
  }
  cars.push(newCar)
  saveCars()
  return NextResponse.json(newCar, { status: 201 })
}
