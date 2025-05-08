import style from './GameCard.module.css';
import RemoveGameButton from '../ui/RemoveGameButton/RemoveGameButton.tsx';
import missing_header from '../../assets/images/missing_header.png';

function GameCard({ id, name, steam_link, header_image }: client.props.Game){
    return(
        <div className={style['game-card']} id={id.toString()}>
            <div className={style['game-card__image-container']}>
                <a href={steam_link}>
                    <img className={style['game-card__image']} src={header_image} onError={ (e) => {
                        const img = e.currentTarget;
                        img.onerror = null;
                        img.src = missing_header;
                    }} alt='Game header is currently unavailable' />
                </a>
            </div>
            <div className={style['game-card__remove-game-button']}>
                <RemoveGameButton id={id} />
            </div>
            <div className={style['game-card__title-container']}>
                <h2 className={style['game-card__title']}>{name}</h2>
            </div>
        </div>
    );
}

export default GameCard;