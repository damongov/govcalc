import React, { useState, useEffect } from 'react';
import { ScrollText, BookOpen, Save, Upload, Copy, Check, Sparkles, Shield, Plus, Trash2 } from 'lucide-react';

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

  const [talentScrolls, setTalentScrolls] = useState({
    superior: 0,
    fine: 0,
    basic: 0
  });

  // Wardens state - start with 5 default wardens
  const createDefaultWardens = () => [
    { id: 1, name: '', level: 1, exp: 0 },
    { id: 2, name: '', level: 1, exp: 0 },
    { id: 3, name: '', level: 1, exp: 0 },
    { id: 4, name: '', level: 1, exp: 0 },
    { id: 5, name: '', level: 1, exp: 0 },
  ];
  
  const [wardens, setWardens] = useState(createDefaultWardens());
  const [nextWardenId, setNextWardenId] = useState(6);

  const [scriptsTotal, setScriptsTotal] = useState(0);
  const [scrollsTotal, setScrollsTotal] = useState(0);
  const [talentScrollsTotal, setTalentScrollsTotal] = useState(0);
  const [talentScrollsExp, setTalentScrollsExp] = useState({ superior: 0, fine: 0, basic: 0 });
  const [wardensTotal, setWardensTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  
  // Warden divisors by level
  const wardenDivisors = {
    6: 1200,
    5: 1000,
    4: 800,
    3: 600,
    2: 400,
    1: 200
  };

  // Each level multiplies by its level number
  const getWardenPoints = (warden) => {
    const divisor = wardenDivisors[warden.level];
    const basePoints = Math.floor(warden.exp / divisor);
    return basePoints * warden.level;
  };

  const getWardenRemainder = (warden) => {
    const divisor = wardenDivisors[warden.level];
    return warden.exp % divisor;
  };

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

  // Calculate talent scrolls total
  useEffect(() => {
    const superiorExp = talentScrolls.superior * 200;
    const fineExp = talentScrolls.fine * 100;
    const basicExp = talentScrolls.basic * 50;
    
    setTalentScrollsExp({
      superior: superiorExp,
      fine: fineExp,
      basic: basicExp
    });
    
    const totalExp = superiorExp + fineExp + basicExp;
    const totalPoints = Math.floor(totalExp / 200);
    setTalentScrollsTotal(totalPoints);
  }, [talentScrolls]);

  // Calculate wardens total
  useEffect(() => {
    const total = wardens.reduce((sum, warden) => {
      const divisor = wardenDivisors[warden.level];
      const basePoints = Math.floor(warden.exp / divisor);
      return sum + (basePoints * warden.level);
    }, 0);
    setWardensTotal(total);
  }, [wardens]);

  // Calculate grand total
  useEffect(() => {
    setGrandTotal(scriptsTotal + scrollsTotal + talentScrollsTotal + wardensTotal);
  }, [scriptsTotal, scrollsTotal, talentScrollsTotal, wardensTotal]);

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

  const updateTalentScroll = (type, value) => {
    const numValue = parseInt(value) || 0;
    setTalentScrolls(prev => ({
      ...prev,
      [type]: Math.max(0, numValue)
    }));
  };

  // Warden management functions
  const updateWarden = (id, field, value) => {
    setWardens(prev => prev.map(warden => {
      if (warden.id === id) {
        if (field === 'exp') {
          return { ...warden, [field]: Math.max(0, parseInt(value) || 0) };
        } else if (field === 'level') {
          return { ...warden, [field]: parseInt(value) };
        } else {
          return { ...warden, [field]: value };
        }
      }
      return warden;
    }));
  };

  const addWarden = () => {
    setWardens(prev => [...prev, { id: nextWardenId, name: '', level: 1, exp: 0 }]);
    setNextWardenId(prev => prev + 1);
  };

  const removeWarden = (id) => {
    if (wardens.length > 1) {
      setWardens(prev => prev.filter(warden => warden.id !== id));
    }
  };

  // Save/Load Functions
  const generateSaveCode = () => {
    const saveData = {
      v: 3,
      s: scripts,
      l: scrolls,
      t: talentScrolls,
      w: wardens,
      wid: nextWardenId
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
      
      if (saveData.v !== 1 && saveData.v !== 2 && saveData.v !== 3) {
        setLoadError('Invalid save code version');
        return;
      }

      if (saveData.s) {
        setScripts(saveData.s);
      }

      if (saveData.l) {
        setScrolls(saveData.l);
      }

      if (saveData.t) {
        setTalentScrolls(saveData.t);
      }

      if (saveData.w) {
        setWardens(saveData.w);
        if (saveData.wid) {
          setNextWardenId(saveData.wid);
        } else {
          // Calculate next ID from existing wardens
          const maxId = Math.max(...saveData.w.map(w => w.id));
          setNextWardenId(maxId + 1);
        }
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

  const totalTalentExp = talentScrollsExp.superior + talentScrollsExp.fine + talentScrollsExp.basic;

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-red-200 mb-2 flex items-center justify-center gap-3">
              <ScrollText className="text-red-400" />
              Talent Calculator
            </h1>
            <p className="text-red-100 text-sm sm:text-base">Calculate your total talent points from scripts and scrolls</p>
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
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-red-300 text-sm">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">~</span> Scripts: {scriptsTotal.toLocaleString()}
                  <span className="text-yellow-400 text-xs">(est.)</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span className="text-green-400">✓</span> Level Scrolls: {scrollsTotal.toLocaleString()}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span className="text-green-400">✓</span> Talent Scrolls: {talentScrollsTotal.toLocaleString()}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span className="text-green-400">✓</span> Wardens: {wardensTotal.toLocaleString()}
                </span>
              </div>
              <div className="mt-3 text-xs text-red-400">
                <span className="text-yellow-400">~</span> = Estimated | <span className="text-green-400">✓</span> = Guaranteed
              </div>
            </div>

            {/* Scripts Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Scripts</h2>
                <span className="bg-yellow-900/50 text-yellow-300 text-xs px-2 py-1 rounded-full border border-yellow-600/50">
                  Estimated
                </span>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-red-900/30">
                <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3 mb-4 text-sm text-yellow-200">
                  <strong>Note:</strong> Script talent points are <em>estimated</em> based on typical values. Actual results may vary.
                </div>
                
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
                      ≈ {scripts.strength.toLocaleString()} pts
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
                      ≈ {scripts.allure.toLocaleString()} pts
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
                      ≈ {scripts.intellect.toLocaleString()} pts
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
                      ≈ {scripts.spirit.toLocaleString()} pts
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/20 to-black/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-red-300">Scripts Total <span className="text-yellow-400">(Estimated)</span></div>
                  <div className="text-2xl font-bold text-red-100">≈ {scriptsTotal.toLocaleString()} points</div>
                </div>
              </div>
            </div>

            {/* Level Scrolls Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <ScrollText className="text-red-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Level Scrolls</h2>
                <span className="bg-green-900/50 text-green-300 text-xs px-2 py-1 rounded-full border border-green-600/50">
                  Guaranteed
                </span>
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
                  <div className="text-sm text-red-300">Level Scrolls Total <span className="text-green-400">(Guaranteed)</span></div>
                  <div className="text-2xl font-bold text-red-100">{scrollsTotal.toLocaleString()} points</div>
                </div>
              </div>
            </div>

            {/* Talent Scrolls Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-amber-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Talent Scrolls</h2>
                <span className="bg-green-900/50 text-green-300 text-xs px-2 py-1 rounded-full border border-green-600/50">
                  Guaranteed
                </span>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-amber-900/30">
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mb-4 text-sm text-amber-200">
                  <strong>Conversion:</strong> 200 Talent EXP = 1 Talent Point (whole numbers only)
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {/* Superior Talent Scroll */}
                  <div className="bg-black/40 rounded-lg p-4 border border-amber-500/50">
                    <div className="text-center mb-3">
                      <h3 className="text-amber-300 font-semibold mb-1">Superior</h3>
                      <div className="text-sm text-amber-200">200 EXP each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={talentScrolls.superior}
                      onChange={(e) => updateTalentScroll('superior', e.target.value)}
                      className="w-full bg-black/50 text-amber-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-amber-500/50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-amber-200">
                      = {talentScrollsExp.superior.toLocaleString()} EXP
                    </div>
                  </div>

                  {/* Fine Talent Scroll */}
                  <div className="bg-black/40 rounded-lg p-4 border border-sky-500/50">
                    <div className="text-center mb-3">
                      <h3 className="text-sky-300 font-semibold mb-1">Fine</h3>
                      <div className="text-sm text-sky-200">100 EXP each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={talentScrolls.fine}
                      onChange={(e) => updateTalentScroll('fine', e.target.value)}
                      className="w-full bg-black/50 text-sky-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-sky-500/50 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-sky-200">
                      = {talentScrollsExp.fine.toLocaleString()} EXP
                    </div>
                  </div>

                  {/* Basic Talent Scroll */}
                  <div className="bg-black/40 rounded-lg p-4 border border-stone-500/50">
                    <div className="text-center mb-3">
                      <h3 className="text-stone-300 font-semibold mb-1">Basic</h3>
                      <div className="text-sm text-stone-200">50 EXP each</div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={talentScrolls.basic}
                      onChange={(e) => updateTalentScroll('basic', e.target.value)}
                      className="w-full bg-black/50 text-stone-100 text-center text-xl font-bold px-3 py-2 rounded-lg border border-stone-500/50 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400/50"
                      placeholder="0"
                    />
                    <div className="text-center mt-2 text-sm text-stone-200">
                      = {talentScrollsExp.basic.toLocaleString()} EXP
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-900/20 to-black/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-amber-300 mb-1">
                    Total EXP: {totalTalentExp.toLocaleString()} ÷ 200
                  </div>
                  <div className="text-sm text-red-300">Talent Scrolls Total <span className="text-green-400">(Guaranteed)</span></div>
                  <div className="text-2xl font-bold text-red-100">{talentScrollsTotal.toLocaleString()} points</div>
                  {totalTalentExp % 200 > 0 && (
                    <div className="text-xs text-amber-400 mt-1">
                      ({totalTalentExp % 200} EXP remaining toward next point)
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Wardens Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-emerald-300" size={24} />
                <h2 className="text-xl font-bold text-red-100">Wardens</h2>
                <span className="bg-green-900/50 text-green-300 text-xs px-2 py-1 rounded-full border border-green-600/50">
                  Guaranteed
                </span>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-emerald-900/30">
                <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-3 mb-4 text-sm text-emerald-200">
                  <strong>Conversion rates by talent level:</strong>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-2 text-xs">
                    <span>L6: (EXP÷1200)×6</span>
                    <span>L5: (EXP÷1000)×5</span>
                    <span>L4: (EXP÷800)×4</span>
                    <span>L3: (EXP÷600)×3</span>
                    <span>L2: (EXP÷400)×2</span>
                    <span>L1: (EXP÷200)×1</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  {wardens.map((warden, index) => (
                    <div key={warden.id} className="bg-black/40 rounded-lg p-3 border border-emerald-700/30">
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Warden Number/Name */}
                        <div className="flex-1 min-w-[120px]">
                          <label className="text-xs text-emerald-400 mb-1 block">Name (optional)</label>
                          <input
                            type="text"
                            value={warden.name}
                            onChange={(e) => updateWarden(warden.id, 'name', e.target.value)}
                            placeholder={`Warden ${index + 1}`}
                            className="w-full bg-black/50 text-emerald-100 px-3 py-2 rounded border border-emerald-600/50 focus:border-emerald-400 focus:outline-none text-sm"
                          />
                        </div>
                        
                        {/* Talent Level Dropdown */}
                        <div className="w-32">
                          <label className="text-xs text-emerald-400 mb-1 block">Talent Level</label>
                          <select
                            value={warden.level}
                            onChange={(e) => updateWarden(warden.id, 'level', e.target.value)}
                            className="w-full bg-black/50 text-emerald-100 px-3 py-2 rounded border border-emerald-600/50 focus:border-emerald-400 focus:outline-none text-sm"
                          >
                            <option value={6}>Level 6</option>
                            <option value={5}>Level 5</option>
                            <option value={4}>Level 4</option>
                            <option value={3}>Level 3</option>
                            <option value={2}>Level 2</option>
                            <option value={1}>Level 1</option>
                          </select>
                        </div>
                        
                        {/* Talent EXP */}
                        <div className="w-32">
                          <label className="text-xs text-emerald-400 mb-1 block">Talent EXP</label>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={warden.exp}
                            onChange={(e) => updateWarden(warden.id, 'exp', e.target.value)}
                            className="w-full bg-black/50 text-emerald-100 px-3 py-2 rounded border border-emerald-600/50 focus:border-emerald-400 focus:outline-none text-sm"
                            placeholder="0"
                          />
                        </div>
                        
                        {/* Points Display */}
                        <div className="w-24 text-center">
                          <label className="text-xs text-emerald-400 mb-1 block">Points</label>
                          <div className="bg-emerald-900/30 rounded px-3 py-2 text-emerald-100 font-bold">
                            {getWardenPoints(warden).toLocaleString()}
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <div className="flex items-end">
                          <button
                            onClick={() => removeWarden(warden.id)}
                            disabled={wardens.length <= 1}
                            className={`p-2 rounded transition-colors ${
                              wardens.length <= 1 
                                ? 'text-gray-600 cursor-not-allowed' 
                                : 'text-red-400 hover:bg-red-900/30 hover:text-red-300'
                            }`}
                            title={wardens.length <= 1 ? 'Must have at least one warden' : 'Remove warden'}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Remainder info */}
                      {warden.exp > 0 && getWardenRemainder(warden) > 0 && (
                        <div className="text-xs text-emerald-400 mt-2 pl-1">
                          {getWardenRemainder(warden).toLocaleString()} EXP remaining toward next point (need {wardenDivisors[warden.level] - getWardenRemainder(warden)} more)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Add Warden Button */}
                <button
                  onClick={addWarden}
                  className="w-full bg-emerald-800/30 hover:bg-emerald-800/50 text-emerald-200 px-4 py-2 rounded-lg border border-emerald-700/50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add Warden
                </button>

                <div className="bg-gradient-to-r from-emerald-900/20 to-black/20 rounded-lg p-3 text-center mt-4">
                  <div className="text-sm text-emerald-300">Wardens Total <span className="text-green-400">(Guaranteed)</span></div>
                  <div className="text-2xl font-bold text-red-100">{wardensTotal.toLocaleString()} points</div>
                  <div className="text-xs text-emerald-400 mt-1">
                    from {wardens.filter(w => w.exp > 0).length} warden{wardens.filter(w => w.exp > 0).length !== 1 ? 's' : ''} with EXP
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            {grandTotal > 0 && (
              <div className="bg-black/30 rounded-lg p-4 border border-red-900/30 text-sm">
                <h3 className="text-red-100 font-semibold mb-2">Summary:</h3>
                <div className="text-red-200 space-y-1">
                  <p>
                    <span className="text-yellow-400">~</span> Scripts: ≈ {scriptsTotal.toLocaleString()} points 
                    <span className="text-yellow-400 text-xs ml-1">(estimated)</span>
                  </p>
                  <p className="pl-4 text-xs text-red-300">
                    Strength: {scripts.strength.toLocaleString()} | 
                    Allure: {scripts.allure.toLocaleString()} | 
                    Intellect: {scripts.intellect.toLocaleString()} | 
                    Spirit: {scripts.spirit.toLocaleString()}
                  </p>
                  <p>
                    <span className="text-green-400">✓</span> Level Scrolls: {scrollsTotal.toLocaleString()} points
                    <span className="text-green-400 text-xs ml-1">(guaranteed)</span>
                  </p>
                  <p className="pl-4 text-xs text-red-300">
                    L6: {scrolls.level6} ({scrolls.level6 * 6}) | 
                    L5: {scrolls.level5} ({scrolls.level5 * 5}) | 
                    L4: {scrolls.level4} ({scrolls.level4 * 4}) | 
                    L3: {scrolls.level3} ({scrolls.level3 * 3}) | 
                    L2: {scrolls.level2} ({scrolls.level2 * 2}) | 
                    L1: {scrolls.level1} ({scrolls.level1 * 1})
                  </p>
                  <p>
                    <span className="text-green-400">✓</span> Talent Scrolls: {talentScrollsTotal.toLocaleString()} points
                    <span className="text-green-400 text-xs ml-1">(guaranteed)</span>
                  </p>
                  <p className="pl-4 text-xs text-red-300">
                    Superior: {talentScrolls.superior} ({talentScrollsExp.superior} EXP) | 
                    Fine: {talentScrolls.fine} ({talentScrollsExp.fine} EXP) | 
                    Basic: {talentScrolls.basic} ({talentScrollsExp.basic} EXP) |
                    Total: {totalTalentExp} EXP
                  </p>
                  <p>
                    <span className="text-green-400">✓</span> Wardens: {wardensTotal.toLocaleString()} points
                    <span className="text-green-400 text-xs ml-1">(guaranteed)</span>
                  </p>
                  <div className="pl-4 text-xs text-red-300">
                    {wardens.filter(w => w.exp > 0).map((warden, idx) => (
                      <span key={warden.id}>
                        {warden.name || `Warden ${wardens.indexOf(warden) + 1}`} (L{warden.level}): {warden.exp.toLocaleString()} EXP → {getWardenPoints(warden)} pts
                        {idx < wardens.filter(w => w.exp > 0).length - 1 ? ' | ' : ''}
                      </span>
                    ))}
                    {wardens.filter(w => w.exp > 0).length === 0 && <span>No wardens with EXP entered</span>}
                  </div>
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
