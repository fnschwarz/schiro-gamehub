import PropTypes from 'prop-types';
import style from './InputFieldButton.module.css';

function InputFieldButton({ reloadCardComponents, isFocused }){
    const handleClick = async (evt) => {
        const newApp = {
            "id" : parseInt(document.getElementById("inputField").value)
        }
    
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newApp)
        }).then((res) => { res.json().then( (resToJSON) => {
                if(resToJSON === "SUCCESS"){
                    reloadCardComponents();
                }
            });
        });
    }

    return(
        <button 
            className={`${style.button} ${isFocused ? style.focused : ''}`}
            onClick={(evt) => handleClick(evt)}
        >Add Game</button>
    );
}

InputFieldButton.propTypes = {
    reloadCardComponentsFunc : PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
}

export default InputFieldButton