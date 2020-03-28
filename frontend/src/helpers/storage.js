export function save(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export function load(name) {
  return JSON.parse(localStorage.getItem(name))
}

export function remove(name) {
  localStorage.removeItem(name)
}
