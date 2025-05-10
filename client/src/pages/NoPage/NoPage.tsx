import style from './NoPage.module.css';

function NoPage(){
    document.title = '404 Not Found';

    return (
        <div className={style.body}>
            <h1>404 Not Found</h1>
            <h1>congrats, you found the void... 🧑‍🚀🚀</h1>
            <a href='/'><button className={style['button']}>please let me go</button></a>
        </div>
    );
}

export default NoPage;
