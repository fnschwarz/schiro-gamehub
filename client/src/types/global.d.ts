declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.module.css' {
    const content: { [className: string]: string };
    export default content;
}

namespace client {
    namespace context {
        interface IGameListReload {
            reloadTrigger: boolean;
            setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
        }
    }

    namespace props {
        interface Game {
            id: number;
            name: string;
            steam_link: string;
            header_image: string;
        }

        interface GameId {
            id: number;
        }

        interface Button {
            isFocused: boolean;
        }
    }

    namespace objects {
        interface Game {
            id: number;
            name: string;
            steam_link: string;
            header_image: string;
        }
    }
}