import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from '../../utils/authFetch';
import Toast from '../../components/ui/Toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { Route } from '../../types';

const EditRoutePage = () => {
    const { routeId } = useParams();
    const navigate = useNavigate();

    const [route, setRoute] = useState<Route | null>(null);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        departureCity: '',
        arrivalCity: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        amenities: '',
    });

    const [toast, setToast] = useState<{
        message: string;
        type?: 'success' | 'error';
    } | null>(null);

    const [confirmDelete, setConfirmDelete] = useState(false);

    // 🔹 Charger la route
    useEffect(() => {
        authFetch<Route>(`/routes/${routeId}`)
            .then((data) => {
                setRoute(data);
                setForm({
                    departureCity: data.departureCity,
                    arrivalCity: data.arrivalCity,
                    departureTime: data.departureTime.slice(0, 16),
                    arrivalTime: data.arrivalTime.slice(0, 16),
                    duration: String(data.duration),
                    amenities: data.amenities?.join(', ') || '',
                });
            })
            .catch(() =>
                setToast({
                    message: 'Erreur lors du chargement du trajet',
                    type: 'error',
                })
            )
            .finally(() => setLoading(false));
    }, [routeId]);

    if (loading) {
        return <p className="p-6">Chargement...</p>;
    }

    if (!route) {
        return <p className="p-6 text-red-600">Trajet introuvable</p>;
    }

    // 🔹 Modifier (PAS de navigation)
    const handleUpdate = async () => {
        try {
            await authFetch(`/routes/${routeId}`, 'PUT', {
                departureCity: form.departureCity,
                arrivalCity: form.arrivalCity,
                departureTime: form.departureTime,
                arrivalTime: form.arrivalTime,
                duration: Number(form.duration),
                amenities: form.amenities
                    .split(',')
                    .map((a) => a.trim())
                    .filter(Boolean),
            });

            setToast({
                message: 'Le trajet a été modifié avec succès',
                type: 'success',
            });
        } catch {
            setToast({
                message: 'Erreur lors de la modification',
                type: 'error',
            });
        }
    };

    // 🔹 Supprimer (confirmation + navigation)
    const handleDelete = async () => {
        try {
            await authFetch(`/routes/${routeId}`, 'DELETE');

            setToast({
                message: 'Le trajet a été supprimé',
                type: 'success',
            });

            setTimeout(() => {
                navigate('/manager/routes');
            }, 1200);
        } catch {
            setToast({
                message: 'Erreur lors de la suppression',
                type: 'error',
            });
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Modifier le trajet</h1>

            <div className="space-y-4">
                <input
                    value={form.departureCity}
                    onChange={(e) =>
                        setForm({ ...form, departureCity: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Ville de départ"
                />

                <input
                    value={form.arrivalCity}
                    onChange={(e) =>
                        setForm({ ...form, arrivalCity: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Ville d’arrivée"
                />

                <input
                    type="datetime-local"
                    value={form.departureTime}
                    onChange={(e) =>
                        setForm({ ...form, departureTime: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    type="datetime-local"
                    value={form.arrivalTime}
                    onChange={(e) =>
                        setForm({ ...form, arrivalTime: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    value={form.duration}
                    onChange={(e) =>
                        setForm({ ...form, duration: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Durée (minutes)"
                />

                <textarea
                    value={form.amenities}
                    onChange={(e) =>
                        setForm({ ...form, amenities: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Services (WiFi, Climatisation)"
                />

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Enregistrer
                    </button>

                    <button
                        onClick={() => setConfirmDelete(true)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Supprimer
                    </button>
                </div>
            </div>

            {/* 🔥 Confirmation suppression */}
            <ConfirmModal
                isOpen={confirmDelete}
                title="Supprimer le trajet"
                message="Cette action est irréversible. Voulez-vous continuer ?"
                confirmLabel="Supprimer"
                confirmColor="red"
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
            />

            {/* 🔔 Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default EditRoutePage;
