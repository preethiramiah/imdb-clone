import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllActors, getAllMovies, getAllProducers } from "../api"

const initialState = {
  moviesState: { movies: [], isLoading: false, error: null },
  actorsState: { actors: [], isLoading: false, error: null },
  producersState: { producers: [], isLoading: false, error: null }
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await getAllMovies()
    return response
  }
)

export const fetchActors = createAsyncThunk(
  'movies/fetchActors',
  async () => {
    const response = await getAllActors()
    return response
  }
)

export const fetchProducers = createAsyncThunk(
  'movies/fetchProducers',
  async () => {
    const response = await getAllProducers()
    return response
  }
)

export const commonSlice = createSlice({
  name: 'globalStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.moviesState.isLoading = true
    })
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.moviesState.isLoading = false
      state.moviesState.movies = action.payload
    })
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.moviesState.isLoading = false
      state.moviesState.error = action.error.message
    })
    builder.addCase(fetchActors.pending, (state) => {
      state.actorsState.isLoading = true
    })
    builder.addCase(fetchActors.fulfilled, (state, action) => {
      state.actorsState.isLoading = false
      state.actorsState.actors = action.payload
    })
    builder.addCase(fetchActors.rejected, (state, action) => {
      state.actorsState.isLoading = false
      state.actorsState.error = action.error.message
    })
    builder.addCase(fetchProducers.pending, (state) => {
      state.producersState.isLoading = true
    })
    builder.addCase(fetchProducers.fulfilled, (state, action) => {
      state.producersState.isLoading = false
      state.producersState.producers = action.payload
    })
    builder.addCase(fetchProducers.rejected, (state, action) => {
      state.producersState.isLoading = false
      state.producersState.error = action.error.message
    })
  }
})

export default commonSlice.reducer
