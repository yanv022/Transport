import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {authFetch} from '../../utils/authFetch';

const CreateRoutePage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        departureCity: '',
        arrivalCity: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        amenities: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const payload = {
                departureCity: form.departureCity,
                arrivalCity: form.arrivalCity,
                departureTime: form.departureTime,
                arrivalTime: form.arrivalTime,
                duration: Number(form.duration),
                amenities: form.amenities
                    .split(',')
                    .map(a => a.trim())
                    .filter(Boolean)
            };

            console.log('CREATE ROUTE PAYLOAD', payload);


            await authFetch('/routes', 'POST', payload);



            // ✅ Succès → retour dashboard manager
            navigate('/manager', { replace: true });
        } catch (err: any) {
            setError(err.message || 'Erreur inconnue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Créer un trajet</h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="departureCity"
                    placeholder="Ville de départ"
                    value={form.departureCity}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <input
                    name="arrivalCity"
                    placeholder="Ville d’arrivée"
                    value={form.arrivalCity}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <input
                    type="datetime-local"
                    name="departureTime"
                    value={form.departureTime}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <input
                    type="datetime-local"
                    name="arrivalTime"
                    value={form.arrivalTime}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    name="duration"
                    placeholder="Durée (minutes)"
                    value={form.duration}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="amenities"
                    placeholder="Services (ex: WiFi, Climatisation)"
                    value={form.amenities}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Création...' : 'Créer le trajet'}
                </button>
            </form>
        </div>
    );
};

export default CreateRoutePage;
