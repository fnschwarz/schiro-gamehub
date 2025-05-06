import style from './GameCard.module.css';
import RemoveGameButton from '../ui/RemoveGameButton/RemoveGameButton.tsx';
import missing_header from '../../assets/missing_header.png'

function GameCard({ id, title, img, link }: client.props.IGame){
    return(
        <div className={style['game-card']} id={id.toString()}>
            <div className={style['game-card__image-container']}>
                <a href={link}>
                    <img className={style['game-card__image']} src={img} onError={ (e) => {
                        const img = e.currentTarget;
                        img.onerror= null;
                        img.src = missing_header;
                    }} alt='Game header is currently unavailable' />
                </a>
            </div>
            <div className={style['game-card__remove-game-button']}>
                <RemoveGameButton id={id} />
            </div>
            <div className={style['game-card__title-container']}>
                <h2 className={style['game-card__title']}>{title}</h2>
            </div>
        </div>
    );
}

export default GameCard;