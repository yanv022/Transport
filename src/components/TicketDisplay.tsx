import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Button } from './Button';
import { CheckCircle, Download, Copy } from 'lucide-react';
import { Passenger } from './PassengerForm';

interface TicketDisplayProps {
  confirmationNumber: string;
  route: {
    id: string;
    departureCity: string;
    arrivalCity: string;
    departureTime: string;
    arrivalTime: string;
    company: string;
    duration: string;
  };
  bookingInfo: {
    date: string;
    seats: number;
    totalPrice: number;
  };
  passengers: Passenger[];
}

export const TicketDisplay: React.FC<TicketDisplayProps> = ({
  confirmationNumber,
  route,
  bookingInfo,
  passengers,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = React.useState('');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    QRCode.toDataURL(confirmationNumber, {
      width: 200,
      margin: 1,
      color: { dark: '#000000', light: '#FFFFFF' },
    }).then(setQrCodeUrl);
  }, [confirmationNumber]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(confirmationNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.getElementById('ticket-content');
    if (element) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;

      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `billet-${confirmationNumber}.png`;
          link.click();
        };
        img.src = 'data:image/svg+xml,' + encodeURIComponent(element.outerHTML);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePrint}
        >
          Imprimer
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleDownload}
        >
          <Download size={18} />
          Télécharger
        </Button>
      </div>

      <div id="ticket-content" className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle size={32} />
              <h1 className="text-3xl font-bold">Réservation confirmée</h1>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Numéro de confirmation</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold font-mono">{confirmationNumber}</p>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-green-500 rounded-lg transition-colors"
                  title="Copier"
                >
                  <Copy size={20} />
                </button>
              </div>
              {copied && <p className="text-green-100 text-sm mt-1">Copié!</p>}
            </div>

            {qrCodeUrl && (
              <div className="bg-white p-3 rounded-lg">
                <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <p className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Départ</p>
                  <p className="text-3xl font-bold text-gray-900">{route.departureTime}</p>
                  <p className="text-sm text-gray-700 font-medium mt-2">{route.departureCity}</p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-bold text-gray-700">{route.duration}</p>
                  <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-blue-500 my-2"></div>
                  <p className="text-xs text-gray-600">durée</p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Arrivée</p>
                  <p className="text-3xl font-bold text-gray-900">{route.arrivalTime}</p>
                  <p className="text-sm text-gray-700 font-medium mt-2">{route.arrivalCity}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de voyage</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Entreprise</p>
                    <p className="font-semibold text-gray-900">{route.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(bookingInfo.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nombre de places</p>
                    <p className="font-semibold text-gray-900">{bookingInfo.seats}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Prix total</p>
                    <p className="font-bold text-green-600 text-lg">{bookingInfo.totalPrice.toLocaleString()} F</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Passagers</h3>
                <div className="space-y-3">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900">
                        {passenger.firstName} {passenger.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{passenger.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h3 className="font-bold text-gray-900 mb-4">Résumé de la réservation</h3>
                <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trajet</span>
                    <span className="font-semibold text-gray-900">
                      {route.departureCity} → {route.arrivalCity}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Places</span>
                    <span className="font-semibold text-gray-900">{bookingInfo.seats}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date</span>
                    <span className="font-semibold text-gray-900">{formatDate(bookingInfo.date)}</span>
                  </div>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-green-600 text-xl">
                    {bookingInfo.totalPrice.toLocaleString()} F
                  </span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                  <p className="text-xs text-green-800 text-center">
                    Une confirmation a été envoyée à vos adresses email
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.location.href = '/'}
                  className="w-full"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> Conservez votre numéro de confirmation. Vous en aurez besoin pour vous présenter à la gare 30 minutes avant le départ.
        </p>
      </div>
    </div>
  );
};
