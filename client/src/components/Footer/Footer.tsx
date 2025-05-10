import style from './Footer.module.css';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';

function Footer(){
    return (
        <div className={style['footer-items-container']}>
            Copyright &copy; 2025 Finn Schwarz. All rights reserved.
            <a href='https://github.com/fiscdev'><Icon path={mdiGithub} size={1} /></a>
        </div>
    );
}

export default Footer;
