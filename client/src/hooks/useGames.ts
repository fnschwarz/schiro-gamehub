import { API_BASE_URL } from '../config/api.config';
import { useQuery } from '@tanstack/react-query';

const useGames = () =>
    useQuery({
        queryKey: [`games`],
        queryFn: async () : Promise<client.objects.IGame[]> => {
            return (await fetch(`${API_BASE_URL}/api/games`)).json();
        },
        staleTime: 1000 * 60 * 5,
    });

export default useGames;