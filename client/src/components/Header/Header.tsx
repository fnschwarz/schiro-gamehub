import style from './Header.module.css';
import LoginButton from '../auth/twitch/LoginButton/LoginButton.tsx';
import logo1 from '../../assets/logo_part1.png';
import logo2 from '../../assets/logo_part2.png';

function Header(){
    return(
        <div className={style['header__nav-bar']}>
            <div className={style['header__nav-logo']}>
                <img className={style['header__nav-logo1']} src={logo1} /><img src={logo2} />
            </div>
            <LoginButton />
        </div>
    );
}

export default Header;