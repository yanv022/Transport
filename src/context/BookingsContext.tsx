import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking } from '../types';
import { storageUtils } from '../utils/storage';

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (bookingId: string) => void;
  updateBooking: (bookingId: string, updates: Partial<Booking>) => void;
  getBookingById: (bookingId: string) => Booking | null;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export const BookingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = () => {
    const stored = storageUtils.getBookings();
    setBookings(stored);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const addBooking = (booking: Booking) => {
    storageUtils.saveBooking(booking);
    setBookings(prev => [...prev, booking]);
  };

  const removeBooking = (bookingId: string) => {
    storageUtils.deleteBooking(bookingId);
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const updateBooking = (bookingId: string, updates: Partial<Booking>) => {
    storageUtils.updateBooking(bookingId, updates);
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, ...updates } : b))
    );
  };

  const getBookingById = (bookingId: string): Booking | null => {
    return bookings.find(b => b.id === bookingId) || null;
  };

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        addBooking,
        removeBooking,
        updateBooking,
        getBookingById,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};
