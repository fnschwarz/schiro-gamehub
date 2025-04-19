import style from './LoginButton.module.css';
import useAuthQuery from '../../../../hooks/useAuthQuery.ts';

function LoginButton() {
    const { data: isAuthenticated } = useAuthQuery();

    if(isAuthenticated){
        return (
            <button className={style['login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`}>
                Logout
            </button>
        )
    }

    return (
        <button className={style['login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/login`}>
            Login with Twitch
        </button>
    );
}

export default LoginButton;