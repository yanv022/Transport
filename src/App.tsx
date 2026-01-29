import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header, Footer } from './components';
import { HomePage, RoutesListPage, RouteDetailPage, PassengerFormPage, BookingConfirmationPage, LoginPage } from './pages';

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/routes" element={<RoutesListPage />} />
          <Route path="/route/:routeId" element={<RouteDetailPage />} />
          <Route path="/passengers" element={<PassengerFormPage />} />
          <Route path="/confirmation" element={<BookingConfirmationPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
