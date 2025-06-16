export let cars = []

// Generate unique ID based on timestamp + random number for safety
function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString()
}

export function getAllCars() {
  return cars
}

export function getCarById(id) {
  return cars.find(car => car.id === id)
}

export function addCar(carData) {
  const newCar = {
    id: generateId(),
    ...carData,
    created_at: new Date().toISOString(),
  }
  cars.push(newCar)
  return newCar
}

export function updateCar(id, updatedData) {
  const i = cars.findIndex(car => car.id === id)
  if (i === -1) return null
  cars[i] = { ...cars[i], ...updatedData }
  return cars[i]
}

export function deleteCar(id) {
  const i = cars.findIndex(car => car.id === id)
  if (i === -1) return false
  cars.splice(i, 1)
  return true
}
