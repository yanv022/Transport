export interface RouteSchedule {
  date: string;
  availableSeats: number;
  price: number;
}

export interface Route {
  id: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  company: string;
  amenities: string[];
  schedules: RouteSchedule[];
}

export interface SearchParams {
  departureCity: string;
  arrivalCity: string;
  date: string;
  seats: number;
}

export interface Booking {
  id: string;
  route: Route;
  date: string;
  seats: number;
  totalPrice: number;
  timestamp: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TRAVELER = 'TRAVELER',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface CreateRoutePayload {
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  company: string;
  amenities: string[];
}

export interface CreateSchedulePayload {
  travelDate: string; // yyyy-mm-dd
  price: number;
  availableSeats: number;
}

