import { createContext, Dispatch, SetStateAction } from "react";

interface GameListReloadContextType {
    reloadTrigger: boolean,
    setReloadTrigger: Dispatch<SetStateAction<boolean>>;
}

const GameListReloadContext = createContext<GameListReloadContextType | null>(null);

export default GameListReloadContext;