import { Routes, Route, HashRouter } from 'react-router-dom'
import imdbLogo from './assets/images/imdb.svg'
import Movies from './components/Movies'
import AddMovie from './components/AddMovie'
import EditMovie from './components/EditMovie'

function App() {
  return (
    <>
      <header className='flex justify-center items-center h-20 bg-gray-800 text-white absolute top-0 left-0 w-full p-4'>
        <a href="/" target="_self" className='mr-4'>
          <img src={imdbLogo} className="w-16" alt="IMDB logo" />
        </a>
        <p>A clone of IMDb displaying a small set of movies where you can edit the movie details</p>
      </header>
      <main className='mt-24'>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/edit-movie/:movieId" element={<EditMovie />} />
          </Routes>
        </HashRouter>
      </main>
      <footer className='flex items-center h-16 bg-gray-800 text-white w-[99dvw] pl-5'>
        <p>
          @2025 IMDB Clone
        </p>
      </footer>
    </>
  )
}

export default App
