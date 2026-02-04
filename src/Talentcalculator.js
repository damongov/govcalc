import React, { useState, useEffect } from 'react';
import { ScrollText, BookOpen, Save, Upload, Copy, Check } from 'lucide-react';

const TalentCalculator = () => {
  const [scripts, setScripts] = useState({
    strength: 0,
    allure: 0,
    intellect: 0,
    spirit: 0
  });

  const [scrolls, setScrolls] = useState({
    level6: 0,
    level5: 0,
    level4: 0,
    level3: 0,
    level2: 0,
    level1: 0
  });

  const [scriptsTotal, setScriptsTotal] = useState(0);
  const [scrollsTotal, setScrollsTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Save/Load state
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const [saveCode, setSaveCode] = useState('');
  const [loadCode, setLoadCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loadError, setLoadError] = useState('');

  // Calculate scripts total
  useEffect(() => {
    const total = scripts.strength + scripts.allure + scripts.intellect + scripts.spirit;
    setScriptsTotal(total);
  }, [scripts]);

  // Calculate scrolls total
  useEffect(() => {
    const total = 
      (scrolls.level6 * 6) +
      (scrolls.level5 * 5) +
      (scrolls.level4 * 4) +
      (scrolls.level3 * 3) +
      (scrolls.level2 * 2) +
      (scrolls.level1 * 1);
    setScrollsTotal(total);
  }, [scrolls]);

  // Calculate grand total
  useEffect(() => {
    setGrandTotal(scriptsTotal + scrollsTotal);
  }, [scriptsTotal, scrollsTotal]);

  const updateScript = (type, value) => {
    const numValue = parseInt(value) || 0;
    setScripts(prev => ({
      ...prev,
      [type]: Math.max(0, numValue)
    }));
  };

  const updateScroll = (level, value) => {
    const numValue = parseInt(value) || 0;
    setScrolls(prev => ({
      ...prev,
      [level]: Math.max(0, numValue)
    }));
  };

  // Save/Load Functions
  const generateSaveCode = () => {
    const saveData = {
      v: 1,
      s: scripts,
      l: scrolls
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
      
      if (saveData.v !== 1) {
        setLoadError('Invalid save code version');
        return;
      }

      if (saveData.s) {
        setScripts(saveData.s);
      }

      if (saveData.l) {
        setScrolls(saveData.l);
      }

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

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-red-200 mb-2 flex items-center justify-center gap-3">
              <ScrollText className="text-red-400" />
              Talent Calculator
            </h1>
            <p className="text-red-100 text-sm sm:text-base">Calculate your total talent points from scripts and level scrolls</p>
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
            {/* Total Results Box */}
            <div className="bg-gradient-to-r from-red-900/30 to-black/30 border border-red-700/50 rounded-xl p-6 mb-8 text-center">
              <h2 className="text-lg text-red-200 mb-2">Total Talent Points</h2>
              <div className="text-5xl sm:text-6xl font-bold text-red-100 mb-4">
                {grandTotal.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-4 text-red-300 text-sm">
                <span>Scripts: {scriptsTotal.toLocaleString()}</span>
                <span>•</span>
                <span>Scrolls: {scrollsTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Scripts Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Scripts</h2>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-red-900/30">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {/* Strength */}
                  <div className="bg-black/40 rounded-lg p-4 border border-red-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-red-300 font-semibold mb-1">Strength</h3>
                      <div className="text-sm text-red-200">1 point each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scripts.strength}
                      onChange={(e) => updateScript('strength', e.target.value)}
                      className="w-full bg-black/50 text-red-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-red-600/50 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-red-200">
                      = {scripts.strength.toLocaleString()} pts
                    </div>
                  </div>

                  {/* Allure */}
                  <div className="bg-black/40 rounded-lg p-4 border border-purple-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-purple-300 font-semibold mb-1">Allure</h3>
                      <div className="text-sm text-purple-200">1 point each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scripts.allure}
                      onChange={(e) => updateScript('allure', e.target.value)}
                      className="w-full bg-black/50 text-purple-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-purple-600/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-purple-200">
                      = {scripts.allure.toLocaleString()} pts
                    </div>
                  </div>

                  {/* Intellect */}
                  <div className="bg-black/40 rounded-lg p-4 border border-blue-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-blue-300 font-semibold mb-1">Intellect</h3>
                      <div className="text-sm text-blue-200">1 point each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scripts.intellect}
                      onChange={(e) => updateScript('intellect', e.target.value)}
                      className="w-full bg-black/50 text-blue-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-blue-600/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-blue-200">
                      = {scripts.intellect.toLocaleString()} pts
                    </div>
                  </div>

                  {/* Spirit */}
                  <div className="bg-black/40 rounded-lg p-4 border border-green-700/50">
                    <div className="text-center mb-3">
                      <h3 className="text-green-300 font-semibold mb-1">Spirit</h3>
                      <div className="text-sm text-green-200">1 point each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scripts.spirit}
                      onChange={(e) => updateScript('spirit', e.target.value)}
                      className="w-full bg-black/50 text-green-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-green-600/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-green-200">
                      = {scripts.spirit.toLocaleString()} pts
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/20 to-black/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-red-300">Scripts Total</div>
                  <div className="text-2xl font-bold text-red-100">{scriptsTotal.toLocaleString()} points</div>
                </div>
              </div>
            </div>

            {/* Level Scrolls Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <ScrollText className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Level Scrolls</h2>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-red-900/30">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                  {/* Level 6 */}
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-yellow-300 font-semibold mb-1">Level 6</h3>
                      <div className="text-sm text-yellow-200">×6 points</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scrolls.level6}
                      onChange={(e) => updateScroll('level6', e.target.value)}
                      className="w-full bg-black/50 text-yellow-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-yellow-600/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-yellow-200">
                      = {(scrolls.level6 * 6).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Level 5 */}
                  <div className="bg-black/40 rounded-lg p-4 border border-orange-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-orange-300 font-semibold mb-1">Level 5</h3>
                      <div className="text-sm text-orange-200">×5 points</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scrolls.level5}
                      onChange={(e) => updateScroll('level5', e.target.value)}
                      className="w-full bg-black/50 text-orange-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-orange-600/50 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-orange-200">
                      = {(scrolls.level5 * 5).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Level 4 */}
                  <div className="bg-black/40 rounded-lg p-4 border border-pink-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-pink-300 font-semibold mb-1">Level 4</h3>
                      <div className="text-sm text-pink-200">×4 points</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scrolls.level4}
                      onChange={(e) => updateScroll('level4', e.target.value)}
                      className="w-full bg-black/50 text-pink-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-pink-600/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-pink-200">
                      = {(scrolls.level4 * 4).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Level 3 */}
                  <div className="bg-black/40 rounded-lg p-4 border border-cyan-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-cyan-300 font-semibold mb-1">Level 3</h3>
                      <div className="text-sm text-cyan-200">×3 points</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scrolls.level3}
                      onChange={(e) => updateScroll('level3', e.target.value)}
                      className="w-full bg-black/50 text-cyan-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-cyan-600/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-cyan-200">
                      = {(scrolls.level3 * 3).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Level 2 */}
                  <div className="bg-black/40 rounded-lg p-4 border border-indigo-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-indigo-300 font-semibold mb-1">Level 2</h3>
                      <div className="text-sm text-indigo-200">×2 points</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scrolls.level2}
                      onChange={(e) => updateScroll('level2', e.target.value)}
                      className="w-full bg-black/50 text-indigo-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-indigo-600/50 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-indigo-200">
                      = {(scrolls.level2 * 2).toLocaleString()} pts
                    </div>
                  </div>

                  {/* Level 1 */}
                  <div className="bg-black/40 rounded-lg p-4 border border-gray-600/50">
                    <div className="text-center mb-3">
                      <h3 className="text-gray-300 font-semibold mb-1">Level 1</h3>
                      <div className="text-sm text-gray-200">×1 point</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={scrolls.level1}
                      onChange={(e) => updateScroll('level1', e.target.value)}
                      className="w-full bg-black/50 text-gray-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-gray-600/50 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-gray-200">
                      = {(scrolls.level1 * 1).toLocaleString()} pts
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/20 to-black/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-red-300">Level Scrolls Total</div>
                  <div className="text-2xl font-bold text-red-100">{scrollsTotal.toLocaleString()} points</div>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            {grandTotal > 0 && (
              <div className="bg-black/30 rounded-lg p-4 border border-red-900/30 text-sm">
                <h3 className="text-red-100 font-semibold mb-2">Summary:</h3>
                <div className="text-red-200 space-y-1">
                  <p>Scripts: {scriptsTotal.toLocaleString()} points</p>
                  <p className="pl-4 text-xs text-red-300">
                    Strength: {scripts.strength.toLocaleString()} | 
                    Allure: {scripts.allure.toLocaleString()} | 
                    Intellect: {scripts.intellect.toLocaleString()} | 
                    Spirit: {scripts.spirit.toLocaleString()}
                  </p>
                  <p>Level Scrolls: {scrollsTotal.toLocaleString()} points</p>
                  <p className="pl-4 text-xs text-red-300">
                    L6: {scrolls.level6} ({scrolls.level6 * 6}) | 
                    L5: {scrolls.level5} ({scrolls.level5 * 5}) | 
                    L4: {scrolls.level4} ({scrolls.level4 * 4}) | 
                    L3: {scrolls.level3} ({scrolls.level3 * 3}) | 
                    L2: {scrolls.level2} ({scrolls.level2 * 2}) | 
                    L1: {scrolls.level1} ({scrolls.level1 * 1})
                  </p>
                  <p className="font-semibold text-red-100 pt-2 border-t border-red-900/30 mt-2">
                    Grand Total: {grandTotal.toLocaleString()} talent points
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

export default TalentCalculator;
