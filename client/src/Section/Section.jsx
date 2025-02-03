import { useState } from 'react';
import style from './Section.module.css';
import InputField from '../InputField/InputField.jsx';
import Apps from '../Apps/Apps.jsx';

function Section() {
    const [reloadCardComponents, setReloadCardComponents] = useState(false);
    const [inputFieldValue, setInputFieldValue] = useState('');

    const handleReloadCardComponents = () => {
        setReloadCardComponents(!reloadCardComponents);
        setInputFieldValue('')
    };

    return (
        <div className={style.section}>
            <InputField 
                value={inputFieldValue} 
                setValue={setInputFieldValue} 
                onButtonClick={handleReloadCardComponents} 
            />
            <div className={style.apps}>
                <Apps reloadTrigger={reloadCardComponents} />
            </div>
        </div>
    );
}

export default Section;