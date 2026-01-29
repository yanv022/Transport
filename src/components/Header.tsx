import React from 'react';
import { Link } from 'react-router-dom';
import { Bus } from 'lucide-react';
import { BRANDING } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Bus size={28} className="text-green-400" />
          <div>
            <h1 className="text-xl font-bold">{BRANDING.name}</h1>
            <p className="text-xs text-gray-300">{BRANDING.tagline}</p>
          </div>
        </Link>
      </div>
    </header>
  );
};
