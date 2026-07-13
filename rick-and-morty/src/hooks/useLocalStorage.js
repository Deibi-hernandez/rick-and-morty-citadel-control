import { useEffect, useState } from 'react'

function useLocalStorage(key, initialValue = []) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)

      if (!item) {
        return initialValue
      }

      const parsedValue = JSON.parse(item)

      return Array.isArray(parsedValue) ? parsedValue : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      window.localStorage.removeItem(key)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
