import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './AppIdInput.module.css';
import AddAppButton from '../AddAppButton/AddAppButton.jsx';

function AppIdInput({ reloadCardComponentsFunc, value, setValue }){
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (evt) => {
        if (evt.target.value.length <= 10) {
            setValue(evt.target.value);
        }
    };

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
            <AddAppButton className={style.button} reloadCardComponents={reloadCardComponentsFunc} isFocused={isFocused} />
        </div>
    );
}

AppIdInput.propTypes = {
    reloadCardComponentsFunc: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default AppIdInput