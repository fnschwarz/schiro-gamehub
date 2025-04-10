import style from './Header.module.css';
import TwitchLoginButton from '../TwitchLoginButton/TwitchLoginButton.jsx';

function Header(){
    return(
        <header className={style.header}>
            <div className={style['header-content']}>
                <h2>Schiro&apos;s GameHub</h2>
                <TwitchLoginButton></TwitchLoginButton>
            </div>
        </header>
    );
}

export default Header