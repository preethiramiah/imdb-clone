import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { Message } from "primereact/message"
import { MultiSelect } from "primereact/multiselect"
import { Toast } from "primereact/toast"
import { useCallback, useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchActors, fetchProducers } from "../store/slice"
import AddActor from "./AddActor"
import AddProducer from "./AddProducer"
import { getMovieById, updateMovie } from '../api'

const EditMovie = () => {
  const movieId = window.location.hash?.split('/').pop()
  const dispatch = useDispatch()
  const actors = useSelector(state => state.globalStore.actorsState.actors)
  const isActorsLoading = useSelector(state => state.globalStore.actorsState.isLoading)
  const producers = useSelector(state => state.globalStore.producersState.producers)
  const isProducersLoading = useSelector(state => state.globalStore.producersState.isLoading)
  const [movie, setMovie] = useState({
    title: '',
    release_year: null,
    plot: '',
    poster: '',
    actors: [],
    producer_id: null
  })
  const [showAddActor, setShowAddActor] = useState(false)
  const [showAddProducer, setShowAddProducer] = useState(false)
  const toast = useRef(null)

  const loadActors = useCallback(() => {
    dispatch(fetchActors())
  }, [dispatch])

  const loadProducers = useCallback(() => {
    dispatch(fetchProducers())
  }, [dispatch])

  useEffect(() => {
    loadActors()
    loadProducers()
  }, [loadActors, loadProducers])

  useEffect(() => {
    const getMovie = async () => {
      const result = await getMovieById(movieId)
      setMovie({
        ...result,
        actors: result.actors?.map(actor => actor.actor_id) || []
      })
    }
    if (!movieId) return
    getMovie()
  }, [movieId])

  const addMovieHandler = async () => {
    if (!movie?.title) return
    const result = await updateMovie(movie.id, movie)
    if (!result?.data || result.error) {
      toast.current.show({ severity: 'danger', summary: 'Error', detail: result.error || 'Movie not saved' })
      return
    }
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Movie saved successfully' })
  }

  const resetHandler = () => {
    setMovie({
      title: '',
      release_year: null,
      plot: '',
      poster: '',
      actors: [],
      producer_id: null
    })
  }

  const cancelHandler = () => {
    window.open('/', '_self')
  }

  return (
    <div className="flex flex-col items-center pl-4 pr-4 min-h-[80vh]">
      <h1 className="text-2xl">Edit Movie</h1>
      <Divider />
      <Toast ref={toast} />
      <div className="card mt-8">
          <div className="flex flex-wrap items-center mb-3 gap-2">
              <label htmlFor="title" className="p-hidden-accessible">Title</label>
              <InputText
                id="title" 
                placeholder="Movie Title" 
                className={`mr-2 w-md${movie.title ? '' : ' p-invalid'}`}
                onChange={e => setMovie(movie => ({ ...movie, title: e.target.value }))}
                value={movie.title || ''}
              />
              {!movie.title && <Message severity="error" text="Title is required" />}
          </div>
          <div className="flex flex-wrap items-center mb-3 gap-2">
              <label htmlFor="poster" className="p-hidden-accessible">Poster URL</label>
              <InputText
                id="poster"
                placeholder="Enter poster url"
                className="mr-2 w-md"
                onChange={e => setMovie(movie => ({ ...movie, poster: e.target.value }))}
                value={movie.poster || ''}
              />
          </div>
          <div className="flex flex-wrap items-center mb-3 gap-2">
              <label htmlFor="releaseYear" className="p-hidden-accessible">Release year</label>
              <InputNumber
                id="releaseYear"
                placeholder="Year of release"
                useGrouping={false}
                className="mr-2 w-md"
                value={movie.release_year || ''}
                onChange={e => setMovie(movie => ({ ...movie, release_year: e.value }))}
              />
          </div>
          <div className="flex flex-wrap items-center mb-3 gap-2">
              <label htmlFor="plot" className="p-hidden-accessible">Movie plot</label>
              <InputTextarea
                id="plot"
                placeholder="Enter the movie plot"
                className="mr-2 w-md"
                onChange={e => setMovie(movie => ({ ...movie, plot: e.target.value }))}
                value={movie.plot}
              />
          </div>
          <div className="flex flex-wrap items-center mb-3 gap-2">
              <label htmlFor="producer" className="p-hidden-accessible">Producer</label>
              <Dropdown
                id="producer"
                placeholder="Select a Producer"
                loading={isProducersLoading}
                value={movie.producer_id}
                className="w-md"
                options={producers}
                optionLabel="name"
                optionValue="id"
                onChange={e => setMovie(movie => ({ ...movie, producer_id: e.value }))}
              ></Dropdown>
              <Button label="Add new producer" link onClick={() => setShowAddProducer(true)} />
              <AddProducer visible={showAddProducer} setVisible={setShowAddProducer} refreshProducers={loadProducers} />
          </div>
          <div className="flex flex-wrap items-center mb-6 gap-2">
              <label htmlFor="actors" className="p-hidden-accessible">Actors</label>
              <MultiSelect
                id="actors"
                placeholder="Select actors" 
                className="w-md"
                loading={isActorsLoading}
                value={movie.actors}
                onChange={e => setMovie(movie => ({ ...movie, actors: e.value }))}
                options={actors}
                optionLabel="name"
                optionValue="id"
              />
              <Button label="Add new actor" link onClick={() => setShowAddActor(true)} />
              <AddActor visible={showAddActor} setVisible={setShowAddActor} refreshActors={loadActors} />
          </div>
          <div className="flex flex-wrap items-center mb-6 gap-2">
            <Button label="Cancel" severity="secondary" onClick={cancelHandler}></Button>
            <Button label="Reset" severity="secondary" onClick={resetHandler}></Button>
            <Button label="Update Movie" onClick={addMovieHandler}></Button>
          </div>
      </div>
    </div>
  )
}

export default EditMovie
