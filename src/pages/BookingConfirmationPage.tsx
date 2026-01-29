import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Breadcrumb, TicketDisplay } from '../components';
import { mockRoutes } from '../data/mockData';
import { useSearch } from '../context/SearchContext';
import { Passenger } from '../components/PassengerForm';

interface BookingInfo {
  routeId: string;
  date: string;
  seats: number;
  totalPrice: number;
  passengers?: Passenger[];
}

export const BookingConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams } = useSearch();
  const [booking, setBooking] = useState<BookingInfo | null>(null);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  useEffect(() => {
    const bookingData = localStorage.getItem('currentBooking');
    if (bookingData) {
      const parsed = JSON.parse(bookingData);
      setBooking(parsed);
      const number = 'FV' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setConfirmationNumber(number);
    }
  }, []);

  const route = booking ? mockRoutes.find(r => r.id === booking.routeId) : null;

  if (!booking || !route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Aucune réservation trouvée</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  if (!booking.passengers || booking.passengers.length === 0) {
    navigate('/passengers');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Résultats', href: '/routes' },
            { label: 'Détails du trajet', href: `/route/${route.id}` },
            { label: 'Confirmation de réservation' },
          ]}
        />

        <TicketDisplay
          confirmationNumber={confirmationNumber}
          route={route}
          bookingInfo={{
            date: booking.date,
            seats: booking.seats,
            totalPrice: booking.totalPrice,
          }}
          passengers={booking.passengers}
        />
      </div>
    </div>
  );
};
