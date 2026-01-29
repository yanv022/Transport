import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(new Date(selectedDate || new Date()));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handlePrevMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    onDateChange(selected.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewMonth);
    const firstDay = getFirstDayOfMonth(viewMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
      const isDisabled = date < today;
      const isSelected = selectedDate === date.toISOString().split('T')[0];

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
          className={`p-2 text-sm rounded transition-colors ${
            isSelected
              ? 'bg-green-600 text-white font-bold'
              : isDisabled
                ? 'text-gray-400 cursor-not-allowed'
                : 'hover:bg-blue-100 text-gray-700'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg flex items-center gap-2 bg-white hover:bg-gray-50 transition-colors"
      >
        <Calendar size={20} className="text-blue-900" />
        <span className="text-left flex-1">{selectedDate ? formatDate(selectedDate) : 'Sélectionner date'}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h3 className="font-semibold text-center min-w-max">
              {viewMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};
