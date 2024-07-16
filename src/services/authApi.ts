import { RootState } from '../store/store'
import type {
    TokenType,
    UserCredentialsType,
    UserNameType,
} from '../types/user.model.ts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * Creates an API for authentication.
 * @param {Object} options - The options to configure the API.
 * @param {string} options.reducerPath - The path to the API's reducer.
 * @param {Object} options.baseQuery - The base query to make API calls.
 * @param {string} options.baseQuery.baseUrl - The base URL to make API calls.
 * @param {function} options.baseQuery.prepareHeaders - A function that prepares the API request headers.
 * @param {Object} options.endpoints - The API endpoints to be used.
 */


//Api slice also called
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/user',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) headers.set('Authorization', `Bearer ${token}`)
            return headers
        },
    }),
    endpoints: builder => ({
        /**
         * Logs in the user.
         * @param {Object} credentials - The user's credentials.
         * @param {string} credentials.email - The user's email address.
         * @param {string} credentials.password - The user's password.
         */
        login: builder.mutation<{ body: { token: TokenType } }, UserCredentialsType>({
            query: credentials => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: credentials,
                }
            },
        }),
        /**
         * Gets the profile information of the user.
         */
        getProfile: builder.mutation({
            query: () => {
                return {
                    url: 'profile',
                    method: 'POST',
                }
            },
        }),
        /**
         * Updates the profile information of the user.
         * @param {Object} names - The user's updated names.
         * @param {string} names.firstName - The user's updated first name.
         * @param {string} names.lastName - The user's updated last name.
         */
        updateProfile: builder.mutation<UserNameType, UserNameType>({
            query: names => {
                return {
                    url: 'profile',
                    method: 'PUT',
                    body: names,
                }
            },
        }),
    }),
})

/**
 * The authApi object exports the following properties:
 * useLoginMutation: A hook for making a login mutation.
 * useGetProfileMutation: A hook for making a get profile mutation.
 * useUpdateProfileMutation: A hook for making an update profile mutation.
 */
export const {
    useLoginMutation,
    useGetProfileMutation,
    useUpdateProfileMutation,
} = authApi