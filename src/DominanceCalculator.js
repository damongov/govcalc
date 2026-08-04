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

// ---------------------------------------------------------------------------
// Warden layout. Each column is a group, each warden lists only the fields it
// actually has. Add/remove a field here and state, save/load and the UI all
// follow automatically.
// ---------------------------------------------------------------------------
const WARDEN_GROUPS = [
  {
    title: 'Wild Hunt',
    color: 'text-green-400',
    wardens: [
      { name: 'Rudra',   fields: [{ key: 'rudra_talent',   label: 'Strength Talent %:' }] },
      { name: 'Woden',   fields: [{ key: 'woden_talent',   label: 'Allure Talent %:' }] },
      { name: 'Artemis', fields: [{ key: 'artemis_talent', label: 'Intellect Talent %:' }] },
      { name: 'Finn',    fields: [{ key: 'finn_talent',    label: 'Spirit Talent %:' }] }
    ]
  },
  {
    title: 'Monster Noir',
    color: 'text-red-400',
    wardens: [
      { name: 'Eddie',   fields: [{ key: 'eddie_books',   label: 'Strength Books %:' }] },
      { name: 'Scarlet', fields: [{ key: 'scarlet_books', label: 'Allure Books %:' }] },
      { name: 'Sam',     fields: [{ key: 'sam_books',     label: 'Intellect Books %:' }] },
      { name: 'Grendel', fields: [{ key: 'grendel_books', label: 'Spirit Books %:' }] }
    ]
  },
  {
    title: 'Bloody Tyrants',
    color: 'text-purple-400',
    wardens: [
      { name: 'Cesare',   fields: [{ key: 'cesare_talent',   label: 'Str/Int Talent %:' }] },
      { name: 'Max',      fields: [{ key: 'max_talent',      label: 'Str/Spr Talent %:' }] },
      { name: 'Erzsebet', fields: [{ key: 'erzsebet_talent', label: 'All/Int Talent %:' }] },
      { name: 'Ivan',     fields: [{ key: 'ivan_talent',     label: 'All/Spr Talent %:' }] },
      { name: 'Maria',    fields: [{ key: 'maria_talent',    label: 'All Talent %:' }] }
    ]
  },
  {
    title: 'Additional Wardens',
    color: 'text-blue-400',
    wardens: [
      { name: 'Diavolo',   fields: [{ key: 'diavolo_books',   label: 'Books %:' }] },
      { name: 'Thorgrim',  fields: [{ key: 'thorgrim_books',  label: 'Books %:' }] },
      { name: 'Dominique', fields: [{ key: 'dominique_books', label: 'Books %:' }] },
      { name: 'Jester',    fields: [{ key: 'jester_books',    label: 'Books %:' }] },
      { name: 'Nala',      fields: [{ key: 'nala_books',      label: 'Books %:' }] }
    ]
  },
  {
    title: 'Misc & VIP Wardens',
    color: 'text-yellow-400',
    wardens: [
      { name: 'Dracula',   fields: [{ key: 'dracula_talent',   label: 'All Talent %:' },
                                    { key: 'dracula_books',    label: 'All Books %:' }] },
      { name: 'Nyx',       fields: [{ key: 'nyx_talent',       label: 'All Talent %:' },
                                    { key: 'nyx_books',        label: 'All Books %:' }] },
      { name: 'Frederick', fields: [{ key: 'frederick_talent', label: 'Allure Talent %:' },
                                    { key: 'frederick_books',  label: 'Allure Books %:' }] },
      { name: 'Victor',    fields: [{ key: 'victor_talent',    label: 'Strength Talent %:' }] },
      { name: 'Tomas',     fields: [{ key: 'tomas_talent',     label: 'Str/Int Talent %:' }] },
      { name: 'Cleo',      fields: [{ key: 'cleo_talent',      label: 'All/Spr Talent %:' }] },
      { name: 'Aurelia',   fields: [{ key: 'aurelia_talent',   label: 'Str/Spr Talent %:' }] },
      { name: 'William',   fields: [{ key: 'william_talent',   label: 'All/Int Talent %:' }] },
      { name: 'Poe',       fields: [{ key: 'poe_talent',       label: 'All Talent %:' },
                                    { key: 'poe_books',        label: 'All Books %:' }] },
      { name: 'Damian',    fields: [{ key: 'damian_talent',    label: 'All Talent %:' },
                                    { key: 'damian_books',     label: 'All Books %:' }] },
      { name: 'Vance',     fields: [{ key: 'vance_talent',     label: 'All Talent %:' },
                                    { key: 'vance_books',      label: 'All Books %:' }] },
      { name: 'Diana',     fields: [{ key: 'diana_talent',     label: 'All Talent %:' },
                                    { key: 'diana_books',      label: 'All Books %:' }] }
    ]
  }
];

