import { Route, User, UserRole } from '../types';

/**
 * Génère les horaires entre deux dates, toutes les 3 heures,
 * entre 05:15 et 21:15.
 */
const generateSchedules = (
  startDate: string,
  endDate: string,
  basePrice: number
) => {
  const schedules: {
    date: string;
    time: string;
    availableSeats: number;
    price: number;
  }[] = [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    let hour = 5;
    let minute = 15;

    while (hour <= 21) {
      const departure = new Date(date);
      departure.setHours(hour, minute, 0, 0);

      const priceVariation = Math.floor(Math.random() * 2000) - 1000;

      schedules.push({
        date: departure.toISOString().split('T')[0],
        time: departure.toTimeString().slice(0, 5),
        availableSeats: Math.floor(Math.random() * 20) + 10,
        price: Math.max(basePrice + priceVariation, basePrice - 1000),
      });

      hour += 3;
    }
  }

  return schedules;
};

const START_DATE = '2025-02-01';
const END_DATE = '2025-02-13';

export const mockRoutes: Route[] = [
  {
    id: 'route-1',
    departureCity: 'Douala',
    arrivalCity: 'Yaoundé',
    departureTime: '07:00',
    arrivalTime: '11:30',
    duration: '4h 30min',
    company: 'Finexs Express',
    amenities: ['Climatisation', 'WiFi', 'Toilettes'],
    schedules: generateSchedules(START_DATE, END_DATE, 8000),
  },
  {
    id: 'route-2',
    departureCity: 'Bafoussam',
    arrivalCity: 'Douala',
    departureTime: '06:15',
    arrivalTime: '12:15',
    duration: '6h',
    company: 'Finexs Voyage',
    amenities: ['Climatisation'],
    schedules: generateSchedules(START_DATE, END_DATE, 6000),
  },
  {
    id: 'route-3',
    departureCity: 'Ngaoundéré',
    arrivalCity: 'Yaoundé',
    departureTime: '18:00',
    arrivalTime: '03:00',
    duration: '9h',
    company: 'Finexs Night',
    amenities: ['Climatisation', 'Lits couchettes'],
    schedules: generateSchedules(START_DATE, END_DATE, 12000),
  },
  {
    id: 'route-4',
    departureCity: 'Yaoundé',
    arrivalCity: 'Douala',
    departureTime: '08:30',
    arrivalTime: '13:00',
    duration: '4h 30min',
    company: 'Finexs Express',
    amenities: ['Climatisation', 'WiFi'],
    schedules: generateSchedules(START_DATE, END_DATE, 7500),
  },
];

export const getCities = (): string[] => {
  const cities = new Set<string>();
  mockRoutes.forEach(route => {
    cities.add(route.departureCity);
    cities.add(route.arrivalCity);
  });
  return Array.from(cities).sort();
};

export const mockUsers: Record<string, User & { password: string }> = {
  admin: {
    id: 'user-1',
    email: 'admin@system.com',
    name: 'Admin Système',
    role: UserRole.ADMIN,
    password: 'password123',
  },
  manager: {
    id: 'user-2',
    email: 'manager@finexs.com',
    name: 'Manager Finexs',
    role: UserRole.MANAGER,
    password: 'password123',
  },
  traveler: {
    id: 'user-3',
    email: 'traveler@email.com',
    name: 'Voyageur Client',
    role: UserRole.TRAVELER,
    password: 'password123',
  },
};

export const authenticate = (email: string, password: string): User | null => {
  const user = Object.values(mockUsers).find(u => u.email === email);
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

export const getUserByRole = (role: UserRole): (User & { password: string }) | undefined => {
  return Object.values(mockUsers).find(u => u.role === role);
};
