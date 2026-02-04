import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingsProvider } from './context/BookingsContext';
import { Header, Footer } from './components';
import { HomePage, RoutesListPage, RouteDetailPage, PassengerFormPage, BookingConfirmationPage, LoginPage } from './pages';

import ManagerDashboardPage from './pages/manager/ManagerDashboardPage';
import CreateRoutePage from './pages/manager/CreateRoutePage';
import ManageSchedulesPage from './pages/manager/ManageSchedulesPage';

function AppContent() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <Routes>
                    {/* PUBLIC */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* PROTÉGÉ */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/routes"
                        element={
                            <PrivateRoute>
                                <RoutesListPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/route/:routeId"
                        element={
                            <PrivateRoute>
                                <RouteDetailPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/passengers"
                        element={
                            <PrivateRoute>
                                <PassengerFormPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/confirmation"
                        element={
                            <PrivateRoute>
                                <BookingConfirmationPage />
                            </PrivateRoute>
                        }
                    />

                    {/* MANAGER */}
                    <Route
                        path="/manager"
                        element={
                            <ManagerRoute>
                                <ManagerDashboardPage />
                            </ManagerRoute>
                        }
                    />

                    <Route
                        path="/manager/routes/new"
                        element={
                            <ManagerRoute>
                                <CreateRoutePage />
                            </ManagerRoute>
                        }
                    />

                    <Route
                        path="/manager/routes/:routeId/schedules"
                        element={
                            <ManagerRoute>
                                <ManageSchedulesPage />
                            </ManagerRoute>
                        }
                    />

                    {/* FALLBACK */}
                    <Route path="*" element={<Navigate to="/" replace />} />
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
        <BookingsProvider>
          <SearchProvider>
            <AppContent />
          </SearchProvider>
        </BookingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}



const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const ManagerRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user?.role === 'MANAGER' ? children : <Navigate to="/" replace />;
};


export default App;
