import style from './Header.module.css';
import LoginButton from '../auth/twitch/LoginButton/LoginButton.tsx';

function Header(){
    return(
        <header className={style.header}>
            <div className={style['header-content-wrapper']}>
                <h2>Schiro&apos;s GameHub</h2>
                <LoginButton />
            </div>
        </header>
    );
}

export default Header;