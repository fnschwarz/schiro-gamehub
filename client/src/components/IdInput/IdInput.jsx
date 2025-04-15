import { useState, useContext } from 'react';
import style from './IdInput.module.css';
import PropTypes from 'prop-types';
import AuthenticationContext from '../../context/AuthenticationContext.js';
import AddGameButton from '../ui/AddGameButton/AddGameButton.jsx';

function IdInput({ reloadCardComponentsFunc, value, setValue }){
    const { isAuthenticated } = useContext(AuthenticationContext);

    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (evt) => {
        if (evt.target.value.length <= 10) {
            setValue(evt.target.value);
        }
    };

    if(isAuthenticated){
        return(
            <div className={style['input-field-container']}>
                <input className={style.input}
                    id="inputField"
                    type="number" 
                    placeholder="STEAM APP ID"
                    min="0"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()} 
                />
                <AddGameButton className={style.button} reloadCardComponents={reloadCardComponentsFunc} isFocused={isFocused} />
            </div>
        );
    }
}

IdInput.propTypes = {
    reloadCardComponentsFunc: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default IdInput