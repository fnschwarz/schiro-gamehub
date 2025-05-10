import style from './Header.module.css';
import LoginButton from '../auth/twitch/LoginButton/LoginButton.tsx';
import logo1 from '../../assets/images/logo1.png';
import logo2 from '../../assets/images/logo2.png';

function Header(){
    return(
        <div className={style.header}>
            <div className={style['header-nav-bar']}>
                <a href='/'>
                    <div className={style['header-nav-logo']}>
                        <img className={style['header-nav-logo1']} src={logo1} /><img src={logo2} />
                    </div>
                </a>
                <LoginButton />
            </div>
        </div>
    );
}

export default Header;
