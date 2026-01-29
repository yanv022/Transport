import React, { createContext, useContext, useState } from 'react';
import { SearchParams } from '../types';

interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    departureCity: '',
    arrivalCity: '',
    date: new Date().toISOString().split('T')[0],
    seats: 1,
  });

  const clearSearch = () => {
    setSearchParams({
      departureCity: '',
      arrivalCity: '',
      date: new Date().toISOString().split('T')[0],
      seats: 1,
    });
  };

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
