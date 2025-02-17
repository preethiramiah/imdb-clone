import { configureStore } from "@reduxjs/toolkit"
import commonReducer from './slice'

const store = configureStore({ reducer: { globalStore: commonReducer } })

export default store
