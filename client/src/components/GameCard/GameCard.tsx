import style from './GameCard.module.css';
import RemoveGameButton from '../ui/RemoveGameButton/RemoveGameButton.tsx';

function GameCard({ id, title, img, link, alt}: client.props.IGame){
    return(
        <div className={style['game-card']} id={id.toString()}>
            <a href={link}>
                <img className={style['game-card-image']} src={img} alt={alt} />
            </a>
            <RemoveGameButton id={id} />
            <div className={style['game-card-title-wrapper']}>
                <h2 className={style['game-card-title']}>{title}</h2>
            </div>
        </div>
    );
}

export default GameCard;