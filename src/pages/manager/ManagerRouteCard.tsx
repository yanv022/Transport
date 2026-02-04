import { Route } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
    route: Route;
}

const ManagerRouteCard = ({ route }: Props) => {
    return (
        <div className="border rounded p-4 shadow-sm bg-white">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg">
                        {route.departureCity} → {route.arrivalCity}
                    </h3>
                    <p className="text-sm text-gray-600">
                        Durée: {route.duration} min
                    </p>
                </div>

                <Link
                    to={`/manager/routes/${route.id}/schedules`}
                    className="text-blue-600 hover:underline text-sm"
                >
                    Gérer horaires
                </Link>
            </div>
        </div>
    );
};

export default ManagerRouteCard;
