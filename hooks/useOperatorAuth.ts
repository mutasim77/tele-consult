import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useOperatorAuth() {
    const [operatorInfo, setOperatorInfo] = useState<{ id: string, name: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedOperatorId = localStorage.getItem('operatorId');
        const storedOperatorName = localStorage.getItem('operatorName');

        if (storedOperatorId && storedOperatorName) {
            setOperatorInfo({ id: storedOperatorId, name: storedOperatorName });
        } else {
            router.push('/operator/login');
        }
    }, [router]);

    const logout = () => {
        localStorage.removeItem('operatorId');
        localStorage.removeItem('operatorName');
        setOperatorInfo(null);
        router.push('/operator/login');
    }

    return {
        operatorInfo,
        logout
    }
}