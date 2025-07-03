// ConclaveCalculator.js
import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Crown, Star } from 'lucide-react';

const ConclaveCalculator = () => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedBond, setSelectedBond] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);

  const tableOptions = [
    { value: 270, label: '+270/min' },
    { value: 400, label: '+400/min' },
    { value: 600, label: '+600/min' },
    { value: 900, label: '+900/min' },
    { value: 1400, label: '+1400/min' },
    { value: 2100, label: '+2100/min' },
  ];

  const titleOptions = [
    { value: 0, label: 'None' },
    { value: 3, label: 'Baron: +3%' },
    { value: 5, label: 'Viscount: +5%' },
    { value: 8, label: 'Count: +8%' },
    { value: 10, label: 'Margrave: +10%' },
  ];

  const bondOptions = [
    { value: 0, label: 'None' },
    { value: 2, label: 'Level 2: +2%' },
    { value: 4, label: 'Level 3: +4%' },
    { value: 6, label: 'Level 5: +6%' },
    { value: 10, label: 'Level 6: +10%' },
  ];

  // Convert time string to minutes
  const timeToMinutes = (timeStr) => {
    const parts = timeStr.split(':');
    if (parts.length !== 3) return 0;
    
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    const seconds = parseInt(parts[2]) || 0;
    
    return hours * 60 + minutes + seconds / 60;
  };

  // Calculate total points
  useEffect(() => {
    if (!selectedTable || !timeRemaining) {
      setTotalPoints(0);
      return;
    }

    const minutes = timeToMinutes(timeRemaining);
    const pointsPerMinute = parseInt(selectedTable);
    const basePoints = minutes * pointsPerMinute;
    
    const titleBonus = parseInt(selectedTitle) || 0;
    const bondBonus = parseInt(selectedBond) || 0;
    const totalBonus = titleBonus + bondBonus;
    
    const finalPoints = basePoints * (1 + totalBonus / 100);
    setTotalPoints(Math.floor(finalPoints));
  }, [timeRemaining, selectedTable, selectedTitle, selectedBond]);

  // Format time input
  const handleTimeChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    
    if (value.length <= 6) {
      // Format as HH:MM:SS
      if (value.length >= 4) {
        value = value.slice(0, 2) + ':' + value.slice(2, 4) + ':' + value.slice(4, 6);
      } else if (value.length >= 2) {
        value = value.slice(0, 2) + ':' + value.slice(2);
      }
      setTimeRemaining(value);
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-red-200 mb-2 flex items-center justify-center gap-3">
            <Trophy className="text-red-400" />
            Conclave Points Calculator
          </h1>
          <p className="text-red-100 text-sm sm:text-base">Calculate your conclave points based on time and bonuses</p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-red-900/50 shadow-2xl">
          {/* Results Box */}
          <div className="bg-gradient-to-r from-red-900/30 to-black/30 border border-red-700/50 rounded-xl p-6 mb-8 text-center">
            <h2 className="text-lg text-red-200 mb-2">If you sit at this conclave table, you will get...</h2>
            <div className="text-4xl sm:text-6xl font-bold text-red-100">
              {totalPoints.toLocaleString()}
            </div>
            <div className="text-red-200 mt-2">POINTS</div>
          </div>

          {/* Time Input */}
          <div className="mb-6">
            <label className="block text-red-100 text-lg font-semibold mb-3 flex items-center gap-2">
              <Clock size={20} />
              How much time is left on the conclave?
            </label>
            <input
              type="text"
              value={timeRemaining}
              onChange={handleTimeChange}
              placeholder="00:00:00"
              className="w-full bg-black/50 text-red-100 text-center text-2xl font-mono px-4 py-3 rounded-lg border border-red-800/50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
              maxLength="8"
            />
            <p className="text-xs text-red-300 mt-2">Format: HH:MM:SS (e.g., 03:40:00)</p>
          </div>

          {/* Table Selection */}
          <div className="mb-6">
            <label className="block text-red-100 text-lg font-semibold mb-3">
              What kind of table?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tableOptions.map((option) => (
                <label
                  key={option.value}
                  className={`
                    relative flex items-center justify-center p-4 rounded-lg cursor-pointer
                    border-2 transition-all duration-200
                    ${selectedTable === option.value.toString()
                      ? 'bg-red-900/50 border-red-600 text-red-100'
                      : 'bg-black/30 border-red-900/30 text-red-200 hover:bg-red-900/20'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="table"
                    value={option.value}
                    checked={selectedTable === option.value.toString()}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-semibold">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Title Selection */}
          <div className="mb-6">
            <label className="block text-red-100 text-lg font-semibold mb-3 flex items-center gap-2">
              <Crown size={20} />
              Do you have a title equipped?
            </label>
            <select
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              className="w-full bg-black/50 text-red-100 px-4 py-3 rounded-lg border border-red-800/50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
            >
              {titleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bond Selection */}
          <div className="mb-6">
            <label className="block text-red-100 text-lg font-semibold mb-3 flex items-center gap-2">
              <Star size={20} />
              Do you have a Conclave familiar bond activated?
            </label>
            <select
              value={selectedBond}
              onChange={(e) => setSelectedBond(e.target.value)}
              className="w-full bg-black/50 text-red-100 px-4 py-3 rounded-lg border border-red-800/50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
            >
              {bondOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Calculation Breakdown */}
          {totalPoints > 0 && (
            <div className="bg-black/30 rounded-lg p-4 border border-red-900/30 text-sm">
              <h3 className="text-red-100 font-semibold mb-2">Calculation Breakdown:</h3>
              <div className="text-red-200 space-y-1">
                <p>Time: {timeRemaining} = {timeToMinutes(timeRemaining).toFixed(2)} minutes</p>
                <p>Points per minute: {selectedTable}</p>
                <p>Base points: {(timeToMinutes(timeRemaining) * parseInt(selectedTable)).toLocaleString()}</p>
                <p>Total bonus: +{(parseInt(selectedTitle || 0) + parseInt(selectedBond || 0))}%</p>
                <p className="font-semibold text-red-100 pt-2">Final points: {totalPoints.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConclaveCalculator;
