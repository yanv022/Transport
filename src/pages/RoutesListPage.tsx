import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, RouteCard, Button } from '../components';
import { mockRoutes } from '../data/mockData';
import { useSearch } from '../context/SearchContext';
import { AlertCircle } from 'lucide-react';

export const RoutesListPage: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams } = useSearch();
  const [sortBy, setSortBy] = useState<'price' | 'time'>('time');

  const filteredRoutes = useMemo(() => {
    return mockRoutes.filter(route => {
      const departureMatch = route.departureCity === searchParams.departureCity;
      const arrivalMatch = route.arrivalCity === searchParams.arrivalCity;
      return departureMatch && arrivalMatch;
    });
  }, [searchParams]);

  const sortedRoutes = useMemo(() => {
    const routes = [...filteredRoutes];
    if (sortBy === 'price') {
      routes.sort((a, b) => {
        const scheduleA = a.schedules.find(s => s.date === searchParams.date) || a.schedules[0];
        const scheduleB = b.schedules.find(s => s.date === searchParams.date) || b.schedules[0];
        return scheduleA.price - scheduleB.price;
      });
    } else {
      routes.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }
    return routes;
  }, [filteredRoutes, sortBy, searchParams.date]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const hasResults = sortedRoutes.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Résultats de recherche' },
          ]}
        />

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {searchParams.departureCity} → {searchParams.arrivalCity}
          </h1>
          <p className="text-gray-600 mb-4">
            Trajet du {formatDate(searchParams.date)} • {searchParams.seats} place{searchParams.seats > 1 ? 's' : ''}
          </p>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Button variant="secondary" size="md" onClick={() => navigate('/')}>
              Modifier la recherche
            </Button>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Trier par:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'price' | 'time')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value="time">Heure de départ</option>
                <option value="price">Prix (moins cher)</option>
              </select>
            </div>
          </div>
        </div>

        {hasResults ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              {sortedRoutes.length} trajet{sortedRoutes.length > 1 ? 's' : ''} trouvé{sortedRoutes.length > 1 ? 's' : ''}
            </p>
            {sortedRoutes.map(route => {
              const schedule = route.schedules.find(s => s.date === searchParams.date) || route.schedules[0];
              return (
                <RouteCard
                  key={route.id}
                  route={route}
                  schedule={schedule}
                  selectedDate={searchParams.date}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Aucun trajet disponible</h2>
            <p className="text-gray-600 mb-6">
              Nous n'avons pas trouvé de trajet pour cette route à cette date. Veuillez modifier votre recherche.
            </p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Rechercher d'autres trajets
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
