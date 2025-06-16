import { NextResponse } from 'next/server'
import { getAllCars, addCar } from '../../../lib/db'

export async function GET() {
  return NextResponse.json(getAllCars())
}

export async function POST(req) {
  const data = await req.json()
  const newCar = addCar(data)
  return NextResponse.json(newCar, { status: 201 })
}
