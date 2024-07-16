import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import { persistor, store } from '../src/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

/**
 * Renders the React application to the root element in the HTML document.
 *
 * @author Michel DELAUNAY
 * @since v1.0.0
 *
 * @return {void}
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/** 
    * The Provider component is used to make the Redux store available to
    the rest of the app. 
    */}
    <Provider store={store}>
      {/**
       * The PersistGate component is used to delay the rendering of the app's UI until the persisted data is retrieved.
       */}
      <PersistGate persistor={persistor}>
        {/**
         * The RouterProvider component is used to provide the router object to the React Router components in the app.
         */}
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)