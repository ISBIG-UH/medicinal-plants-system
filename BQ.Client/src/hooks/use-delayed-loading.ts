import { useEffect, useState } from 'react';

const useDelayedLoading = (loading: boolean, delay = 300) => {
    const [showLoading, setShowLoading] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (loading) {
                setShowLoading(true);
            } else {
                setShowLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [loading, delay]);

    return showLoading;
};

export default useDelayedLoading;
