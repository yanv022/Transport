import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Route } from '../../types';
import { authFetch } from '../../utils/authFetch';
import ManagerRouteCard from '../../components/manager/ManagerRouteCard';

const ManagerDashboardPage = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        authFetch('/routes/agency')
            .then(setRoutes)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard Agence</h1>

            <Link
                to="/manager/routes/new"
                className="inline-block mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                + Ajouter un trajet
            </Link>

            {loading && <p>Chargement des trajets...</p>}

            {error && <p className="text-red-600">{error}</p>}

            {!loading && routes.length === 0 && (
                <p className="text-gray-500">Aucun trajet pour votre agence.</p>
            )}

            <div className="grid gap-4 mt-6">
                {routes.map(route => (
                    <ManagerRouteCard key={route.id} route={route} />
                ))}
            </div>
        </div>
    );
};

export default ManagerDashboardPage;
