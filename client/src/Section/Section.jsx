import { useState } from 'react';
import style from './Section.module.css';
import Button from '../Button/Button.jsx';
import InputField from '../InputField/InputField.jsx';
import Games from '../Games/Games.jsx';

function Section() {
    const [reloadCardComponents, setReloadCardComponents] = useState(false);
    const [inputFieldValue, setInputFieldValue] = useState('');

    const handleReloadCardComponents = () => {
        setReloadCardComponents(!reloadCardComponents);
        setInputFieldValue('')
    };

    return (
        <div className={style.section}>
            <InputField value={inputFieldValue} setValue={setInputFieldValue} />
            <Button reloadCardComponentsFunc={handleReloadCardComponents} />
            <div className={style.games}>
                <Games reloadTrigger={reloadCardComponents} />
            </div>
        </div>
    );
}

export default Section;