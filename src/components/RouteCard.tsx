import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, DollarSign, Armchair } from 'lucide-react';
import { Route, RouteSchedule } from '../types';

interface RouteCardProps {
  route: Route;
  schedule: RouteSchedule;
  selectedDate: string;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, schedule, selectedDate }) => {
  const hasAvailability = schedule.availableSeats > 0;

  return (
    <Link
      to={`/route/${route.id}?date=${selectedDate}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 md:p-6 border border-gray-200"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-2 mb-4 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">DÉPART</p>
              <p className="text-3xl font-bold text-blue-900">{route.departureTime}</p>
              <p className="text-xs text-gray-600 mt-1">{route.departureCity}</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Clock size={24} className="text-gray-400 mb-2" />
              <p className="text-sm font-semibold text-gray-700">{route.duration}</p>
              <p className="text-xs text-gray-500 mt-1">durée</p>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold text-gray-600 mb-1">ARRIVÉE</p>
              <p className="text-3xl font-bold text-green-700">{route.arrivalTime}</p>
              <p className="text-xs text-gray-600 mt-1">{route.arrivalCity}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs mb-2">
            {route.amenities.map(amenity => (
              <span key={amenity} className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-500 font-medium">{route.company}</p>
        </div>

        <div className="border-t md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0 flex justify-between md:flex-col md:text-right gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Prix par place</p>
            <p className="text-2xl font-bold text-green-600">{schedule.price.toLocaleString()} F</p>
          </div>

          <div className={`flex items-center gap-1 text-sm font-semibold ${hasAvailability ? 'text-green-600' : 'text-red-600'}`}>
            {hasAvailability ? (
              <>
                <Users size={16} />
                <span>{schedule.availableSeats} places</span>
              </>
            ) : (
              <>
                <Armchair size={16} />
                <span>Complet</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
