import React, { useState, useEffect } from 'react';
import { Heart, Flower, Sparkles, Save, Upload, Copy, Check } from 'lucide-react';

const AttractionCalculator = ({ onNavigate }) => {
  const [guaranteedItems, setGuaranteedItems] = useState({
    indigo: 0,
    azure: 0,
    rose: 0
  });

  const [randomItems, setRandomItems] = useState({
    charmBox: 0,
    charmBottle: 0,
    charmPhial: 0
  });

  const [sideGameItems, setSideGameItems] = useState({
    gilded: 0,
    sanguine: 0,
    nocturnal: 0,
    spectral: 0
  });

  const [guaranteedTotal, setGuaranteedTotal] = useState(0);
  const [randomTotalMin, setRandomTotalMin] = useState(0);
  const [randomTotalMax, setRandomTotalMax] = useState(0);
  const [sideGameTotal, setSideGameTotal] = useState(0);

  // Save/Load state
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const [saveCode, setSaveCode] = useState('');
  const [loadCode, setLoadCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loadError, setLoadError] = useState('');

  // Calculate guaranteed total
  useEffect(() => {
    const total = (guaranteedItems.indigo * 5) + 
                  (guaranteedItems.azure * 2) + 
                  (guaranteedItems.rose * 1);
    setGuaranteedTotal(total);
  }, [guaranteedItems]);

  // Calculate random totals (min and max)
  useEffect(() => {
    const minTotal = (randomItems.charmBox * 4) + 
                     (randomItems.charmBottle * 5) + 
                     (randomItems.charmPhial * 1);
    const maxTotal = (randomItems.charmBox * 50) + 
                     (randomItems.charmBottle * 8) + 
                     (randomItems.charmPhial * 4);
    setRandomTotalMin(minTotal);
    setRandomTotalMax(maxTotal);
  }, [randomItems]);

  // Calculate side game total
  useEffect(() => {
    const total = (sideGameItems.gilded * 25) + 
                  (sideGameItems.sanguine * 5) + 
                  (sideGameItems.nocturnal * 2) + 
                  (sideGameItems.spectral * 1);
    setSideGameTotal(total);
  }, [sideGameItems]);

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

  const updateSideGameItem = (item, value) => {
    const numValue = parseInt(value) || 0;
    setSideGameItems(prev => ({
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
      s: sideGameItems
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

      // Load side game items
      if (saveData.s) {
        setSideGameItems(saveData.s);
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

  const totalMin = guaranteedTotal + randomTotalMin + sideGameTotal;
  const totalMax = guaranteedTotal + randomTotalMax + sideGameTotal;
  const totalAverage = Math.round((totalMin + totalMax) / 2);

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-red-200 mb-2 flex items-center justify-center gap-3">
              <Flower className="text-red-400" />
              Attraction Calculator
            </h1>
            <p className="text-red-100 text-sm sm:text-base">Calculate your attraction points from bouquets and charm items</p>
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
              <h2 className="text-lg text-red-200 mb-2">Expected Attraction</h2>
              <div className="text-5xl sm:text-6xl font-bold text-red-100 mb-4">
                {totalAverage.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-2 text-red-300 text-sm">
                <span>Range: {totalMin.toLocaleString()}</span>
                <Flower className="text-red-400" size={16} />
                <span>{totalMax.toLocaleString()}</span>
              </div>
            </div>

            {/* Guaranteed Attraction Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Flower className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Guaranteed Attraction</h2>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-red-900/30">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {/* Indigo Bouquet */}
                  <div className="bg-black/40 rounded-lg p-4 border border-purple-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-purple-300 font-semibold mb-1">Indigo Bouquet</h3>
                      <div className="text-sm text-purple-200">5 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={guaranteedItems.indigo}
                      onChange={(e) => updateGuaranteedItem('indigo', e.target.value)}
                      className="w-full bg-black/50 text-purple-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-purple-600/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-purple-200">
                      = {(guaranteedItems.indigo * 5).toLocaleString()} points
                    </div>
                  </div>

                  {/* Azure Bouquet */}
                  <div className="bg-black/40 rounded-lg p-4 border border-blue-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-blue-300 font-semibold mb-1">Azure Bouquet</h3>
                      <div className="text-sm text-blue-200">2 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={guaranteedItems.azure}
                      onChange={(e) => updateGuaranteedItem('azure', e.target.value)}
                      className="w-full bg-black/50 text-blue-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-blue-600/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-blue-200">
                      = {(guaranteedItems.azure * 2).toLocaleString()} points
                    </div>
                  </div>

                  {/* Rose Bouquet */}
                  <div className="bg-black/40 rounded-lg p-4 border border-pink-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-pink-300 font-semibold mb-1">Rose Bouquet</h3>
                      <div className="text-sm text-pink-200">1 point each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={guaranteedItems.rose}
                      onChange={(e) => updateGuaranteedItem('rose', e.target.value)}
                      className="w-full bg-black/50 text-pink-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-pink-600/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-pink-200">
                      = {(guaranteedItems.rose * 1).toLocaleString()} points
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/20 to-black/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-red-300">Guaranteed Total</div>
                  <div className="text-2xl font-bold text-red-100">{guaranteedTotal.toLocaleString()} points</div>
                </div>
              </div>
            </div>

            {/* Random Attraction Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Random Attraction</h2>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-red-900/30">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {/* Charm Box */}
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-yellow-300 font-semibold mb-1">Charm Box</h3>
                      <div className="text-sm text-yellow-200">4-50 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={randomItems.charmBox}
                      onChange={(e) => updateRandomItem('charmBox', e.target.value)}
                      className="w-full bg-black/50 text-yellow-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-yellow-600/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-xs text-yellow-200">
                      {randomItems.charmBox > 0 && (
                        <span>{(randomItems.charmBox * 4).toLocaleString()} - {(randomItems.charmBox * 50).toLocaleString()} pts</span>
                      )}
                    </div>
                  </div>

                  {/* Charm Bottle */}
                  <div className="bg-black/40 rounded-lg p-4 border border-green-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-green-300 font-semibold mb-1">Charm Bottle</h3>
                      <div className="text-sm text-green-200">5-8 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={randomItems.charmBottle}
                      onChange={(e) => updateRandomItem('charmBottle', e.target.value)}
                      className="w-full bg-black/50 text-green-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-green-600/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-xs text-green-200">
                      {randomItems.charmBottle > 0 && (
                        <span>{(randomItems.charmBottle * 5).toLocaleString()} - {(randomItems.charmBottle * 8).toLocaleString()} pts</span>
                      )}
                    </div>
                  </div>

                  {/* Charm Phial */}
                  <div className="bg-black/40 rounded-lg p-4 border border-orange-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-orange-300 font-semibold mb-1">Charm Phial</h3>
                      <div className="text-sm text-orange-200">1-4 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={randomItems.charmPhial}
                      onChange={(e) => updateRandomItem('charmPhial', e.target.value)}
                      className="w-full bg-black/50 text-orange-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-orange-600/50 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-xs text-orange-200">
                      {randomItems.charmPhial > 0 && (
                        <span>{(randomItems.charmPhial * 1).toLocaleString()} - {(randomItems.charmPhial * 4).toLocaleString()} pts</span>
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

            {/* Side Game Attraction Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Side Game Attraction</h2>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-red-900/30">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {/* Gilded Text */}
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-yellow-300 font-semibold mb-1">Gilded Text</h3>
                      <div className="text-sm text-yellow-200">25 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={sideGameItems.gilded}
                      onChange={(e) => updateSideGameItem('gilded', e.target.value)}
                      className="w-full bg-black/50 text-yellow-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-yellow-600/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-yellow-200">
                      = {(sideGameItems.gilded * 25).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Sanguine Text */}
                  <div className="bg-black/40 rounded-lg p-4 border border-red-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-red-300 font-semibold mb-1">Sanguine Text</h3>
                      <div className="text-sm text-red-200">5 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={sideGameItems.sanguine}
                      onChange={(e) => updateSideGameItem('sanguine', e.target.value)}
                      className="w-full bg-black/50 text-red-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-red-600/50 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-red-200">
                      = {(sideGameItems.sanguine * 5).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Nocturnal Text */}
                  <div className="bg-black/40 rounded-lg p-4 border border-indigo-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-indigo-300 font-semibold mb-1">Nocturnal Text</h3>
                      <div className="text-sm text-indigo-200">2 points each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={sideGameItems.nocturnal}
                      onChange={(e) => updateSideGameItem('nocturnal', e.target.value)}
                      className="w-full bg-black/50 text-indigo-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-indigo-600/50 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-indigo-200">
                      = {(sideGameItems.nocturnal * 2).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Spectral Text */}
                  <div className="bg-black/40 rounded-lg p-4 border border-gray-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-gray-300 font-semibold mb-1">Spectral Text</h3>
                      <div className="text-sm text-gray-200">1 point each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={sideGameItems.spectral}
                      onChange={(e) => updateSideGameItem('spectral', e.target.value)}
                      className="w-full bg-black/50 text-gray-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-gray-600/50 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-gray-200">
                      = {(sideGameItems.spectral * 1).toLocaleString()} pts
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/20 to-black/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-red-300">Side Game Total</div>
                  <div className="text-2xl font-bold text-red-100">{sideGameTotal.toLocaleString()} points</div>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            {(guaranteedTotal > 0 || randomTotalMin > 0 || sideGameTotal > 0) && (
              <div className="mt-6 bg-black/30 rounded-lg p-4 border border-red-900/30 text-sm">
                <h3 className="text-red-100 font-semibold mb-2">Summary:</h3>
                <div className="text-red-200 space-y-1">
                  <p>Guaranteed Attraction: {guaranteedTotal.toLocaleString()} points</p>
                  <p>Random Attraction: {randomTotalMin.toLocaleString()} - {randomTotalMax.toLocaleString()} points</p>
                  <p>Side Game Attraction: {sideGameTotal.toLocaleString()} points</p>
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

export default AttractionCalculator;
