import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+237 6XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@finexs-voyages.cm</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Siège</h3>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>Douala, Cameroun</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Horaires</h3>
            <div className="text-sm text-gray-400">
              <p>Lun - Dim: 05:00 - 22:00</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>Finexs-Voyages &copy; 2024. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
