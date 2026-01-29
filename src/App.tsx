import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import { Header, Footer } from './components';
import { HomePage, RoutesListPage, RouteDetailPage, PassengerFormPage, BookingConfirmationPage } from './pages';

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/routes" element={<RoutesListPage />} />
              <Route path="/route/:routeId" element={<RouteDetailPage />} />
              <Route path="/passengers" element={<PassengerFormPage />} />
              <Route path="/confirmation" element={<BookingConfirmationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
