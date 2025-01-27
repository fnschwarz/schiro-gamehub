import style from './Header.module.css';

function Header(){
    return(
        <header className={style.header}>
            <h2>Schiro's GameHub</h2>
        </header>
    );
}

export default Header