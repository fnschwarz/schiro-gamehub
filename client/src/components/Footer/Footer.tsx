import style from './Footer.module.css';
import Icon from '@mdi/react';
import { mdiFileDocumentOutline, mdiGithub } from '@mdi/js';

function Footer(){
    return (
        <div className={style.footer}>
            <div className={style['footer-items-container']}>
                Copyright &copy; 2025 Finn Schwarz. All rights reserved.
                <div>
                    <a title='Impressum' href='/impressum'><Icon path={mdiFileDocumentOutline} size={1} /></a>
                    <a title='GitHub' href='https://github.com/fiscdev'><Icon path={mdiGithub} size={1} /></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
