import PropTypes from 'prop-types';
import style from './AddAppButton.module.css';

function AddAppButton({ reloadCardComponents, isFocused }){
    const handleButtonClick = async (evt) => {
        const app = {
            "id" : parseInt(document.getElementById("inputField").value)
        }
    
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(app)
        });

        if (response.status === 201) {
            reloadCardComponents();
        }
    }

    return(
        <button 
            className={`${style.button} ${isFocused ? style.focused : ''}`}
            onClick={(evt) => handleButtonClick(evt)}
        >Add Game</button>
    );
}

AddAppButton.propTypes = {
    reloadCardComponents : PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
}

export default AddAppButton