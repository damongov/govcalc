import React, { useState, useEffect } from 'react';

export default function BigBatCalculator() {
  const [power, setPower] = useState('');
  const [damage, setDamage] = useState('');
  const [results, setResults] = useState({
    damagePer10M: 0,
    damagePer1M: 0,
    totalHP: 0
  });

  const handlePowerChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      setPower(parts[0] + '.' + parts.slice(1).join(''));
    } else {
      setPower(value);
    }
  };

  const handleDamageChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      setDamage(parts[0] + '.' + parts.slice(1).join(''));
    } else {
      setDamage(value);
    }
  };

  useEffect(() => {
    const powerValue = parseFloat(power) || 0;
    const damageValue = parseFloat(damage) || 0;

    if (powerValue > 0 && damageValue > 0) {
      const damagePer10M = (damageValue * 10) / powerValue;
      const damagePer1M = damageValue / powerValue;
      const totalHP = powerValue / (damageValue / 100);

      setResults({ damagePer10M, damagePer1M, totalHP });
    } else {
      setResults({ damagePer10M: 0, damagePer1M: 0, totalHP: 0 });
    }
  }, [power, damage]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'B';
    }
    return num.toFixed(2) + 'M';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-200 mb-2 flex items-center justify-center gap-3">
            <span className="text-4xl">🦇</span>
            Big Bat HP Calculator
          </h1>
          <p className="text-red-100 text-sm">Calculate the Big Bat's total HP and damage scaling based on your warden's power</p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-red-900/50 shadow-2xl">
          {/* Results Box */}
          <div className="bg-gradient-to-r from-red-900/30 to-black/30 border border-red-700/50 rounded-xl p-5 mb-6">
            <h2 className="text-lg text-red-200 mb-4 text-center">Big Bat Statistics</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-black/30 rounded-lg p-4 text-center border border-red-800/30">
                <div className="text-red-300 text-sm mb-1">Damage per 10M Power</div>
                <div className="text-2xl font-bold text-red-100">
                  {results.damagePer10M > 0 ? results.damagePer10M.toFixed(3) + '%' : '—'}
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 text-center border border-red-800/30">
                <div className="text-red-300 text-sm mb-1">Damage per 1M Power</div>
                <div className="text-2xl font-bold text-red-100">
                  {results.damagePer1M > 0 ? results.damagePer1M.toFixed(4) + '%' : '—'}
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 text-center border border-red-800/30">
                <div className="text-red-300 text-sm mb-1">Bat's Total HP</div>
                <div className="text-2xl font-bold text-red-100">
                  {results.totalHP > 0 ? formatNumber(results.totalHP) : '—'}
                </div>
                <div className="text-red-400 text-xs mt-1">in power</div>
              </div>
            </div>
          </div>

          {/* Power Input */}
          <div className="mb-5">
            <label className="block text-red-100 text-lg font-semibold mb-2 flex items-center gap-2">
              <span className="text-yellow-400">⚡</span>
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
          <div className="mb-5">
            <label className="block text-red-100 text-lg font-semibold mb-2 flex items-center gap-2">
              <span className="text-red-400">🎯</span>
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
                <span>🧮</span>
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
          <div className="mt-5 bg-red-900/20 rounded-lg p-4 border border-red-800/30">
            <h3 className="text-red-100 font-semibold mb-2 flex items-center gap-2">
              <span>❤️</span>
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
  );
}
