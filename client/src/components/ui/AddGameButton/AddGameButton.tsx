import style from './AddGameButton.module.css';

function AddGameButton({ isFocused, onClick }: client.props.Button){
    return(
        <button className={`${style['add-game-button']} ${isFocused ? style.focused : ''}`} onClick={onClick}>
            Add Game
        </button>
    );
}

export default AddGameButton;
