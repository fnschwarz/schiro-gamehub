import style from './LoginButton.module.css';
import { API_BASE_URL } from '../../../../configs/api.config.ts';
import Icon from '@mdi/react';
import { mdiTwitch, mdiLogout } from '@mdi/js';
import useAuth from '../../../../hooks/useAuth.ts';

function LoginButton() {
    const { data: isAuthenticated } = useAuth();

    if(isAuthenticated){
        return (
            <a href={`${API_BASE_URL}/api/auth/logout`}>
                <button className={style['logout-button']}>
                    <Icon path={mdiLogout} size={0.9} />
                    Logout
                </button>
            </a>
        )
    }

    return (
        <a href={`${API_BASE_URL}/api/auth/twitch`}>
            <button className={style['login-button']}>
                <Icon path={mdiTwitch} size={0.9} />
                Login with Twitch
            </button>
        </a>
    );
}

export default LoginButton;