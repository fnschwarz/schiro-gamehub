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
        interface IGame {
            id: number;
            title: string;
            img: string;
            link: string;
            alt: string;
        }

        interface IGameId {
            id: number;
        }

        interface IButton {
            isFocused: boolean;
        }
    }
}