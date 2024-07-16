//import { Logo, Navbar } from '@components';

import Logo from '../Logo/Logo'
import Navbar from '../Navbar/Navbar'
import style from './Header.module.css'
export default function Header() {
    return (
        <nav className={style.mainNav}>
            <Logo />
            <Navbar />

        </nav>
    )
}