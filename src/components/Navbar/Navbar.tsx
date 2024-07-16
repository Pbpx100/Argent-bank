import { useAppSelector } from '../../hooks/hooks'
import { persistor } from '../../store/store'
import { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
    const {
        token,
        userName: { firstName },
    } = useAppSelector(state => state.auth)

    const handleLogout = useCallback(async () => await persistor.purge(), [])

    return (
        <nav>
            <ul className={styles.mainNav}>
                {!token ? (
                    <li className={styles.mainNavItem}>
                        <NavLink to="/login">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </NavLink>
                    </li>
                ) : (
                    <>
                        <li className={styles.mainNavItem}>
                            <NavLink to="/profile">
                                <i className="fa fa-user-circle"></i>
                                {firstName}
                            </NavLink>
                        </li>
                        <li className={styles.mainNavItem}>
                            <NavLink to="/login" onClick={handleLogout}>
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar