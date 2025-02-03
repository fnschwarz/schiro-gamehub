import PropTypes from 'prop-types';
import style from './Card.module.css';

function Card({ link, img, alt, title }){
    return(
        <div className={style['card']} >
            <a href={link}>
                <img className={style['card-img']} src={img} alt={alt} />
            </a>
            <div className={style['card-title-container']}>
                <h2 className={style['card-title']}>{title}</h2>
            </div>
        </div>
    );
}

Card.propTypes = {
    link: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default Card