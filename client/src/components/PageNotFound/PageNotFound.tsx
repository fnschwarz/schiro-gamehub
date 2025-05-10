import style from './PageNotFound.module.css';

function PageNotFound(){
    return (
        <div className={style['page-container']}>
            <h1>404 Not Found</h1>
            <h1>congrats, you found the void... 🧑‍🚀🚀</h1>
            <a href='/'><button className={style['button']}>please let me go</button></a>
        </div>
    )
}

export default PageNotFound;
