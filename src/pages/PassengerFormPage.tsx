import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, PassengerForm } from '../components';
import { mockRoutes } from '../data/mockData';
import { useSearch } from '../context/SearchContext';
import { Passenger } from '../components/PassengerForm';

export const PassengerFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams } = useSearch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booking, setBooking] = useState<any>(null);

  React.useEffect(() => {
    const bookingData = localStorage.getItem('currentBooking');
    if (bookingData) {
      setBooking(JSON.parse(bookingData));
    }
  }, []);

  const route = booking ? mockRoutes.find(r => r.id === booking.routeId) : null;

  if (!booking || !route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Aucune réservation trouvée</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (passengers: Passenger[]) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const passengerData = {
      routeId: booking.routeId,
      date: booking.date,
      seats: booking.seats,
      totalPrice: booking.totalPrice,
      passengers,
    };

    localStorage.setItem('currentBooking', JSON.stringify(passengerData));
    setIsSubmitting(false);
    navigate('/confirmation');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Résultats', href: '/routes' },
            { label: 'Détails du trajet', href: `/route/${route.id}` },
            { label: 'Informations des passagers' },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Informations des passagers
          </h1>
          <p className="text-gray-600">
            {route.departureCity} → {route.arrivalCity} · {formatDate(booking.date)} · {booking.seats} place{booking.seats !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PassengerForm
              numberOfSeats={booking.seats}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Résumé</h2>

              <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Trajet</span>
                  <span className="font-semibold text-gray-900">
                    {route.departureCity} → {route.arrivalCity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold text-gray-900">{formatDate(booking.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heure de départ</span>
                  <span className="font-semibold text-gray-900">{route.departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Places</span>
                  <span className="font-semibold text-gray-900">{booking.seats}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-green-600 text-lg">
                  {booking.totalPrice.toLocaleString()} F
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 text-center">
                  Vous serez redirigé vers la confirmation après validation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
