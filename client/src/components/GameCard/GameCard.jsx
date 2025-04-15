import style from './GameCard.module.css';
import PropTypes from 'prop-types';
import RemoveGameButton from '../ui/RemoveGameButton/RemoveGameButton.jsx';

function GameCard({ id, link, img, alt, title, reloadCardComponents}){
    return(
        <div className={style['game-card']} id={id}>
            <a href={link}>
                <img className={style['game-card-image']} src={img} alt={alt} />
            </a>
            <RemoveGameButton id={id} reloadCardComponents={reloadCardComponents} />
            <div className={style['game-card-title-wrapper']}>
                <h2 className={style['game-card-title']}>{title}</h2>
            </div>
        </div>
    );
}

GameCard.propTypes = {
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    reloadCardComponents: PropTypes.func.isRequired,
}

export default GameCard