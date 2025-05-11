import style from './AccessDenied.module.css';

function AccessDenied() {
    document.title = '403 Forbidden';

    return (
        <div className={style.body}>
            <h1>403 Forbidden</h1>
            <h1>ähm, du stehst nicht auf der liste... ☝️🤓</h1>
            <a href='/'><button className={style['button']}>sorry</button></a>
        </div>
    );
}

export default AccessDenied;
