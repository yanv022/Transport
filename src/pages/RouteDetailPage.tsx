import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, SeatSelector, DatePicker } from '../components';
import { mockRoutes } from '../data/mockData';
import { useSearch } from '../context/SearchContext';
import { Clock, MapPin, Users, Wifi, Wind, Droplet, AlertCircle } from 'lucide-react';

export const RouteDetailPage: React.FC = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setSearchParams } = useSearch();
  const [seats, setSeats] = useState(1);
  const [selectedDate, setSelectedDate] = useState(searchParams.get('date') || new Date().toISOString().split('T')[0]);
  const [isBooking, setIsBooking] = useState(false);

  const route = useMemo(() => mockRoutes.find(r => r.id === routeId), [routeId]);
  const schedule = useMemo(() => {
    if (!route) return null;
    return route.schedules.find(s => s.date === selectedDate) || route.schedules[0];
  }, [route, selectedDate]);

  const totalPrice = useMemo(() => {
    return (schedule?.price || 0) * seats;
  }, [schedule, seats]);

  if (!route || !schedule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Trajet non trouvé</h2>
        </div>
      </div>
    );
  }

  const amenityIcons: Record<string, React.ReactNode> = {
    'Climatisation': <Wind size={18} />,
    'WiFi': <Wifi size={18} />,
    'Toilettes': <Droplet size={18} />,
    'Snacks': <Users size={18} />,
    'Lits couchettes': <Users size={18} />,
  };

  const handleBooking = async () => {
    setIsBooking(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const bookingData = {
      routeId: route.id,
      date: selectedDate,
      seats,
      totalPrice,
    };

    localStorage.setItem('currentBooking', JSON.stringify(bookingData));

    setSearchParams({
      departureCity: route.departureCity,
      arrivalCity: route.arrivalCity,
      date: selectedDate,
      seats,
    });

    setIsBooking(false);
    navigate('/passengers');
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
            { label: 'Détails du trajet' },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {route.departureCity} → {route.arrivalCity}
              </h1>
              <p className="text-gray-600 mb-6">{route.company}</p>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6 border-2 border-blue-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-r border-gray-300 pr-4">
                    <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Heure de départ</p>
                    <p className="text-4xl font-bold text-blue-900">{route.departureTime}</p>
                    <p className="text-sm text-gray-700 font-medium mt-2">{route.departureCity}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <Clock size={28} className="text-gray-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-700">{route.duration}</p>
                    <p className="text-xs text-gray-600 mt-1">durée du trajet</p>
                  </div>

                  <div className="border-l border-gray-300 pl-4 text-right">
                    <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Heure d'arrivée</p>
                    <p className="text-4xl font-bold text-green-700">{route.arrivalTime}</p>
                    <p className="text-sm text-gray-700 font-medium mt-2">{route.arrivalCity}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Équipements</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {route.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600">{amenityIcons[amenity] || <Users size={18} />}</span>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Disponibilité:</strong> {schedule.availableSeats} place{schedule.availableSeats !== 1 ? 's' : ''} disponible{schedule.availableSeats !== 1 ? 's' : ''} pour cette date
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Réservation</h2>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sélectionner la date</label>
                <DatePicker
                  selectedDate={selectedDate}
                  onDateChange={date => setSelectedDate(date)}
                />
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">{formatDate(selectedDate)}</p>
                <SeatSelector
                  seats={seats}
                  maxSeats={Math.min(schedule.availableSeats, 8)}
                  onSeatsChange={setSeats}
                />
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Prix/place:</span>
                  <span className="font-semibold text-gray-900">{schedule.price.toLocaleString()} F</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700">Nombre de places:</span>
                  <span className="font-semibold text-gray-900">{seats}</span>
                </div>
                <div className="flex justify-between text-lg bg-green-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-green-600">{totalPrice.toLocaleString()} F</span>
                </div>
              </div>

              <Button
                variant="success"
                size="lg"
                onClick={handleBooking}
                isLoading={isBooking}
                disabled={schedule.availableSeats === 0}
              >
                Réserver maintenant
              </Button>

              {schedule.availableSeats === 0 && (
                <p className="text-sm text-red-600 mt-3 text-center">
                  Aucune place disponible pour cette date
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
