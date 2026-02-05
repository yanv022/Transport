import { useNavigate } from 'react-router-dom';
import { Route } from '../../types';

interface Props {
    route: Route;
}

const ManagerRouteCard = ({ route }: Props) => {
    const navigate = useNavigate();

    if (!route) return null;

    return (
        <div
            onClick={() => navigate(`/manager/routes/${route.id}/schedules`)}
            className="
        border rounded-lg p-4 bg-white
        shadow-sm cursor-pointer
        hover:shadow-md hover:border-blue-500
        transition
      "
        >
            <h2 className="text-lg font-semibold mb-1">
                {route.departureCity} → {route.arrivalCity}
            </h2>

            <p className="text-sm text-gray-600">
                🕒 Départ : {new Date(route.departureTime).toLocaleString()}
            </p>

            <p className="text-sm text-gray-500">
                Durée : {route.duration} minutes
            </p>

            {route.amenities && route.amenities.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                    Services : {route.amenities.join(', ')}
                </p>
            )}
        </div>
    );
};

export default ManagerRouteCard;
