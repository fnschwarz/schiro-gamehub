import { useState, useEffect } from 'react';
import style from './Footer.module.css';
import Icon from '@mdi/react';
import { mdiFileDocumentOutline, mdiGithub } from '@mdi/js';

function Footer(){
    const [copyrightText, setCopyrightText] = useState('Copyright © 2025 Finn Schwarz. Alle Rechte vorbehalten.');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 510) {
                setCopyrightText('© 2025 Finn Schwarz');
            } else {
                setCopyrightText('Copyright © 2025 Finn Schwarz. Alle Rechte vorbehalten.');
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={style.footer}>
            <div className={style['footer-items-container']}>
                {copyrightText}
                <div>
                    <a title='Impressum' href='/impressum'><Icon path={mdiFileDocumentOutline} size={1} /></a>
                    <a title='GitHub' href='https://github.com/fiscdev'><Icon path={mdiGithub} size={1} /></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
