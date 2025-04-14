import PropTypes from 'prop-types';
import style from './AppCard.module.css';
import RemoveAppButton from '../RemoveAppButton/RemoveAppButton';

function AppCard({ id, link, img, alt, title, reloadCardComponents}){
    return(
        <div className={style['card']} id={id}>
            <a href={link}>
                <img className={style['card-img']} src={img} alt={alt} />
            </a>
            <RemoveAppButton id={id} reloadCardComponents={reloadCardComponents} />
            <div className={style['card-title-container']}>
                <h2 className={style['card-title']}>{title}</h2>
            </div>
        </div>
    );
}

AppCard.propTypes = {
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    reloadCardComponents: PropTypes.func.isRequired,
}

export default AppCard