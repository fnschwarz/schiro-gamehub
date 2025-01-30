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

export default SmallButton