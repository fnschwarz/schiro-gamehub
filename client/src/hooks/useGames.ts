import { API_BASE_URL } from '../configs/env.config';
import { useQuery } from '@tanstack/react-query';

const useGames = () =>
    useQuery({
        queryKey: [`games`],
        queryFn: async () : Promise<client.objects.Game[]> => {
            const response = await (await fetch(`${API_BASE_URL}/api/games`)).json();
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });

export default useGames;
