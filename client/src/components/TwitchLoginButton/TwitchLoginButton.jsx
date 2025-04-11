import style from './TwitchLoginButton.module.css';

function TwitchLoginButton() {
    return (
        <button className={style['twitch-login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/twitch`}>
            Login with Twitch
        </button>
    );
}

export default TwitchLoginButton;