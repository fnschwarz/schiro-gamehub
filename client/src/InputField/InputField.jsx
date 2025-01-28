import PropTypes from 'prop-types';
import style from './InputField.module.css';
import Button from '../Button/Button.jsx';

function InputField({ value, setValue, onButtonClick }){
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
                onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()} 
            />
            <Button className={style.button} reloadCardComponentsFunc={onButtonClick} />
        </div>
    );
}

InputField.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default InputField