import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bus, LogOut, User } from 'lucide-react';
import { BRANDING } from '../constants';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'text-red-400';
      case UserRole.MANAGER:
        return 'text-blue-400';
      case UserRole.TRAVELER:
        return 'text-green-400';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'Admin Système';
      case UserRole.MANAGER:
        return 'Agence de Voyage';
      case UserRole.TRAVELER:
        return 'Voyageur';
    }
  };

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Bus size={28} className="text-green-400" />
            <div>
              <h1 className="text-xl font-bold">{BRANDING.name}</h1>
              <p className="text-xs text-gray-300">{BRANDING.tagline}</p>
            </div>
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={20} className={getRoleColor(user.role)} />
                <div className="text-right">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className={`text-xs ${getRoleColor(user.role)}`}>{getRoleLabel(user.role)}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-semibold"
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
