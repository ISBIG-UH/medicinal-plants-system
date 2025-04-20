import { useLocation, useNavigate } from 'react-router';

export const RouteDisplay: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            {location.pathname}
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};
