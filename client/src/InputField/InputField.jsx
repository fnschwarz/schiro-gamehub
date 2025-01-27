import PropTypes from 'prop-types';
import style from './InputField.module.css';

function InputField({ value, setValue }){
    const handleChange = (evt) => {
        if (evt.target.value.length <= 7) {
            setValue(evt.target.value);
        }
    };

    return(
        <input className={style.input}
            id="inputField"
            type="number" 
            min="0"
            value={value}
            onChange={handleChange}
            onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()} 
        />
    );
}

InputField.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default InputField