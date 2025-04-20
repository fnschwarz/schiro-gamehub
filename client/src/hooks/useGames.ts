import { useQuery } from '@tanstack/react-query';

const useGames = () =>
    useQuery({
        queryKey: [`games`],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps`);
            const gameIds = (await response.json()).apps
            
            const games = Promise.all(gameIds.map(async (id: number) => {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps/${id}`);
                return await response.json();
            }));

            return games;
        },
        staleTime: 1000 * 60 * 5,
    });

export default useGames;