import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../utils/authFetch';
import ManagerRouteCard from '../../components/manager/ManagerRouteCard';
import { Route } from '../../types';

const ManagerDashboardPage = () => {
    const navigate = useNavigate();

    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);

    // filtres
    const [dateFilter, setDateFilter] = useState('');
    const [departureFilter, setDepartureFilter] = useState('');

    useEffect(() => {
        authFetch<Route[]>('/routes/agency')
            .then(data => setRoutes(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // 🔎 FILTRAGE
    const filteredRoutes = useMemo(() => {
        return routes.filter(route => {
            const matchesCity = departureFilter
                ? route.departureCity
                    .toLowerCase()
                    .includes(departureFilter.toLowerCase())
                : true;

            const matchesDate = dateFilter
                ? route.departureTime.startsWith(dateFilter)
                : true;

            return matchesCity && matchesDate;
        });
    }, [routes, dateFilter, departureFilter]);

    // 📊 KPI simples
    const totalRoutes = filteredRoutes.length;

    if (loading) {
        return <div className="p-6">Chargement…</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Dashboard Agence</h1>

                <button
                    onClick={() => navigate('/manager/routes/new')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Ajouter un trajet
                </button>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Total trajets</p>
                    <p className="text-2xl font-bold">{totalRoutes}</p>
                </div>
            </div>

            {/* FILTRES */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="date"
                    value={dateFilter}
                    onChange={e => setDateFilter(e.target.value)}
                    className="border p-2 rounded w-full sm:w-auto"
                />

                <input
                    type="text"
                    placeholder="Ville de départ"
                    value={departureFilter}
                    onChange={e => setDepartureFilter(e.target.value)}
                    className="border p-2 rounded w-full sm:w-auto"
                />
            </div>

            {/* LISTE DES ROUTES */}
            {filteredRoutes.length === 0 ? (
                <p className="text-gray-500">Aucun trajet trouvé</p>
            ) : (
                <div className="grid gap-4">
                    {filteredRoutes.map(route => (
                        <ManagerRouteCard key={route.id} route={route} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManagerDashboardPage;
