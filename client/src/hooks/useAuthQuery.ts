import { useQuery } from '@tanstack/react-query';

const useAuthQuery = () =>
    useQuery({
        queryKey: ['authenticate'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/authenticate`, { credentials: 'include' });
            return response.ok;
        },
        staleTime: 1000 * 60 * 5,
    });

export default useAuthQuery;