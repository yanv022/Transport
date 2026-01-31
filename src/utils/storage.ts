import { Booking } from '../types';

const BOOKINGS_KEY = 'bus_bookings';
const ROUTES_STATE_KEY = 'bus_routes_state';

export const storageUtils = {
  getBookings: (): Booking[] => {
    try {
      const stored = localStorage.getItem(BOOKINGS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveBooking: (booking: Booking): void => {
    const bookings = storageUtils.getBookings();
    bookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  },

  updateBooking: (id: string, updates: Partial<Booking>): void => {
    const bookings = storageUtils.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updates };
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    }
  },

  deleteBooking: (id: string): void => {
    const bookings = storageUtils.getBookings();
    const filtered = bookings.filter(b => b.id !== id);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
  },

  getBookingById: (id: string): Booking | null => {
    const bookings = storageUtils.getBookings();
    return bookings.find(b => b.id === id) || null;
  },

  getRouteState: (): Record<string, any> => {
    try {
      const stored = localStorage.getItem(ROUTES_STATE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  },

  saveRouteState: (state: Record<string, any>): void => {
    localStorage.setItem(ROUTES_STATE_KEY, JSON.stringify(state));
  },

  clearAllData: (): void => {
    localStorage.removeItem(BOOKINGS_KEY);
    localStorage.removeItem(ROUTES_STATE_KEY);
  },
};
