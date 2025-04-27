import { useQuery } from '@tanstack/react-query';

const useAuth = () =>
    useQuery({
        queryKey: ['authenticate'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`, { credentials: 'include' });
            return response.ok;
        },
        staleTime: 1000 * 60 * 5,
    });

export default useAuth;