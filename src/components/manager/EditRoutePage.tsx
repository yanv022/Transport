import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from '../../utils/authFetch';
import { Route } from '../../types';

const EditRoutePage = () => {
    const { routeId } = useParams<{ routeId: string }>();
    const navigate = useNavigate();

    const [route, setRoute] = useState<Route | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🔹 Charger la route
    useEffect(() => {
        const loadRoute = async () => {
            try {
                const data = await authFetch<Route>(`/routes/${routeId}`);
                setRoute({
                    ...data,
                    amenities: data.amenities ?? [],
                });
            } catch (e: any) {
                setError(e.message || 'Erreur de chargement');
            } finally {
                setLoading(false);
            }
        };

        loadRoute();
    }, [routeId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!route) return;

        setRoute({
            ...route,
            [e.target.name]: e.target.value,
        });
    };

    const handleAmenitiesChange = (value: string) => {
        if (!route) return;

        setRoute({
            ...route,
            amenities: value
                .split(',')
                .map(a => a.trim())
                .filter(Boolean),
        });
    };

    // 💾 Sauvegarder
    const handleSave = async () => {
        if (!route) return;

        setSaving(true);
        setError(null);

        try {
            await authFetch(`/routes/${route.id}`, 'PUT', route);
            navigate('/manager', { replace: true });
        } catch (e: any) {
            setError(e.message || 'Erreur lors de la sauvegarde');
        } finally {
            setSaving(false);
        }
    };

    // 🗑️ Supprimer
    const handleDelete = async () => {
        if (!route) return;

        const confirm = window.confirm('Supprimer définitivement cette route ?');
        if (!confirm) return;

        try {
            await authFetch(`/routes/${route.id}`, 'DELETE');
            navigate('/manager', { replace: true });
        } catch (e: any) {
            setError(e.message || 'Erreur lors de la suppression');
        }
    };

    if (loading) return <div className="p-6">Chargement…</div>;

    if (!route) return <div className="p-6 text-red-600">Route introuvable</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Modifier la route</h1>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded">
                    {error}
                </div>
            )}

            <div className="grid gap-4">
                <input
                    name="departureCity"
                    value={route.departureCity}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    placeholder="Ville de départ"
                />

                <input
                    name="arrivalCity"
                    value={route.arrivalCity}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    placeholder="Ville d’arrivée"
                />

                <input
                    type="datetime-local"
                    name="departureTime"
                    value={route.departureTime.slice(0, 16)}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="datetime-local"
                    name="arrivalTime"
                    value={route.arrivalTime.slice(0, 16)}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="duration"
                    value={route.duration}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    placeholder="Durée (minutes)"
                />

                <textarea
                    value={route.amenities.join(', ')}
                    onChange={e => handleAmenitiesChange(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Services (WiFi, Climatisation...)"
                />
            </div>

            <div className="flex justify-between pt-6">
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Supprimer
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/manager')}
                        className="px-4 py-2 border rounded"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {saving ? 'Enregistrement…' : 'Enregistrer'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditRoutePage;
