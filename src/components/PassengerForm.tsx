import React, { useState } from 'react';
import { Button } from './Button';
import { AlertCircle } from 'lucide-react';

export interface Passenger {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface PassengerFormProps {
  numberOfSeats: number;
  onSubmit: (passengers: Passenger[]) => void;
  isLoading?: boolean;
}

export const PassengerForm: React.FC<PassengerFormProps> = ({
  numberOfSeats,
  onSubmit,
  isLoading = false,
}) => {
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array(numberOfSeats).fill(null).map(() => ({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    }))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
    if (errors[`${index}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    passengers.forEach((passenger, index) => {
      if (!passenger.firstName.trim()) {
        newErrors[`${index}-firstName`] = 'Prénom requis';
        isValid = false;
      }
      if (!passenger.lastName.trim()) {
        newErrors[`${index}-lastName`] = 'Nom requis';
        isValid = false;
      }
      if (!passenger.phone.trim()) {
        newErrors[`${index}-phone`] = 'Téléphone requis';
        isValid = false;
      } else if (!/^\d{9,}$/.test(passenger.phone.replace(/\s/g, ''))) {
        newErrors[`${index}-phone`] = 'Téléphone invalide';
        isValid = false;
      }
      if (!passenger.email.trim()) {
        newErrors[`${index}-email`] = 'Email requis';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
        newErrors[`${index}-email`] = 'Email invalide';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(passengers);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {passengers.map((passenger, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Passager {index + 1}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                value={passenger.firstName}
                onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[`${index}-firstName`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Jean"
              />
              {errors[`${index}-firstName`] && (
                <p className="text-red-600 text-sm mt-1">{errors[`${index}-firstName`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                value={passenger.lastName}
                onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[`${index}-lastName`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Dupont"
              />
              {errors[`${index}-lastName`] && (
                <p className="text-red-600 text-sm mt-1">{errors[`${index}-lastName`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                value={passenger.phone}
                onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[`${index}-phone`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+33 6 XX XX XX XX"
              />
              {errors[`${index}-phone`] && (
                <p className="text-red-600 text-sm mt-1">{errors[`${index}-phone`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={passenger.email}
                onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[`${index}-email`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="jean@example.com"
              />
              {errors[`${index}-email`] && (
                <p className="text-red-600 text-sm mt-1">{errors[`${index}-email`]}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Assurez-vous que les informations sont exactes. Elles seront utilisées pour générer votre billet.
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          variant="primary"
          size="lg"
          type="submit"
          isLoading={isLoading}
          className="flex-1"
        >
          Valider et continuer
        </Button>
      </div>
    </form>
  );
};
