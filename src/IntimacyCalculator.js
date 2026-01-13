import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Wallet, Coins, Save, Upload, Copy, Check } from 'lucide-react';

const IntimacyCalculator = ({ onNavigate }) => {
  const [guaranteedItems, setGuaranteedItems] = useState({
    premium: 0,
    deluxe: 0,
    gift: 0
  });

  const [randomItems, setRandomItems] = useState({
    intimacyCase: 0,
    intimacyBag: 0,
    intimacyPurse: 0
  });

  const [heraldItems, setHeraldItems] = useState({
    gold: 0,
    silver: 0,
    bronze: 0,
    demon: 0
  });

  const [guaranteedTotal, setGuaranteedTotal] = useState(0);
  const [randomTotalMin, setRandomTotalMin] = useState(0);
  const [randomTotalMax, setRandomTotalMax] = useState(0);
  const [heraldTotal, setHeraldTotal] = useState(0);

  // Save/Load state
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const [saveCode, setSaveCode] = useState('');
  const [loadCode, setLoadCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loadError, setLoadError] = useState('');

  // Calculate guaranteed total
  useEffect(() => {
    const total = (guaranteedItems.premium * 5) + 
                  (guaranteedItems.deluxe * 2) + 
                  (guaranteedItems.gift * 1);
    setGuaranteedTotal(total);
  }, [guaranteedItems]);

  // Calculate random totals (min and max)
  useEffect(() => {
    const minTotal = (randomItems.intimacyCase * 4) + 
                     (randomItems.intimacyBag * 5) + 
                     (randomItems.intimacyPurse * 1);
    const maxTotal = (randomItems.intimacyCase * 50) + 
                     (randomItems.intimacyBag * 8) + 
                     (randomItems.intimacyPurse * 4);
    setRandomTotalMin(minTotal);
    setRandomTotalMax(maxTotal);
  }, [randomItems]);

  // Calculate herald total
  useEffect(() => {
    const total = (heraldItems.gold * 25) + 
                  (heraldItems.silver * 5) + 
                  (heraldItems.bronze * 2) + 
                  (heraldItems.demon * 1);
    setHeraldTotal(total);
  }, [heraldItems]);

  const updateGuaranteedItem = (item, value) => {
    const numValue = parseInt(value) || 0;
    setGuaranteedItems(prev => ({
      ...prev,
      [item]: Math.max(0, numValue)
    }));
  };

  const updateRandomItem = (item, value) => {
    const numValue = parseInt(value) || 0;
    setRandomItems(prev => ({
      ...prev,
      [item]: Math.max(0, numValue)
    }));
  };

  const updateHeraldItem = (item, value) => {
    const numValue = parseInt(value) || 0;
    setHeraldItems(prev => ({
      ...prev,
      [item]: Math.max(0, numValue)
    }));
  };

  // Save/Load Functions
  const generateSaveCode = () => {
    const saveData = {
      v: 1, // version number for future compatibility
      g: guaranteedItems,
      r: randomItems,
      h: heraldItems
    };
    
    try {
      const jsonString = JSON.stringify(saveData);
      const compressed = btoa(jsonString);
      setSaveCode(compressed);
      setCopied(false);
    } catch (error) {
      console.error('Error generating save code:', error);
    }
  };

  const loadFromCode = () => {
    setLoadError('');
    
    if (!loadCode.trim()) {
      setLoadError('Please enter a save code');
      return;
    }

    try {
      const jsonString = atob(loadCode.trim());
      const saveData = JSON.parse(jsonString);
      
      // Validate version
      if (saveData.v !== 1) {
        setLoadError('Invalid save code version');
        return;
      }

      // Load guaranteed items
      if (saveData.g) {
        setGuaranteedItems(saveData.g);
      }

      // Load random items
      if (saveData.r) {
        setRandomItems(saveData.r);
      }

      // Load herald items
      if (saveData.h) {
        setHeraldItems(saveData.h);
      }

      // Clear the load code and close the save/load panel
      setLoadCode('');
      setShowSaveLoad(false);
      
    } catch (error) {
      setLoadError('Invalid save code. Please check and try again.');
      console.error('Error loading save code:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(saveCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const totalMin = guaranteedTotal + randomTotalMin + heraldTotal;
  const totalMax = guaranteedTotal + randomTotalMax + heraldTotal;
  const totalAverage = Math.round((totalMin + totalMax) / 2);

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-red-200 mb-2 flex items-center justify-center gap-3">
              <Gift className="text-red-400" />
              Intimacy Calculator
            </h1>
            <p className="text-red-100 text-sm sm:text-base">Calculate your intimacy points from gifts and special items</p>
          </div>

          {/* Save/Load Button */}
          <div className="text-center mb-4">
            <button
              onClick={() => setShowSaveLoad(!showSaveLoad)}
              className="bg-red-900/30 hover:bg-red-900/50 text-red-200 px-4 py-2 rounded-lg border border-red-700/50 transition-colors flex items-center gap-2 mx-auto"
            >
              <Save size={18} />
              Save/Load Data
            </button>
          </div>

          {/* Save/Load Panel */}
          {showSaveLoad && (
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-red-900/50 mb-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Save Section */}
                <div className="bg-black/30 rounded-lg p-4 border border-red-900/30">
                  <h3 className="text-red-100 font-semibold mb-3 flex items-center gap-2">
                    <Save size={16} />
                    Save Current Data
                  </h3>
                  <button
                    onClick={generateSaveCode}
                    className="w-full bg-red-800/50 hover:bg-red-800/70 text-red-100 px-3 py-2 rounded mb-3 transition-colors"
                  >
                    Generate Save Code
                  </button>
                  {saveCode && (
                    <div>
                      <div className="relative">
                        <textarea
                          readOnly
                          value={saveCode}
                          className="w-full bg-black/50 text-red-100 text-xs font-mono p-2 rounded border border-red-800/50 h-24 resize-none"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="absolute top-2 right-2 bg-red-800/70 hover:bg-red-800/90 text-red-100 p-1 rounded transition-colors"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                      {copied && (
                        <p className="text-green-400 text-xs mt-1">Copied to clipboard!</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Load Section */}
                <div className="bg-black/30 rounded-lg p-4 border border-red-900/30">
                  <h3 className="text-red-100 font-semibold mb-3 flex items-center gap-2">
                    <Upload size={16} />
                    Load Saved Data
                  </h3>
                  <textarea
                    value={loadCode}
                    onChange={(e) => setLoadCode(e.target.value)}
                    placeholder="Paste your save code here..."
                    className="w-full bg-black/50 text-red-100 text-xs font-mono p-2 rounded border border-red-800/50 focus:border-red-600 focus:outline-none h-24 resize-none mb-3"
                  />
                  <button
                    onClick={loadFromCode}
                    className="w-full bg-green-800/50 hover:bg-green-800/70 text-green-100 px-3 py-2 rounded transition-colors"
                  >
                    Load Data
                  </button>
                  {loadError && (
                    <p className="text-red-400 text-xs mt-2">{loadError}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-red-900/50 shadow-2xl">
            {/* Total Results Box - Average Highlighted */}
            <div className="bg-gradient-to-r from-red-900/30 to-black/30 border border-red-700/50 rounded-xl p-6 mb-8 text-center">
              <h2 className="text-lg text-red-200 mb-2">Expected Intimacy</h2>
              <div className="text-5xl sm:text-6xl font-bold text-red-100 mb-4">
                {totalAverage.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-2 text-red-300 text-sm">
                <span>Range: {totalMin.toLocaleString()}</span>
                <Gift className="text-red-400" size={16} />
                <span>{totalMax.toLocaleString()}</span>
              </div>
            </div>

            {/* Guaranteed Intimacy Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Guaranteed Intimacy</h2>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-red-900/30">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {/* Premium Gift Box */}
                  <div className="bg-black/40 rounded-lg p-4 border border-purple-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-purple-300 font-semibold mb-1">Premium Gift Box</h3>
                      <div className="text-sm text-purple-200">5 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={guaranteedItems.premium}
                      onChange={(e) => updateGuaranteedItem('premium', e.target.value)}
                      className="w-full bg-black/50 text-purple-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-purple-600/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-purple-200">
                      = {(guaranteedItems.premium * 5).toLocaleString()} points
                    </div>
                  </div>

                  {/* Deluxe Gift Box */}
                  <div className="bg-black/40 rounded-lg p-4 border border-blue-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-blue-300 font-semibold mb-1">Deluxe Gift Box</h3>
                      <div className="text-sm text-blue-200">2 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={guaranteedItems.deluxe}
                      onChange={(e) => updateGuaranteedItem('deluxe', e.target.value)}
                      className="w-full bg-black/50 text-blue-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-blue-600/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-blue-200">
                      = {(guaranteedItems.deluxe * 2).toLocaleString()} points
                    </div>
                  </div>

                  {/* Gift Box */}
                  <div className="bg-black/40 rounded-lg p-4 border border-pink-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-pink-300 font-semibold mb-1">Gift Box</h3>
                      <div className="text-sm text-pink-200">1 point each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={guaranteedItems.gift}
                      onChange={(e) => updateGuaranteedItem('gift', e.target.value)}
                      className="w-full bg-black/50 text-pink-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-pink-600/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-pink-200">
                      = {(guaranteedItems.gift * 1).toLocaleString()} points
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/20 to-black/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-red-300">Guaranteed Total</div>
                  <div className="text-2xl font-bold text-red-100">{guaranteedTotal.toLocaleString()} points</div>
                </div>
              </div>
            </div>

            {/* Random Intimacy Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Random Intimacy</h2>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-red-900/30">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {/* Intimacy Case */}
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-yellow-300 font-semibold mb-1">Intimacy Case</h3>
                      <div className="text-sm text-yellow-200">4-50 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={randomItems.intimacyCase}
                      onChange={(e) => updateRandomItem('intimacyCase', e.target.value)}
                      className="w-full bg-black/50 text-yellow-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-yellow-600/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-xs text-yellow-200">
                      {randomItems.intimacyCase > 0 && (
                        <span>{(randomItems.intimacyCase * 4).toLocaleString()} - {(randomItems.intimacyCase * 50).toLocaleString()} pts</span>
                      )}
                    </div>
                  </div>

                  {/* Intimacy Bag */}
                  <div className="bg-black/40 rounded-lg p-4 border border-green-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-green-300 font-semibold mb-1">Intimacy Bag</h3>
                      <div className="text-sm text-green-200">5-8 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={randomItems.intimacyBag}
                      onChange={(e) => updateRandomItem('intimacyBag', e.target.value)}
                      className="w-full bg-black/50 text-green-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-green-600/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-xs text-green-200">
                      {randomItems.intimacyBag > 0 && (
                        <span>{(randomItems.intimacyBag * 5).toLocaleString()} - {(randomItems.intimacyBag * 8).toLocaleString()} pts</span>
                      )}
                    </div>
                  </div>

                  {/* Intimacy Purse */}
                  <div className="bg-black/40 rounded-lg p-4 border border-orange-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-orange-300 font-semibold mb-1">Intimacy Purse</h3>
                      <div className="text-sm text-orange-200">1-4 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={randomItems.intimacyPurse}
                      onChange={(e) => updateRandomItem('intimacyPurse', e.target.value)}
                      className="w-full bg-black/50 text-orange-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-orange-600/50 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-xs text-orange-200">
                      {randomItems.intimacyPurse > 0 && (
                        <span>{(randomItems.intimacyPurse * 1).toLocaleString()} - {(randomItems.intimacyPurse * 4).toLocaleString()} pts</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/20 to-black/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-red-300">Estimated Total</div>
                  <div className="text-2xl font-bold text-red-100">
                    {randomTotalMin.toLocaleString()} - {randomTotalMax.toLocaleString()} points
                  </div>
                </div>
              </div>
            </div>

            {/* Herald of Fate Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Coins className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Herald of Fate</h2>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-red-900/30">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {/* Gold Demon Coin */}
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-yellow-300 font-semibold mb-1">Gold Demon Coin</h3>
                      <div className="text-sm text-yellow-200">25 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={heraldItems.gold}
                      onChange={(e) => updateHeraldItem('gold', e.target.value)}
                      className="w-full bg-black/50 text-yellow-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-yellow-600/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-yellow-200">
                      = {(heraldItems.gold * 25).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Silver Demon Coin */}
                  <div className="bg-black/40 rounded-lg p-4 border border-gray-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-gray-300 font-semibold mb-1">Silver Demon Coin</h3>
                      <div className="text-sm text-gray-200">5 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={heraldItems.silver}
                      onChange={(e) => updateHeraldItem('silver', e.target.value)}
                      className="w-full bg-black/50 text-gray-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-gray-600/50 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-gray-200">
                      = {(heraldItems.silver * 5).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Bronze Demon Coin */}
                  <div className="bg-black/40 rounded-lg p-4 border border-amber-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-amber-300 font-semibold mb-1">Bronze Demon Coin</h3>
                      <div className="text-sm text-amber-200">2 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={heraldItems.bronze}
                      onChange={(e) => updateHeraldItem('bronze', e.target.value)}
                      className="w-full bg-black/50 text-amber-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-amber-600/50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-amber-200">
                      = {(heraldItems.bronze * 2).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Demon Coin */}
                  <div className="bg-black/40 rounded-lg p-4 border border-red-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-red-300 font-semibold mb-1">Demon Coin</h3>
                      <div className="text-sm text-red-200">1 point each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={heraldItems.demon}
                      onChange={(e) => updateHeraldItem('demon', e.target.value)}
                      className="w-full bg-black/50 text-red-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-red-600/50 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-red-200">
                      = {(heraldItems.demon * 1).toLocaleString()} pts
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/20 to-black/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-red-300">Herald of Fate Total</div>
                  <div className="text-2xl font-bold text-red-100">{heraldTotal.toLocaleString()} points</div>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            {(guaranteedTotal > 0 || randomTotalMin > 0 || heraldTotal > 0) && (
              <div className="mt-6 bg-black/30 rounded-lg p-4 border border-red-900/30 text-sm">
                <h3 className="text-red-100 font-semibold mb-2">Summary:</h3>
                <div className="text-red-200 space-y-1">
                  <p>Guaranteed Intimacy: {guaranteedTotal.toLocaleString()} points</p>
                  <p>Random Intimacy: {randomTotalMin.toLocaleString()} - {randomTotalMax.toLocaleString()} points</p>
                  <p>Herald of Fate: {heraldTotal.toLocaleString()} points</p>
                  <p className="font-semibold text-red-100 pt-2">
                    Expected (Average): {totalAverage.toLocaleString()} points
                  </p>
                  <p className="text-red-300">
                    Range: {totalMin.toLocaleString()} - {totalMax.toLocaleString()} points
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntimacyCalculator;
