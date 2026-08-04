import React, { useState } from 'react';

const INCREMENTS = [40, 30, 20, 10, 5, 1];

const sanitize = (raw) => {
  const value = raw.replace(/[^\d.]/g, '');
  const parts = value.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  return value;
};

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'B';
  }
  return num.toFixed(2) + 'M';
};

const decimalsFor = (step) => (step >= 10 ? 3 : 4);

const BigBatCalculator = () => {
  const [power, setPower] = useState('');
  const [hpBefore, setHpBefore] = useState('');
  const [hpAfter, setHpAfter] = useState('');

  const powerValue = parseFloat(power) || 0;
  const beforeValue = parseFloat(hpBefore);
  const afterValue = parseFloat(hpAfter);

  const bothHPEntered = !Number.isNaN(beforeValue) && !Number.isNaN(afterValue);
  const damageValue = bothHPEntered ? beforeValue - afterValue : 0;
  const invalidHP = bothHPEntered && damageValue <= 0;

  const hasResults = powerValue > 0 && damageValue > 0;
  const perMillion = hasResults ? damageValue / powerValue : 0;
  const totalHP = hasResults ? powerValue / (damageValue / 100) : 0;

  const inputClass =
    'flex-1 bg-black/50 text-red-100 text-xl font-mono px-4 py-3 rounded-lg border border-red-800/50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-200 mb-2 flex items-center justify-center gap-3">
            <span className="text-4xl">🦇</span>
            Big Bat Damage Calculator
          </h1>
          <p className="text-red-100 text-sm">
            See how much damage the Big Bat takes at each power tier, based on your warden
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-red-900/50 shadow-2xl">
          {/* Results Box */}
          <div className="bg-gradient-to-r from-red-900/30 to-black/30 border border-red-700/50 rounded-xl p-5 mb-6">
            <h2 className="text-lg text-red-200 mb-4 text-center">Damage by power tier</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {INCREMENTS.map((step) => (
                <div key={step} className="bg-black/30 rounded-lg p-4 text-center border border-red-800/30">
                  <div className="text-red-300 text-sm mb-1">Damage per {step}M Power</div>
                  <div className="text-2xl font-bold text-red-100">
                    {hasResults ? (perMillion * step).toFixed(decimalsFor(step)) + '%' : '—'}
                  </div>
                </div>
              ))}
            </div>

            {hasResults && (
              <p className="text-red-400 text-xs text-center mt-4">
                For reference, the Bat&apos;s full HP works out to {formatNumber(totalHP)} in power.
              </p>
            )}
          </div>

          {/* Power Input */}
          <div className="mb-5">
            <label htmlFor="warden-power" className="text-red-100 text-lg font-semibold mb-2 flex items-center gap-2">
              <span className="text-yellow-400">⚡</span>
              Power of your warden
            </label>

            <div className="flex items-center gap-3">
              <input
                id="warden-power"
                type="text"
                inputMode="decimal"
                value={power}
                onChange={(e) => setPower(sanitize(e.target.value))}
                placeholder="e.g. 62.85"
                className={inputClass}
              />
              <span className="text-red-200 text-lg font-semibold">M</span>
            </div>
            <p className="text-xs text-red-300 mt-2">Enter power in millions (e.g. 62.85 for 62.85M)</p>
          </div>

          {/* Bat HP Inputs */}
          <div className="mb-5">
            <div className="text-red-100 text-lg font-semibold mb-2 flex items-center gap-2">
              <span className="text-red-400">🎯</span>
              Bat HP before and after the hit
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="hp-before" className="block text-red-300 text-sm mb-1">
                  Starting HP
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="hp-before"
                    type="text"
                    inputMode="decimal"
                    value={hpBefore}
                    onChange={(e) => setHpBefore(sanitize(e.target.value))}
                    placeholder="e.g. 100"
                    className={inputClass}
                  />
                  <span className="text-red-200 text-lg font-semibold">%</span>
                </div>
              </div>

              <div>
                <label htmlFor="hp-after" className="block text-red-300 text-sm mb-1">
                  HP after your warden hit
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="hp-after"
                    type="text"
                    inputMode="decimal"
                    value={hpAfter}
                    onChange={(e) => setHpAfter(sanitize(e.target.value))}
                    placeholder="e.g. 95.21"
                    className={inputClass}
                  />
                  <span className="text-red-200 text-lg font-semibold">%</span>
                </div>
              </div>
            </div>

            {invalidHP ? (
              <p className="text-xs text-yellow-300 mt-2">HP after the hit needs to be lower than the starting HP.</p>
            ) : (
              <p className="text-xs text-red-300 mt-2">
                Total damage dealt ={' '}
                <span className="text-red-100 font-semibold">
                  {damageValue > 0 ? damageValue.toFixed(2) + '%' : '—'}
                </span>
              </p>
            )}
          </div>

          {/* Calculation Breakdown */}
          {hasResults && (
            <div className="bg-black/30 rounded-lg p-4 border border-red-900/30 text-sm">
              <h3 className="text-red-100 font-semibold mb-2 flex items-center gap-2">
                <span>🧮</span>
                Calculation Breakdown:
              </h3>
              <div className="text-red-200 space-y-1">
                <p>Your warden&apos;s power: {power}M</p>
                <p>
                  Damage dealt = {hpBefore}% − {hpAfter}% ={' '}
                  <span className="text-red-100 font-semibold">{damageValue.toFixed(2)}%</span>
                </p>
                <div className="border-t border-red-800/30 my-2 pt-2 space-y-1">
                  <p>
                    Base rate = {damageValue.toFixed(2)}% ÷ {power} ={' '}
                    <span className="text-red-100 font-semibold">{perMillion.toFixed(4)}%</span> per 1M power
                  </p>
                  {INCREMENTS.filter((step) => step !== 1).map((step) => (
                    <p key={step}>
                      Damage per {step}M = {perMillion.toFixed(4)}% × {step} ={' '}
                      <span className="text-red-100 font-semibold">
                        {(perMillion * step).toFixed(decimalsFor(step))}%
                      </span>
                    </p>
                  ))}
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
              Subtracting the Bat&apos;s HP after the hit from its HP before gives the damage your warden dealt. Damage
              scales linearly with power, so that result becomes a rate per 1M power and gets multiplied up to each tier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigBatCalculator;
