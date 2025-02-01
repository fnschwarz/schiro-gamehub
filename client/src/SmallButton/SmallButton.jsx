import PropTypes from 'prop-types';
import style from './SmallButton.module.css';

function SmallButton({ content, textColorCode = "white", onClick }){
    return(
        <button 
            className={style['small-button']} 
            style={{ '--text-color' : `${textColorCode}` }} 
            onClick={onClick}
        >
            {content}
        </button>
    );
}

SmallButton.propTypes = {
    content: PropTypes.string.isRequired,
    textColorCode: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default SmallButton