import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { DatePicker } from './DatePicker';
import { getCities } from '../data/mockData';
import { useSearch } from '../context/SearchContext';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useSearch();
  const [localParams, setLocalParams] = useState(searchParams);
  const [isLoading, setIsLoading] = useState(false);
  const cities = getCities();

  const handleSearch = async () => {
    if (!localParams.departureCity || !localParams.arrivalCity) {
      alert('Veuillez sélectionner les villes de départ et d\'arrivée');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setSearchParams(localParams);
    setIsLoading(false);
    navigate('/routes');
  };

  const handleSwapCities = () => {
    setLocalParams({
      ...localParams,
      departureCity: localParams.arrivalCity,
      arrivalCity: localParams.departureCity,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Départ</label>
          <select
            value={localParams.departureCity}
            onChange={e => setLocalParams({ ...localParams, departureCity: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
          >
            <option value="">Sélectionner une ville</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Destination</label>
          <select
            value={localParams.arrivalCity}
            onChange={e => setLocalParams({ ...localParams, arrivalCity: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
          >
            <option value="">Sélectionner une ville</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center md:hidden">
        <button
          onClick={handleSwapCities}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Inverser les villes"
        >
          <ArrowRight size={20} className="text-blue-900 rotate-90" />
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Date du voyage</label>
        <DatePicker
          selectedDate={localParams.date}
          onDateChange={date => setLocalParams({ ...localParams, date })}
        />
      </div>

      <Button
        variant="success"
        size="lg"
        isLoading={isLoading}
        onClick={handleSearch}
        className="flex items-center justify-center gap-2"
      >
        <MapPin size={20} />
        Rechercher trajets
      </Button>
    </div>
  );
};
