import React, { useState, useEffect } from 'react';
import { Zap, Target, Heart, Calculator } from 'lucide-react';

const BigBatCalculator = ({ onNavigate }) => {
  const [power, setPower] = useState('');
  const [damage, setDamage] = useState('');
  const [results, setResults] = useState({
    damagePer10M: 0,
    damagePer1M: 0,
    totalHP: 0
  });

  // Handle power input (in millions)
  const handlePowerChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    // Only allow one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      setPower(parts[0] + '.' + parts.slice(1).join(''));
    } else {
      setPower(value);
    }
  };

  // Handle damage percentage input
  const handleDamageChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    // Only allow one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      setDamage(parts[0] + '.' + parts.slice(1).join(''));
    } else {
      setDamage(value);
    }
  };

  // Calculate results
  useEffect(() => {
    const powerValue = parseFloat(power) || 0;
    const damageValue = parseFloat(damage) || 0;

    if (powerValue > 0 && damageValue > 0) {
      // Calculate damage per 10M power
      const damagePer10M = (damageValue * 10) / powerValue;
      
      // Calculate damage per 1M power
      const damagePer1M = damageValue / powerValue;
      
      // Calculate total HP in power (if X power = Y%, then 100% = X / (Y/100))
      const totalHP = powerValue / (damageValue / 100);

      setResults({
        damagePer10M: damagePer10M,
        damagePer1M: damagePer1M,
        totalHP: totalHP
      });
    } else {
      setResults({
        damagePer10M: 0,
        damagePer1M: 0,
        totalHP: 0
      });
    }
  }, [power, damage]);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'B';
    }
    return num.toFixed(2) + 'M';
  };

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-red-200 mb-2 flex items-center justify-center gap-3">
              <span className="text-4xl">🦇</span>
              Big Bat HP Calculator
            </h1>
            <p className="text-red-100 text-sm sm:text-base">Calculate the Big Bat's total HP and damage scaling based on your warden's power</p>
          </div>

          <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-red-900/50 shadow-2xl">
            {/* Results Box */}
            <div className="bg-gradient-to-r from-red-900/30 to-black/30 border border-red-700/50 rounded-xl p-6 mb-8">
              <h2 className="text-lg text-red-200 mb-4 text-center">Big Bat Statistics</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Damage per 10M */}
                <div className="bg-black/30 rounded-lg p-4 text-center border border-red-800/30">
                  <div className="text-red-300 text-sm mb-1">Damage per 10M Power</div>
                  <div className="text-2xl sm:text-3xl font-bold text-red-100">
                    {results.damagePer10M > 0 ? results.damagePer10M.toFixed(3) + '%' : '—'}
                  </div>
                </div>

                {/* Damage per 1M */}
                <div className="bg-black/30 rounded-lg p-4 text-center border border-red-800/30">
                  <div className="text-red-300 text-sm mb-1">Damage per 1M Power</div>
                  <div className="text-2xl sm:text-3xl font-bold text-red-100">
                    {results.damagePer1M > 0 ? results.damagePer1M.toFixed(4) + '%' : '—'}
                  </div>
                </div>

                {/* Total HP */}
                <div className="bg-black/30 rounded-lg p-4 text-center border border-red-800/30">
                  <div className="text-red-300 text-sm mb-1">Bat's Total HP</div>
                  <div className="text-2xl sm:text-3xl font-bold text-red-100">
                    {results.totalHP > 0 ? formatNumber(results.totalHP) : '—'}
                  </div>
                  <div className="text-red-400 text-xs mt-1">in power</div>
                </div>
              </div>
            </div>

            {/* Power Input */}
            <div className="mb-6">
              <label className="block text-red-100 text-lg font-semibold mb-3 flex items-center gap-2">
                <Zap size={20} className="text-yellow-400" />
                Power of your warden
              </label>
              
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={power}
                  onChange={handlePowerChange}
                  placeholder="e.g. 62.85"
                  className="flex-1 bg-black/50 text-red-100 text-xl font-mono px-4 py-3 rounded-lg border border-red-800/50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
                />
                <span className="text-red-200 text-lg font-semibold">M</span>
              </div>
              <p className="text-xs text-red-300 mt-2">Enter power in millions (e.g. 62.85 for 62.85M)</p>
            </div>

            {/* Damage Input */}
            <div className="mb-6">
              <label className="block text-red-100 text-lg font-semibold mb-3 flex items-center gap-2">
                <Target size={20} className="text-red-400" />
                % damage dealt to the Big Bat
              </label>
              
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={damage}
                  onChange={handleDamageChange}
                  placeholder="e.g. 4.79"
                  className="flex-1 bg-black/50 text-red-100 text-xl font-mono px-4 py-3 rounded-lg border border-red-800/50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
                />
                <span className="text-red-200 text-lg font-semibold">%</span>
              </div>
              <p className="text-xs text-red-300 mt-2">Enter the percentage of damage your warden dealt</p>
            </div>

            {/* Calculation Breakdown */}
            {results.totalHP > 0 && (
              <div className="bg-black/30 rounded-lg p-4 border border-red-900/30 text-sm">
                <h3 className="text-red-100 font-semibold mb-2 flex items-center gap-2">
                  <Calculator size={16} />
                  Calculation Breakdown:
                </h3>
                <div className="text-red-200 space-y-1">
                  <p>Your warden's power: {power}M</p>
                  <p>Damage dealt: {damage}%</p>
                  <div className="border-t border-red-800/30 my-2 pt-2">
                    <p>Damage per 10M = ({damage}% × 10) ÷ {power} = <span className="text-red-100 font-semibold">{results.damagePer10M.toFixed(3)}%</span></p>
                    <p>Damage per 1M = {damage}% ÷ {power} = <span className="text-red-100 font-semibold">{results.damagePer1M.toFixed(4)}%</span></p>
                    <p>Total HP = {power}M ÷ ({damage}% ÷ 100) = <span className="text-red-100 font-semibold">{formatNumber(results.totalHP)} power</span></p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 bg-red-900/20 rounded-lg p-4 border border-red-800/30">
              <h3 className="text-red-100 font-semibold mb-2 flex items-center gap-2">
                <Heart size={16} className="text-red-400" />
                How it works
              </h3>
              <p className="text-red-200 text-sm">
                This calculator determines the Big Bat's total HP by using your warden's power and the percentage of damage dealt. 
                If your warden with X power deals Y% damage, then the Bat's total HP equals X ÷ (Y/100) in power terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigBatCalculator;
