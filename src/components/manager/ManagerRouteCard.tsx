import { Link } from 'react-router-dom';
import { Route } from '../../types';

interface Props {
    route: Route;
}

const ManagerRouteCard = ({ route }: Props) => {
    return (
        <div className="border rounded p-4 flex justify-between items-center">
            <div>
                <h2 className="font-semibold">
                    {route.departureCity} → {route.arrivalCity}
                </h2>
                <p className="text-sm text-gray-600">
                    {route.company}
                </p>
            </div>

            <Link
                to={`/manager/routes/${route.id}/schedules`}
                className="text-blue-600 hover:underline"
            >
                Gérer horaires
            </Link>
        </div>
    );
};

export default ManagerRouteCard;
