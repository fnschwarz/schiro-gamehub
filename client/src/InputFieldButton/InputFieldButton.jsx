import PropTypes from 'prop-types';
import style from './InputFieldButton.module.css';

function InputFieldButton({ reloadCardComponents, isFocused }){
    const handleClick = async (evt) => {
        const app = {
            "id" : parseInt(document.getElementById("inputField").value)
        }
    
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(app)
        });

        const result = await response.json();

        if (result === "SUCCESS") {
            reloadCardComponents();
        }
    }

    return(
        <button 
            className={`${style.button} ${isFocused ? style.focused : ''}`}
            onClick={(evt) => handleClick(evt)}
        >Add Game</button>
    );
}

InputFieldButton.propTypes = {
    reloadCardComponents : PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
}

export default InputFieldButton