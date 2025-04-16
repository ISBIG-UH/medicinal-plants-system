import { useLocation } from 'react-router';

export const RouteDisplay: React.FC = () => {
    const location = useLocation();
    return <div>{location.pathname}</div>;
};