const DEFAULT_WARDEN_AURAS = Object.fromEntries(
  WARDEN_GROUPS.flatMap(group =>
    group.wardens.flatMap(warden => warden.fields.map(field => [field.key, 0]))
  )
);

// Which book % auras feed which attribute.
const ATTRIBUTE_BOOK_AURAS = {
  Strength:  ['eddie_books'],
  Allure:    ['scarlet_books', 'frederick_books'],
  Intellect: ['sam_books'],
  Spirit:    ['grendel_books']
};

// Book % auras that apply to every attribute, Random included.
const ALL_ATTRIBUTE_BOOK_AURAS = [
  'dracula_books',
  'nyx_books',
  'poe_books',
  'damian_books',
  'vance_books',
  'diana_books',
  // Additional Wardens — move a key into ATTRIBUTE_BOOK_AURAS above if one of
  // these only boosts a single attribute.
  'diavolo_books',
  'thorgrim_books',
  'dominique_books',
  'jester_books',
  'nala_books'
];

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

  const [wardenAuras, setWardenAuras] = useState({ ...DEFAULT_WARDEN_AURAS });

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

  const sumAuras = (keys) =>
    keys.reduce((sum, key) => sum + (wardenAuras[key] || 0), 0);

  const calculateAttributeBoosts = () => {
    const allBonus = sumAuras(ALL_ATTRIBUTE_BOOK_AURAS);

    return {
      Random:    allBonus,
      Strength:  sumAuras(ATTRIBUTE_BOOK_AURAS.Strength) + allBonus,
      Allure:    sumAuras(ATTRIBUTE_BOOK_AURAS.Allure) + allBonus,
      Intellect: sumAuras(ATTRIBUTE_BOOK_AURAS.Intellect) + allBonus,
      Spirit:    sumAuras(ATTRIBUTE_BOOK_AURAS.Spirit) + allBonus
    };
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
      v: 3, // version number for the current warden layout
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
      
      // Version 2 codes still load — retired fields are dropped and any new
      // warden starts at 0.
      if (saveData.v !== 2 && saveData.v !== 3) {
        setLoadError('Invalid save code version');
        return;
      }

      // Load books
      if (saveData.b) {
        setBooksByAttribute(saveData.b);
      }

      // Load warden auras, keeping only fields that still exist
      if (saveData.w) {
        const merged = { ...DEFAULT_WARDEN_AURAS };
        Object.keys(merged).forEach(key => {
          if (typeof saveData.w[key] === 'number') {
            merged[key] = saveData.w[key];
          }
        });
        setWardenAuras(merged);
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

    const allMultiplier = ALL_ATTRIBUTE_BOOK_AURAS.reduce(
      (product, key) => product * (1 + (wardenAuras[key] || 0) / 100),
      1
    );

    Object.entries(booksByAttribute).forEach(([attribute, attributeData]) => {
      const attributeKeys = ATTRIBUTE_BOOK_AURAS[attribute] || [];
      const attributeMultiplier = attributeKeys.reduce(
        (product, key) => product * (1 + (wardenAuras[key] || 0) / 100),
        1
      );
      const multiplier = attributeMultiplier * allMultiplier;

      Object.values(attributeData.books).forEach((book) => {
        if (book.count > 0) {
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
              {WARDEN_GROUPS.map((group) => (
                <div key={group.title} className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-red-900/50">
                  <h3 className={`text-lg font-bold ${group.color} mb-3`}>{group.title}</h3>
                  <div className="space-y-3">
                    {group.wardens.map((warden) => (
                      <div key={warden.name} className="bg-black/30 rounded-lg p-3 border border-red-900/30">
                        <h4 className="text-red-100 font-semibold mb-2">{warden.name}</h4>
                        <div className="space-y-2">
                          {warden.fields.map((field) => (
                            <div key={field.key} className="flex items-center justify-between">
                              <span className="text-red-100 text-xs">{field.label}</span>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                value={wardenAuras[field.key]}
                                onChange={(e) => updateAura(field.key, e.target.value)}
                                className="w-14 bg-black/50 text-red-100 text-center text-xs px-1 py-1 rounded border border-red-800/50 focus:border-red-600 focus:outline-none"
                                placeholder="0"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DominanceCalculator;
