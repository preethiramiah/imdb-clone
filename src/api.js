const apiHost = import.meta.env.VITE_API_HOST

export const getApi = async (path) => {
  if (!apiHost) return
  const url = `${apiHost}/${path}`
  try {
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      throw new Error(`Status ${response.status}; Message: ${response.statusText}`);
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postApi = async (path, body) => {
  if (!apiHost) return
  const url = `${apiHost}/${path}`
  try {
    const response = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-type': 'application/json' } })
    if (!response.ok) {
      throw new Error(`Status ${response.status}; Message: ${response.statusText}`);
    }
    const data = await response.json()
    return { data }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const putApi = async (path, body) => {
  if (!apiHost) return
  const url = `${apiHost}/${path}`
  try {
    const response = await fetch(url, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-type': 'application/json' } })
    if (!response.ok) {
      throw new Error(`Status ${response.status}; Message: ${response.statusText}`);
    }
    const data = await response.json()
    return { data }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export const getAllMovies = async () => {
  return getApi('movies')
}

export const getAllActors = async () => {
  return getApi('actors')
}

export const getAllProducers = async () => {
  return getApi('producers')
}

export const getMovieById = async (movieId) => {
  return getApi(`movies/${movieId}`)
}

export const addActor = async (actor) => {
  return postApi('add-actor', actor)
}

export const addProducer = async (producer) => {
  return postApi('add-producer', producer)
}

export const addMovie = async (movie) => {
  return postApi('add-movie', movie)
}

export const updateMovie = async (movieId, body) => {
  return putApi(`update-movie/${movieId}`, body)
}
