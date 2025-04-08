import PropTypes from 'prop-types';
import style from './Card.module.css';

function Card({ id, link, img, alt, title, reloadCardComponents}){
    const deleteApp = async (evt) => {
        const app = {
            "id" : parseInt(id)
        }
    
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps/delete`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(app)
        }).then((res) => { 
                res.json().then( (resToJSON) => {
                    if(resToJSON === "SUCCESS"){
                        reloadCardComponents();
                    }
            });
        });
    }
    
    return(
        <div className={style['card']} id={id}>
            <a href={link}>
                <img className={style['card-img']} src={img} alt={alt} />
            </a>
            <button className={style['card-delete-button']} onClick={(evt) => deleteApp(evt)}>
                &times;
            </button>
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