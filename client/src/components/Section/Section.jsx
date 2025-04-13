import { useState } from 'react';
import style from './Section.module.css';
import AppIdInput from '../AppIdInput/AppIdInput.jsx';
import AppList from '../AppList/AppList.jsx';

function Section() {
    const [reloadCardComponents, setReloadCardComponents] = useState(false);
    const [inputFieldValue, setInputFieldValue] = useState('');

    const handleReloadCardComponents = () => {
        setReloadCardComponents(!reloadCardComponents);
        setInputFieldValue('')
    };

    return (
        <div className={style.section}>
            <AppIdInput
                reloadCardComponentsFunc={handleReloadCardComponents} 
                value={inputFieldValue} 
                setValue={setInputFieldValue} 
            />
            <div className={style.apps}>
                <AppList reloadCardComponentsFunc={handleReloadCardComponents} reloadTrigger={reloadCardComponents} />
            </div>
        </div>
    );
}

export default Section;