import style from './AccessDeniedPage.module.css';

function AccessDeniedPage() {
    return (
        <div className={style['page-container']}>
            <h1>403 Forbidden</h1>
            <h1>uhm, not whitelisted... ☝️🤓</h1>
            <a href='/'><button className={style['button']}>sorry</button></a>
        </div>
    )
}

export default AccessDeniedPage;
