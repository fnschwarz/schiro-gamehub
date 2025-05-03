import style from './Header.module.css';
import LoginButton from '../auth/twitch/LoginButton/LoginButton.tsx';
import logo1 from '../../assets/logo_part1.png';
import logo2 from '../../assets/logo_part2.png';

function Header(){
    return(
        <header className={style.header}>
            <div className={style['header-content-wrapper']}>
                <div className={style['header-logo']}>
                    <img className={style['header-logo-part1']} src={logo1} /><img className={style['header-logo-part2']} src={logo2} />
                </div>
                <LoginButton />
            </div>
        </header>
    );
}

export default Header;