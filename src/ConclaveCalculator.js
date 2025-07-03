// ConclaveCalculator.js
import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Crown, Star, AlertCircle, Menu, X, Calculator, Users } from 'lucide-react';

const ConclaveCalculator = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timeError, setTimeError] = useState('');
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

  // Validate and handle time inputs
  const handleHoursChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const numValue = parseInt(value) || 0;
    
    if (numValue > 9) {
      setTimeError('Maximum conclave time is 9 hours');
      setHours('9');
    } else {
      setTimeError('');
      setHours(value);
    }
  };

  const handleMinutesChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const numValue = parseInt(value) || 0;
    
    if (numValue > 59) {
      setMinutes('59');
    } else {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const numValue = parseInt(value) || 0;
    
    if (numValue > 59) {
      setSeconds('59');
    } else {
      setSeconds(value);
    }
  };

  // Calculate total minutes from inputs
  const getTotalMinutes = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    
    return h * 60 + m + s / 60;
  };

  // Calculate total points
  useEffect(() => {
    if (!selectedTable || (!hours && !minutes && !seconds)) {
      setTotalPoints(0);
      return;
    }

    const totalMinutes = getTotalMinutes();
    const pointsPerMinute = parseInt(selectedTable);
    const basePoints = totalMinutes * pointsPerMinute;
    
    const titleBonus = parseInt(selectedTitle) || 0;
    const bondBonus = parseInt(selectedBond) || 0;
    const totalBonus = titleBonus + bondBonus;
    
    const finalPoints = basePoints * (1 + totalBonus / 100);
    setTotalPoints(Math.floor(finalPoints));
  }, [hours, minutes, seconds, selectedTable, selectedTitle, selectedBond]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-black/60 backdrop-blur-lg border-r border-red-900/50`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-red-200 font-bold text-xl ${sidebarOpen ? 'block' : 'hidden'}`}>GoV Tools</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <nav className="space-y-2">
            <button 
              onClick={() => onNavigate && onNavigate('dominance')} 
              className="w-full flex items-center gap-3 p-3 rounded-lg text-red-200 hover:bg-red-900/30 transition-colors text-left"
            >
              <Calculator size={20} />
              {sidebarOpen && <span>Dominance Calculator</span>}
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('conclave')} 
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-900/30 text-red-200 hover:bg-red-900/50 transition-colors text-left"
            >
              <Users size={20} />
              {sidebarOpen && <span>Conclave Calculator</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 sm:p-6">
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
                <div className="text-red-200 mt-2">CONCLAVE POINTS</div>
              </div>

              {/* Time Input */}
              <div className="mb-6">
                <label className="block text-red-100 text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock size={20} />
                  How much time is left on the conclave?
                </label>
                
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="text-center">
                    <input
                      type="text"
                      value={hours}
                      onChange={handleHoursChange}
                      placeholder="0"
                      className="w-20 bg-black/50 text-red-100 text-center text-2xl font-mono px-3 py-3 rounded-lg border border-red-800/50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
                      maxLength="1"
                    />
                    <p className="text-xs text-red-300 mt-1">hours</p>
                  </div>
                  
                  <div className="text-center">
                    <input
                      type="text"
                      value={minutes}
                      onChange={handleMinutesChange}
                      placeholder="0"
                      className="w-20 bg-black/50 text-red-100 text-center text-2xl font-mono px-3 py-3 rounded-lg border border-red-800/50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
                      maxLength="2"
                    />
                    <p className="text-xs text-red-300 mt-1">minutes</p>
                  </div>
                  
                  <div className="text-center">
                    <input
                      type="text"
                      value={seconds}
                      onChange={handleSecondsChange}
                      placeholder="0"
                      className="w-20 bg-black/50 text-red-100 text-center text-2xl font-mono px-3 py-3 rounded-lg border border-red-800/50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
                      maxLength="2"
                    />
                    <p className="text-xs text-red-300 mt-1">seconds</p>
                  </div>
                </div>
                
                {timeError && (
                  <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm">
                    <AlertCircle size={16} />
                    <span>{timeError}</span>
                  </div>
                )}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {titleOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`
                        relative flex items-center justify-center p-3 rounded-lg cursor-pointer
                        border-2 transition-all duration-200
                        ${selectedTitle === option.value.toString()
                          ? 'bg-red-900/50 border-red-600 text-red-100'
                          : 'bg-black/30 border-red-900/30 text-red-200 hover:bg-red-900/20'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="title"
                        value={option.value}
                        checked={selectedTitle === option.value.toString()}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bond Selection */}
              <div className="mb-6">
                <label className="block text-red-100 text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star size={20} />
                  Do you have a Conclave familiar bond activated?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {bondOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`
                        relative flex items-center justify-center p-3 rounded-lg cursor-pointer
                        border-2 transition-all duration-200
                        ${selectedBond === option.value.toString()
                          ? 'bg-red-900/50 border-red-600 text-red-100'
                          : 'bg-black/30 border-red-900/30 text-red-200 hover:bg-red-900/20'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="bond"
                        value={option.value}
                        checked={selectedBond === option.value.toString()}
                        onChange={(e) => setSelectedBond(e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Calculation Breakdown */}
              {totalPoints > 0 && (
                <div className="bg-black/30 rounded-lg p-4 border border-red-900/30 text-sm">
                  <h3 className="text-red-100 font-semibold mb-2">Calculation Breakdown:</h3>
                  <div className="text-red-200 space-y-1">
                    <p>Time: {hours || 0}h {minutes || 0}m {seconds || 0}s = {getTotalMinutes().toFixed(2)} minutes</p>
                    <p>Points per minute: {selectedTable}</p>
                    <p>Base points: {(getTotalMinutes() * parseInt(selectedTable)).toLocaleString()}</p>
                    <p>Total bonus: +{(parseInt(selectedTitle || 0) + parseInt(selectedBond || 0))}%</p>
                    <p className="font-semibold text-red-100 pt-2">Final points: {totalPoints.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConclaveCalculator;
