import React from 'react';
import { Plus, Minus, Users } from 'lucide-react';

interface SeatSelectorProps {
  seats: number;
  maxSeats: number;
  onSeatsChange: (seats: number) => void;
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({ seats, maxSeats, onSeatsChange }) => {
  const handleDecrease = () => {
    if (seats > 1) {
      onSeatsChange(seats - 1);
    }
  };

  const handleIncrease = () => {
    if (seats < maxSeats) {
      onSeatsChange(seats + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= maxSeats) {
      onSeatsChange(value);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Users size={20} className="text-blue-900" />
        <span className="text-sm font-medium text-gray-700">Places:</span>
      </div>

      <div className="flex items-center border border-gray-300 rounded-lg">
        <button
          onClick={handleDecrease}
          disabled={seats <= 1}
          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Diminuer"
        >
          <Minus size={18} />
        </button>

        <input
          type="number"
          min="1"
          max={maxSeats}
          value={seats}
          onChange={handleInputChange}
          className="w-12 text-center border-l border-r border-gray-300 py-2 font-semibold focus:outline-none"
        />

        <button
          onClick={handleIncrease}
          disabled={seats >= maxSeats}
          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Augmenter"
        >
          <Plus size={18} />
        </button>
      </div>

      <span className="text-xs text-gray-500">
        Max: {maxSeats} place{maxSeats > 1 ? 's' : ''}
      </span>
    </div>
  );
};
