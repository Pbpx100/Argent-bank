import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { PURGE } from 'redux-persist'
import { createSelector } from 'reselect'
import type { AuthType, TokenType, UserType } from '../types/user.model'
/**
Initial state for the 'auth' slice of the store
@typedef {Object} AuthType
@property {TokenType} token - JWT token for authentication
@property {UserType} userName - Information about the user
@property {boolean} persistIsChecked - Flag indicating whether the token has been verified as valid
*/
const initialState: AuthType = {
    token: '',
    userName: {
        firstName: '',
        lastName: '',
    },
    persistIsChecked: false,
}
/**
The 'auth' slice of the store
@typedef {Object} AuthSlice
@property {function} setToken - Action creator to set the token
@property {function} setUserName - Action creator to set the user name
@property {function} editUserName - Action creator to edit the user name
@property {function} toggleCheck - Action creator to toggle the persistIsChecked flag
@property {function} extraReducers - Custom action creator to reset the auth state to the initial state
*/
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (
            state,
            action: PayloadAction<{
                token: TokenType
            }>,
        ) => {
            state.token = action.payload.token
        },
        setUserName: (
            state,
            action: PayloadAction<{
                userName: UserType
            }>,
        ) => {
            state.userName = action.payload.userName
        },
        editUserName: (
            state,
            action: PayloadAction<{
                userName: UserType
            }>,
        ) => {
            state.userName = action.payload.userName
        },
        toggleCheck: state => {
            state.persistIsChecked = !state.persistIsChecked
        },
    },
    extraReducers: builder => {
        builder.addCase(PURGE, () => initialState)
    },
})

/**
@namespace authSlice.actions
@property {Function} setToken - Action creator for setting the token
@property {Function} setUserName - Action creator for setting the user name
@property {Function} editUserName - Action creator for editing the user name
@property {Function} toggleCheck - Action creator for toggling the persistIsChecked value
*/
export const { setToken, setUserName, editUserName, toggleCheck } =
    authSlice.actions

/**
@function authSlice.reducer
@description The default export is the authSlice reducer.
@returns {Function} - The authSlice reducer
*/
export default authSlice.reducer

/**
@function getMemoizedUser
@description Create a selector to retrieve the memoized user name.
@param {Object} state - The state object from the store
@returns {Object} - The memoized user name object
*/
export const getMemoizedUser = createSelector(
    (state: RootState) => state.auth.userName,
    userName => {
        return { firstName: userName.firstName, lastName: userName.lastName }
    },
)