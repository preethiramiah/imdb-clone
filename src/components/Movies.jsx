import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMovies } from "../store/slice"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from "primereact/button"

const Movies = () => {
  const dispatch = useDispatch()
  const movies = useSelector(state => state.globalStore.moviesState.movies)
  const isLoading = useSelector(state => state.globalStore.moviesState.isLoading)
  const error = useSelector(state => state.globalStore.moviesState.error)


  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const imageBodyTemplate = movie => {
    return <img src={movie.poster} alt={movie.title} className="w-20 shadow-2 border-round mr-6" />;
  }

  const actorsBodyTemplate = movie => {
    return (
      <p>
        {movie.actors?.map(actor => actor.actor_name).join(' | ')}
      </p>
    )
  }

  const editBodyTemplate = movie => {
    return <a target="_self" className="ml-6 hover:underline" href={`${window.location.origin}/#/edit-movie/${movie.id}`}>Edit</a>
  }

  const gotoAddMovie = () => {
    window.open(`${window.location.origin}/#/add-movie`, '_self')
  }

  const header = (
    <div className="flex justify-end">
      <Button label="Add a Movie" onClick={gotoAddMovie}></Button>
    </div>
  )

  return (
    <div className="flex flex-col items-center p-6 w-[95dvw]">
      {error && <p>{error}</p>}
      {isLoading
        ? <ProgressSpinner />
        : movies?.length > 0 && (
          <DataTable value={movies} dataKey="id" className="max-w-5xl" header={header}>
              <Column header="" body={imageBodyTemplate}></Column>
              <Column header="Title" className="w-56" field="title"></Column>
              <Column field="release_year" header="Release Year" className="w-36"></Column>
              <Column header="Actors" body={actorsBodyTemplate} className="w-56"></Column>
              <Column field="producer_name" header="Producer"></Column>
              <Column body={editBodyTemplate}></Column>
          </DataTable>
        )
      }
    </div>
  )
}

export default Movies
