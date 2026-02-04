import React, { useState, useEffect } from 'react';
import { Book, Save, Upload, Copy, Check } from 'lucide-react';

const BookIcon = ({ type }) => {
  const getBookStyle = (type) => {
    switch(type) {
      case 'Strength':
        return {
          bg: 'linear-gradient(135deg, #8B4513 0%, #D2691E  50%, #CD853F 100%)',
          symbol: '💪',
          symbolColor: '#FFD700'
        };
      case 'Allure':
        return {
          bg: 'linear-gradient(135deg, #4B0082 0%, #8A2BE2 50%, #9370DB 100%)',
          symbol: '💫',
          symbolColor: '#FFD700'
        };
      case 'Intellect':
        return {
          bg: 'linear-gradient(135deg, #228B22 0%, #32CD32 50%, #98FB98 100%)',
          symbol: '📖',
          symbolColor: '#FFD700'
        };
      case 'Spirit':
        return {
          bg: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 50%, #87CEEB 100%)',
          symbol: '👁',
          symbolColor: '#FFD700'
        };
      case 'Random':
        return {
          bg: 'linear-gradient(135deg, #2F4F4F 0%, #696969 50%, #A9A9A9 100%)',
          symbol: '❓',
          symbolColor: '#FFD700'
        };
      default:
        return {
          bg: '#666',
          symbol: '📘',
          symbolColor: '#FFD700'
        };
    }
  };

  const style = getBookStyle(type);

  return (
    <div className="relative w-5 h-6 transform hover:scale-110 transition-transform">
      <div 
        className="absolute inset-0 rounded-sm shadow-lg border border-black/30"
        style={{ background: style.bg }}
      >
        <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-black/20 rounded-full"></div>
        <div className="absolute bottom-0.5 left-0.5 right-0.5 h-0.5 bg-black/20 rounded-full"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-xs leading-none"
            style={{ color: style.symbolColor, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
          >
            {style.symbol}
          </span>
        </div>
        
        <div className="absolute right-0 top-0.5 bottom-0.5 w-0.5 bg-white/80 rounded-r-sm"></div>
      </div>
    </div>
  );
};

const DominanceCalculator = () => {
  const [booksByAttribute, setBooksByAttribute] = useState({
    Strength: {
      attribute: 'Strength',
      books: {
        warfare1: { name: 'Warfare I', value: 100, count: 0 },
        warfare2: { name: 'Warfare II', value: 400, count: 0 },
        warfare3: { name: 'Warfare III', value: 1000, count: 0 },
        warfare4: { name: 'Warfare IV', value: 5000, count: 0 },
        combat1: { name: 'Combat I', value: 100, wardenMultiplier: 15, count: 0 },
        combat2: { name: 'Combat II', value: 1000, wardenMultiplier: 15, count: 0 }
      }
    },
    Allure: {
      attribute: 'Allure',
      books: {
        glamor1: { name: 'Glamor I', value: 100, count: 0 },
        glamor2: { name: 'Glamor II', value: 400, count: 0 },
        glamor3: { name: 'Glamor III', value: 1000, count: 0 },
        glamor4: { name: 'Glamor IV', value: 5000, count: 0 },
        beauty1: { name: 'Beauty I', value: 100, wardenMultiplier: 15, count: 0 },
        beauty2: { name: 'Beauty II', value: 1000, wardenMultiplier: 15, count: 0 }
      }
    },
    Intellect: {
      attribute: 'Intellect',
      books: {
        alchemy1: { name: 'Alchemy I', value: 100, count: 0 },
        alchemy2: { name: 'Alchemy II', value: 400, count: 0 },
        alchemy3: { name: 'Alchemy III', value: 1000, count: 0 },
        alchemy4: { name: 'Alchemy IV', value: 5000, count: 0 },
        history1: { name: 'History I', value: 100, wardenMultiplier: 15, count: 0 },
        history2: { name: 'History II', value: 1000, wardenMultiplier: 15, count: 0 }
      }
    },
    Spirit: {
      attribute: 'Spirit',
      books: {
        occult1: { name: 'Occult I', value: 100, count: 0 },
        occult2: { name: 'Occult II', value: 400, count: 0 },
        occult3: { name: 'Occult III', value: 1000, count: 0 },
        occult4: { name: 'Occult IV', value: 5000, count: 0 },
        mysticism1: { name: 'Mysticism I', value: 100, wardenMultiplier: 15, count: 0 },
        mysticism2: { name: 'Mysticism II', value: 1000, wardenMultiplier: 15, count: 0 }
      }
    },
    Random: {
      attribute: 'Random',
      books: {
        encyclopediaAE: { name: 'Encyclopedia A-E', value: 100, count: 0 },
        encyclopediaAJ: { name: 'Encyclopedia A-J', value: 400, count: 0 },
        encyclopediaAO: { name: 'Encyclopedia A-O', value: 1000, count: 0 },
        encyclopediaAT: { name: 'Encyclopedia A-T', value: 5000, count: 0 },
        encyclopediaAZ: { name: 'Encyclopedia A-Z', value: 10000, count: 0 },
        arcana1: { name: 'Arcana I', value: 100, wardenMultiplier: 15, count: 0 },
        arcana2: { name: 'Arcana II', value: 1000, wardenMultiplier: 15, count: 0 }
      }
    }
  });

  const [wardenAuras, setWardenAuras] = useState({
    // Wild Hunt
    rudra_talent: 0,
    rudra_books: 0,
    woden_talent: 0,
    woden_books: 0,
    artemis_talent: 0,
    artemis_books: 0,
    finn_talent: 0,
    finn_books: 0,
    
    // Monster Noir
    eddie_talent: 0,
    eddie_books: 0,
    scarlet_talent: 0,
    scarlet_books: 0,
    sam_talent: 0,
    sam_books: 0,
    grendel_talent: 0,
    grendel_books: 0,
    
    // Bloody Tyrants
    cesare_talent: 0,
    cesare_books: 0,
    max_talent: 0,
    max_books: 0,
    erzsebet_talent: 0,
    erzsebet_books: 0,
    ivan_talent: 0,
    ivan_books: 0,
    maria_talent: 0,
    maria_books: 0,
    
    // Misc Wardens
    dracula_talent: 0,
    dracula_books: 0,
    nyx_talent: 0,
    nyx_books: 0,
    frederick_talent: 0,
    frederick_books: 0,
    victor_talent: 0,
    
    // VIP Wardens
    tomas_talent: 0,
    cleo_talent: 0,
    aurelia_talent: 0,
    william_talent: 0,
    poe_talent: 0,
    poe_books: 0,
    damian_talent: 0,
    damian_books: 0,
    vance_talent: 0,
    vance_books: 0,
    diana_talent: 0,
    diana_books: 0
  });

  const [totalDominance, setTotalDominance] = useState(0);
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const [saveCode, setSaveCode] = useState('');
  const [loadCode, setLoadCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loadError, setLoadError] = useState('');

  const bookTypes = [
    { name: 'Strength', color: 'bg-red-500', icon: '💪' },
    { name: 'Allure', color: 'bg-purple-500', icon: '💫' },
    { name: 'Intellect', color: 'bg-blue-500', icon: '🧠' },
    { name: 'Spirit', color: 'bg-green-500', icon: '✨' },
    { name: 'Random', color: 'bg-gray-500', icon: '🎲' }
  ];

  const calculateAttributeBoosts = () => {
    const boosts = {
      Random: 0,
      Strength: 0,
      Allure: 0,
      Intellect: 0,
      Spirit: 0
    };

    // Calculate Strength boosts (only books)
    boosts.Strength += wardenAuras.rudra_books;
    boosts.Strength += wardenAuras.eddie_books;
    boosts.Strength += wardenAuras.cesare_books;
    boosts.Strength += wardenAuras.max_books;

    // Calculate Allure boosts (only books)
    boosts.Allure += wardenAuras.woden_books;
    boosts.Allure += wardenAuras.scarlet_books;
    boosts.Allure += wardenAuras.erzsebet_books;
    boosts.Allure += wardenAuras.ivan_books;
    boosts.Allure += wardenAuras.frederick_books;

    // Calculate Intellect boosts (only books)
    boosts.Intellect += wardenAuras.artemis_books;
    boosts.Intellect += wardenAuras.sam_books;
    boosts.Intellect += wardenAuras.cesare_books;
    boosts.Intellect += wardenAuras.erzsebet_books;

    // Calculate Spirit boosts (only books)
    boosts.Spirit += wardenAuras.finn_books;
    boosts.Spirit += wardenAuras.grendel_books;
    boosts.Spirit += wardenAuras.max_books;
    boosts.Spirit += wardenAuras.ivan_books;

    // Apply all-attribute bonuses to all attributes including Random (only books)
    const allBonus = wardenAuras.maria_books +
                     wardenAuras.dracula_books +
                     wardenAuras.nyx_books +
                     wardenAuras.poe_books +
                     wardenAuras.damian_books +
                     wardenAuras.vance_books +
                     wardenAuras.diana_books;

    Object.keys(boosts).forEach(attr => {
      boosts[attr] += allBonus;
    });

    return boosts;
  };

  const attributeBoosts = calculateAttributeBoosts();

  const updateBookCount = (attribute, bookKey, value) => {
    const numValue = parseInt(value) || 0;
    setBooksByAttribute(prev => ({
      ...prev,
      [attribute]: {
        ...prev[attribute],
        books: {
          ...prev[attribute].books,
          [bookKey]: {
            ...prev[attribute].books[bookKey],
            count: Math.max(0, numValue)
          }
        }
      }
    }));
  };

  const updateAura = (auraKey, value) => {
    const numValue = parseInt(value) || 0;
    setWardenAuras(prev => ({
      ...prev,
      [auraKey]: Math.max(0, numValue)
    }));
  };

  // Save/Load Functions
  const generateSaveCode = () => {
    const saveData = {
      v: 2, // version number for new structure
      b: booksByAttribute,
      w: wardenAuras
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
      if (saveData.v !== 2) {
        setLoadError('Invalid save code version');
        return;
      }

      // Load books
      if (saveData.b) {
        setBooksByAttribute(saveData.b);
      }

      // Load warden auras
      if (saveData.w) {
        setWardenAuras(saveData.w);
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

  // Calculate dominance whenever books or wardenAuras change
  useEffect(() => {
    let total = 0;
    
    Object.entries(booksByAttribute).forEach(([attribute, attributeData]) => {
      Object.entries(attributeData.books).forEach(([bookKey, book]) => {
        if (book.count > 0) {
          let multiplier = 1;
          
          // Apply attribute-specific bonuses (only books %)
          switch(attribute) {
            case 'Strength':
              multiplier *= (1 + wardenAuras.rudra_books / 100);
              multiplier *= (1 + wardenAuras.eddie_books / 100);
              multiplier *= (1 + wardenAuras.cesare_books / 100);
              multiplier *= (1 + wardenAuras.max_books / 100);
              break;
              
            case 'Allure':
              multiplier *= (1 + wardenAuras.woden_books / 100);
              multiplier *= (1 + wardenAuras.scarlet_books / 100);
              multiplier *= (1 + wardenAuras.erzsebet_books / 100);
              multiplier *= (1 + wardenAuras.ivan_books / 100);
              multiplier *= (1 + wardenAuras.frederick_books / 100);
              break;
              
            case 'Intellect':
              multiplier *= (1 + wardenAuras.artemis_books / 100);
              multiplier *= (1 + wardenAuras.sam_books / 100);
              multiplier *= (1 + wardenAuras.cesare_books / 100);
              multiplier *= (1 + wardenAuras.erzsebet_books / 100);
              break;
              
            case 'Spirit':
              multiplier *= (1 + wardenAuras.finn_books / 100);
              multiplier *= (1 + wardenAuras.grendel_books / 100);
              multiplier *= (1 + wardenAuras.max_books / 100);
              multiplier *= (1 + wardenAuras.ivan_books / 100);
              break;
              
            default:
              break;
          }
          
          // Apply all-attribute bonuses to all book types including Random (only books)
          multiplier *= (1 + wardenAuras.maria_books / 100);
          multiplier *= (1 + wardenAuras.dracula_books / 100);
          multiplier *= (1 + wardenAuras.nyx_books / 100);
          multiplier *= (1 + wardenAuras.poe_books / 100);
          multiplier *= (1 + wardenAuras.damian_books / 100);
          multiplier *= (1 + wardenAuras.vance_books / 100);
          multiplier *= (1 + wardenAuras.diana_books / 100);
          
          // Calculate base value (with warden multiplier if applicable)
          const baseValue = book.value * (book.wardenMultiplier || 1);
          total += book.count * baseValue * multiplier;
        }
      });
    });

    setTotalDominance(Math.round(total));
  }, [booksByAttribute, wardenAuras]);

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-red-200 mb-2 flex items-center justify-center gap-3">
              <Book className="text-red-400" />
              Dominance Calculator
            </h1>
            <p className="text-red-100 mb-2 text-sm sm:text-base">Estimate Game of Vampires dominance based on books, auras, and more.</p>
            <p className="text-red-200 text-xs sm:text-sm">Feedback? Discord @ <a href="https://discord.com/users/399252368190865411" className="text-red-400 hover:text-red-300 underline">entj.</a></p>
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

          <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-red-900/50 shadow-2xl mb-6 sm:mb-8">
            {/* Total Dominance */}
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-red-900/30 to-black/30 border border-red-700/50 rounded-xl p-4 sm:p-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-red-300 mb-2">Total Dominance</h2>
                <div className="text-4xl sm:text-6xl font-bold text-red-100 mb-4">
                  {totalDominance.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Total Attribute Boosts */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-red-100 mb-4 text-center">Total Attribute Boosts</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {bookTypes.filter(bookType => bookType.name !== 'Random').map((bookType) => (
                  <div key={bookType.name} className="bg-black/30 rounded-lg p-2 sm:p-3 border border-red-900/30">
                    <div className="flex flex-col items-center gap-1 sm:gap-2">
                      <div className="relative w-5 h-6 sm:w-6 sm:h-7">
                        <BookIcon type={bookType.name} />
                      </div>
                      <h3 className="text-red-100 font-medium text-xs sm:text-sm text-center">{bookType.name}</h3>
                      <div className="text-lg sm:text-2xl font-bold text-red-300">
                        +{attributeBoosts[bookType.name].toFixed(0)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Books Section - Organized by Attribute */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-red-100 mb-4 text-center">Books</h2>
            
            <div className="space-y-6">
              {Object.entries(booksByAttribute).map(([attribute, attributeData]) => (
                <div key={attribute} className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-red-900/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-8 h-10">
                      <BookIcon type={attribute} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-red-100">{attribute} Books</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {Object.entries(attributeData.books).map(([bookKey, book]) => (
                      <div key={bookKey} className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                        <div className="mb-2">
                          <h4 className="text-red-100 font-semibold text-sm">{book.name}</h4>
                          <p className="text-xs text-red-200">
                            {book.wardenMultiplier 
                              ? `${book.wardenMultiplier} wardens × ${book.value.toLocaleString()} each`
                              : `+${book.value.toLocaleString()} to 1 warden`}
                          </p>
                          <p className="text-xs text-red-300 font-semibold">
                            {(book.value * (book.wardenMultiplier || 1)).toLocaleString()} per book
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={book.count}
                            onChange={(e) => updateBookCount(attribute, bookKey, e.target.value)}
                            className="flex-1 bg-black/50 text-red-100 text-center text-sm font-bold px-2 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none"
                            placeholder="0"
                          />
                          <div className="text-xs text-gray-400 min-w-[60px] text-right">
                            = {(book.count * book.value * (book.wardenMultiplier || 1)).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warden Auras Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-red-100 mb-4 text-center">Warden Auras (% Boosts)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Wild Hunt */}
              <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-red-900/50">
                <h3 className="text-lg font-bold text-green-400 mb-3">Wild Hunt</h3>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Rudra</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Strength Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.rudra_talent} onChange={(e) => updateAura('rudra_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Strength Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.rudra_books} onChange={(e) => updateAura('rudra_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Woden</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Allure Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.woden_talent} onChange={(e) => updateAura('woden_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Allure Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.woden_books} onChange={(e) => updateAura('woden_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Artemis</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Intellect Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.artemis_talent} onChange={(e) => updateAura('artemis_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Intellect Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.artemis_books} onChange={(e) => updateAura('artemis_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Finn</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Spirit Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.finn_talent} onChange={(e) => updateAura('finn_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Spirit Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.finn_books} onChange={(e) => updateAura('finn_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monster Noir */}
              <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-red-900/50">
                <h3 className="text-lg font-bold text-red-400 mb-3">Monster Noir</h3>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Eddie</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Strength Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.eddie_talent} onChange={(e) => updateAura('eddie_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Strength Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.eddie_books} onChange={(e) => updateAura('eddie_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Scarlet</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Allure Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.scarlet_talent} onChange={(e) => updateAura('scarlet_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Allure Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.scarlet_books} onChange={(e) => updateAura('scarlet_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Sam</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Intellect Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.sam_talent} onChange={(e) => updateAura('sam_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Intellect Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.sam_books} onChange={(e) => updateAura('sam_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Grendel</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Spirit Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.grendel_talent} onChange={(e) => updateAura('grendel_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Spirit Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.grendel_books} onChange={(e) => updateAura('grendel_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloody Tyrants */}
              <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-red-900/50">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Bloody Tyrants</h3>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Cesare</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Str/Int Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.cesare_talent} onChange={(e) => updateAura('cesare_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Str/Int Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.cesare_books} onChange={(e) => updateAura('cesare_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Max</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Str/Spr Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.max_talent} onChange={(e) => updateAura('max_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Str/Spr Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.max_books} onChange={(e) => updateAura('max_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Erzsebet</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All/Int Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.erzsebet_talent} onChange={(e) => updateAura('erzsebet_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All/Int Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.erzsebet_books} onChange={(e) => updateAura('erzsebet_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Ivan</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All/Spr Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.ivan_talent} onChange={(e) => updateAura('ivan_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All/Spr Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.ivan_books} onChange={(e) => updateAura('ivan_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Maria</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.maria_talent} onChange={(e) => updateAura('maria_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.maria_books} onChange={(e) => updateAura('maria_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Misc & VIP Wardens */}
              <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-red-900/50">
                <h3 className="text-lg font-bold text-yellow-400 mb-3">Misc & VIP Wardens</h3>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Dracula</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.dracula_talent} onChange={(e) => updateAura('dracula_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.dracula_books} onChange={(e) => updateAura('dracula_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Nyx</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.nyx_talent} onChange={(e) => updateAura('nyx_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.nyx_books} onChange={(e) => updateAura('nyx_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Frederick</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Allure Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.frederick_talent} onChange={(e) => updateAura('frederick_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Allure Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.frederick_books} onChange={(e) => updateAura('frederick_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Victor</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Strength Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.victor_talent} onChange={(e) => updateAura('victor_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Tomas</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Str/Int Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.tomas_talent} onChange={(e) => updateAura('tomas_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Cleo</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All/Spr Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.cleo_talent} onChange={(e) => updateAura('cleo_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Aurelia</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">Str/Spr Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.aurelia_talent} onChange={(e) => updateAura('aurelia_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">William</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All/Int Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.william_talent} onChange={(e) => updateAura('william_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Poe</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.poe_talent} onChange={(e) => updateAura('poe_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.poe_books} onChange={(e) => updateAura('poe_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Damian</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.damian_talent} onChange={(e) => updateAura('damian_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.damian_books} onChange={(e) => updateAura('damian_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Vance</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.vance_talent} onChange={(e) => updateAura('vance_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.vance_books} onChange={(e) => updateAura('vance_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                    <h4 className="text-red-100 font-semibold mb-2">Diana</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Talent %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.diana_talent} onChange={(e) => updateAura('diana_talent', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-100 text-xs">All Books %:</span>
                        <input type="number" min="0" step="1" value={wardenAuras.diana_books} onChange={(e) => updateAura('diana_books', e.target.value)} className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DominanceCalculator;
