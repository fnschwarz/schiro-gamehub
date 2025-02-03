import PropTypes from 'prop-types';
import style from './InputFieldButton.module.css';

const handleClick = async (evt, reloadCardComponents) => {
    const newApp = {
        "appId" : parseInt(document.getElementById("inputField").value)
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newApp)
    }).then((res) => { res.json().then( (resToJSON) => {
            console.log(resToJSON); // INFO: only needed for debugging
            if(resToJSON === "SUCCESS"){
                reloadCardComponents();
            }
        });
    });
}

function InputFieldButton({ reloadCardComponentsFunc, isFocused }){
    return(
        <button 
            className={`${style.button} ${isFocused ? style.focused : ''}`}
            onClick={(evt) => handleClick(evt, reloadCardComponentsFunc)}
        >Add Game</button>
    );
}

InputFieldButton.propTypes = {
    reloadCardComponentsFunc : PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
}

export default InputFieldButton