import style from './Header.module.css';
import LoginButton from '../_auth/twitch/LoginButton/LoginButton.jsx';

function Header(){
    return(
        <header className={style.header}>
            <div className={style['header-content']}>
                <h2>Schiro&apos;s GameHub</h2>
                <LoginButton />
            </div>
        </header>
    );
}

export default Header