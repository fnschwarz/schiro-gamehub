import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './InputField.module.css';
import InputFieldButton from '../InputFieldButton/InputFieldButton.jsx';

function InputField({ value, setValue, onButtonClick }){
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (evt) => {
        if (evt.target.value.length <= 7) {
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
            <InputFieldButton className={style.button} reloadCardComponentsFunc={onButtonClick} isFocused={isFocused} />
        </div>
    );
}

InputField.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired
};

export default InputField