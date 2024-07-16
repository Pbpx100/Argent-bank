import { Link } from 'react-router-dom';
import style from './Logo.module.css';

export default function Logo() {
    return (
        <Link className={style.mainNavLogo} to="/">
            <img
                className={style.mainNavLogoImage}
                src="../../../public/img/argentBankLogo.png"
                alt="Argent Bank Logo"
            />
            <h1 className={style.srOnly}>Argent Bank</h1>
        </Link>
    )
}