import { API_BASE_URL } from '../configs/api.config';
import { useQuery } from '@tanstack/react-query';

const useAuth = () =>
    useQuery({
        queryKey: ['authenticate'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/api/auth`, { credentials: 'include' });
            return response.ok;
        },
        staleTime: 1000 * 60 * 5,
    });

export default useAuth;