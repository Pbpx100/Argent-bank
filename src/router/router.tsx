import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    useLocation,
} from 'react-router-dom'
import Layout from '../layout/Layout'
import Error404 from '../pages/Error'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import { useAppSelector } from '../hooks/hooks'
import SignIn from '../forms/loginForm/LoginForm'

/**
 * RequireAuth is a higher-order component (HOC) that adds authentication functionality to a component.
 * If a user is not logged in and try to go to the profile page, it will redirect them to the login page.
 *
 * @param {Object} props
 * @param {JSX.Element} props.children The component to wrap with authentication functionality.
 * @returns {JSX.Element} The wrapped component.
 */
function RequireAuth({ children }: { children: JSX.Element }) {
    const isLogged = useAppSelector(state => state.auth.token)
    const location = useLocation()

    if (!isLogged) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

/**
 * RequireUnAuth is a higher-order component (HOC) that adds authentication functionality to a component.
 * If a user is logged in and try to go to the login page, it will redirect them to the home page.
 *
 * @param {Object} props
 * @param {JSX.Element} props.children The component to wrap with authentication functionality.
 * @returns {JSX.Element} The wrapped component.
 */
function RequireUnAuth({ children }: { children: JSX.Element }) {
    const isLogged = useAppSelector(state => state.auth.token)
    const location = useLocation()

    if (isLogged) {
        return <Navigate to="/profile" state={{ from: location }} replace />
    }

    return children
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
                path="login"
                element={
                    <RequireUnAuth>
                        <SignIn />
                    </RequireUnAuth>
                }
            />
            <Route
                path="profile"
                element={
                    <RequireAuth>
                        <Profile />
                    </RequireAuth>
                }
            />
            <Route path="*" element={<Error404 />} />
        </Route>,
    ),
)

export default router