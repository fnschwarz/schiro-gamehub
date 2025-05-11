import style from './NoPage.module.css';

function NoPage(){
    document.title = '404 Not Found';

    return (
        <div className={style.body}>
            <h1>404 Not Found</h1>
            <h1>bro, hier ist nichts... 💔🥀</h1>
            <a href='/'><button className={style['button']}>lass mich gehen</button></a>
        </div>
    );
}

export default NoPage;
