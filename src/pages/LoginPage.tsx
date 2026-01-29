import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { getUserByRole } from '../data/mockData';
import { LogIn } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.TRAVELER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const user = getUserByRole(selectedRole);
    if (user) {
      setEmail(user.email);
      setPassword('');
    }
  }, [selectedRole]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Email ou mot de passe incorrect');
      setPassword('');
    }
    setIsLoading(false);
  };

  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return { label: 'Admin Système', color: 'from-red-500 to-red-600', icon: '⚙️' };
      case UserRole.MANAGER:
        return { label: 'Agence de Voyage', color: 'from-blue-500 to-blue-600', icon: '🏢' };
      case UserRole.TRAVELER:
        return { label: 'Voyageur', color: 'from-green-500 to-green-600', icon: '✈️' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-8">
            <div className="flex items-center justify-center mb-3">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white text-center">FinexsVoyage</h1>
            <p className="text-slate-200 text-center text-sm mt-1">Système de Réservation</p>
          </div>

          <div className="px-8 py-8">
            <p className="text-slate-600 font-semibold mb-4 text-sm">Sélectionnez votre rôle</p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[UserRole.TRAVELER, UserRole.MANAGER, UserRole.ADMIN].map((role) => {
                const config = getRoleConfig(role);
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 rounded-lg font-semibold transition-all duration-300 flex flex-col items-center justify-center ${
                      isSelected
                        ? `bg-gradient-to-br ${config.color} text-white shadow-lg scale-105`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">{config.icon}</span>
                    <span className="text-xs text-center">{config.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                  placeholder="exemple@email.com"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-2">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                  placeholder="Entrez votre mot de passe"
                />
                <p className="text-xs text-slate-500 mt-1">Indice: password123</p>
              </div>

              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin">⟳</span>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Se Connecter
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                <strong>Comptes de test disponibles:</strong>
              </p>
              <ul className="text-xs text-slate-500 mt-2 space-y-1">
                <li>• Admin: admin@system.com</li>
                <li>• Agence: manager@finexs.com</li>
                <li>• Voyageur: traveler@email.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
