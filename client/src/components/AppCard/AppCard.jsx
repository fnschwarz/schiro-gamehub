import PropTypes from 'prop-types';
import style from './AppCard.module.css';

function AppCard({ id, link, img, alt, title, reloadCardComponents}){
    const handleButtonClick = async (evt) => {
        const app = {
            id: parseInt(id),
        };

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps/remove`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(app),
        });

        if (response.status === 200) {
            reloadCardComponents();
        }
    }
    
    return(
        <div className={style['card']} id={id}>
            <a href={link}>
                <img className={style['card-img']} src={img} alt={alt} />
            </a>
            <button className={style['card-delete-button']} onClick={(evt) => handleButtonClick(evt)}>
                &times;
            </button>
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