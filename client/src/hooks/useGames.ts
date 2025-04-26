import { useQuery } from '@tanstack/react-query';

const useGames = () =>
    useQuery({
        queryKey: [`games`],
        queryFn: async () : Promise<client.objects.IGame[]> => {
            return (await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/games`)).json();
        },
        staleTime: 1000 * 60 * 5,
    });

export default useGames;