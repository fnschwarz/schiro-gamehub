import PropTypes from 'prop-types';
import style from './Button.module.css';

const handleClick = async (evt, reloadCardComponents) => {

    const newApp = {
        "appId" : parseInt(document.getElementById("inputField").value) // double check the parse int in server 
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/games/post`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newApp)
    }).then((res) => {
        res.json().then( (data) => {
            if(data === "SUCCESS"){
                reloadCardComponents();
            }
        });
    });
}

function Button({ reloadCardComponentsFunc }){
    return(
        <button 
            className={style['button']}
            onClick={(evt) => handleClick(evt, reloadCardComponentsFunc)}
        >Spiel hinzufügen</button>
    );
}

Button.propTypes = {
    reloadCardComponentsFunc : PropTypes.func.isRequired
}

export default Button