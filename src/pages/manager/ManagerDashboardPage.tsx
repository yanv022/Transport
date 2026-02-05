import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../../utils/authFetch';
import ManagerRouteCard from '../../components/manager/ManagerRouteCard';

interface Route {
    id: number;
    departureCity: string;
    arrivalCity: string;
    departureTime: string;
    arrivalTime: string;
    duration: number;
    amenities: string[];
}

const ManagerDashboardPage = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRoutes = async () => {
            try {
                const data = await authFetch<Route[]>('/routes/agency');
                setRoutes(data);
            } catch (err: any) {
                setError(err.message || 'Erreur de chargement');
            } finally {
                setLoading(false);
            }
        };

        loadRoutes();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard Agence</h1>

                <Link
                    to="/manager/routes/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + Ajouter un trajet
                </Link>
            </div>

            {loading && <p>Chargement des trajets...</p>}

            {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded mb-4">
                    {error}
                </div>
            )}

            {!loading && routes.length === 0 && (
                <p className="text-gray-500">Aucun trajet pour votre agence.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {routes.map(route => (
                    <ManagerRouteCard key={route.id} route={route} />
                ))}
            </div>
        </div>
    );
};

export default ManagerDashboardPage;
