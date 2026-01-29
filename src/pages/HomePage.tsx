import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { RouteCard } from '../components/RouteCard';
import { mockRoutes } from '../data/mockData';

export const HomePage: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const popularRoutes = mockRoutes.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Voyagez avec Finexs-Voyages</h1>
          <p className="text-lg text-blue-100 mb-8">
            Trouvez et réservez vos trajets interurbains simplement et rapidement
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 mb-12 relative z-10">
        <SearchBar />
      </div>

      <div className="max-w-7xl mx-auto px-4 flex-1 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trajets populaires</h2>
        <div className="space-y-4">
          {popularRoutes.map(route => {
            const schedule = route.schedules.find(s => s.date === today) || route.schedules[0];
            return (
              <RouteCard
                key={route.id}
                route={route}
                schedule={schedule}
                selectedDate={schedule.date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
