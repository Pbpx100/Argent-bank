import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store/store.ts'

/**
 * A hook that returns the dispatch function for the Redux store
 * @returns The dispatch function for the Redux store
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * A hook that returns the selected state from the Redux store
 * @returns The selected state from the Redux store
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector