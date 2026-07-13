import { useEffect, useState } from 'react'

const API_URL = 'https://rickandmortyapi.com/api/character'

function useFetchCharacters() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchCharacters = async () => {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Unable to reach the interdimensional archive.')
        }

        const payload = await response.json()
        const results = Array.isArray(payload?.data?.results)
          ? payload.data.results
          : Array.isArray(payload?.results)
            ? payload.results
            : []

        if (!isMounted) {
          return
        }

        setData(results)
        setError(null)
      } catch (caughtError) {
        if (!isMounted) {
          return
        }

        setData([])
        setError(caughtError.message || 'Unknown failure while loading characters.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCharacters()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, loading, error }
}

export default useFetchCharacters
