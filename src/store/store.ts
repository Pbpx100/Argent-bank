import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import storage from 'redux-persist/lib/storage'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import authReducer from '../features/authSlice'
import { authApi } from '../services/authApi'
import type { AuthType } from '../types/user.model.ts'

/**
* Configuration object for the Redux persist.
@constant {Object} persistConfig
@property {string} key - The key name to store the data under in the storage backend.
@property {number} version - The version number of the data stored in the storage backend.
@property {Object} storage - The storage backend.
@property {string[]} whitelist - The list of keys to persist.
*/
const persistConfig = {
    key: 'user',
    version: 1,
    storage,
    whitelist: ['token', 'userName', 'persistIsChecked'],
}

/**
The reducer with the persist functionality.
@constant {Function} persistedReducer
*/
const persistedReducer = persistReducer(persistConfig, authReducer)

/**
* The Redux store.
@constant {Object} store
@property {Object} reducer - The combined reducers.
@property {Function} middleware - The middlewares for the store.
@property {boolean} devTools - Flag indicating whether the Redux DevTools should be enabled.
*/
export const store = configureStore({
    reducer: { auth: persistedReducer, [authApi.reducerPath]: authApi.reducer },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware),
    devTools: true,
})

/**
* The persistor for the store.
@constant {Object} persistor
*/
export const persistor = persistStore(store)

/**
* The dispatch function for the store.
@typedef {Function} AppDispatch
*/
export type AppDispatch = typeof store.dispatch

/**
* The state of the root store.
@typedef {Object} RootState
@property {AuthType} auth - The state of the auth store.
*/
//I have access fron everywhere of the app to the state of the store
export type RootState = ReturnType<typeof store.getState> & { auth: AuthType }

/**
@function
@param {AppDispatch} dispatch - The dispatch function from the store to setup the listeners for.
* This function sets up listeners for the provided dispatch function from the store.
*/
setupListeners(store.dispatch)