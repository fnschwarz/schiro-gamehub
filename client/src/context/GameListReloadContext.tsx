import { createContext } from "react";

const GameListReloadContext = createContext<client.context.IGameListReload>({
    reloadTrigger: false, 
    setReloadTrigger: () => {}
});

export default GameListReloadContext;