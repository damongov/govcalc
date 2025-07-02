import React, { useState } from 'react';
import { Book, Calculator } from 'lucide-react';

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
  const [sections, setSections] = useState({
    section5000: {
      title: "5,000 Section",
      value: 5000,
      books: { Random: 0, Strength: 0, Allure: 0, Intellect: 0, Spirit: 0 }
    },
    section1000: {
      title: "1,000 Section",
      value: 1000,
      books: { Random: 0, Strength: 0, Allure: 0, Intellect: 0, Spirit: 0 }
    },
    section400: {
      title: "400 Section",
      value: 400,
      books: { Random: 0, Strength: 0, Allure: 0, Intellect: 0, Spirit: 0 }
    },
    section100: {
      title: "100 Section",
      value: 100,
      books: { Random: 0, Strength: 0, Allure: 0, Intellect: 0, Spirit: 0 }
    }
  });

  const [wardenAuras, setWardenAuras] = useState({
    rudra_companions: 0,
    rudra_summon: 0,
    woden_companions: 0,
    woden_summon: 0,
    artemis_companions: 0,
    artemis_summon: 0,
    finn_companions: 0,
    finn_summon: 0,
    eddie_companions: 0,
    eddie_summon: 0,
    scarlet_companions: 0,
    scarlet_summon: 0,
    sam_companions: 0,
    sam_summon: 0,
    grendel_companions: 0,
    grendel_summon: 0,
    cesare_companions: 0,
    cesare_summon: 0,
    max_companions: 0,
    max_summon: 0,
    erzsebet_companions: 0,
    erzsebet_summon: 0,
    ivan_companions: 0,
    ivan_summon: 0,
    maria_companions: 0,
    maria_summon: 0,
    dracula_talent: 0,
    dracula_books: 0,
    nyx_talent: 0,
    nyx_books: 0,
    frederick_talent: 0,
    frederick_books: 0,
    victor: 0,
    tomas: 0,
    cleo: 0,
    aurelia: 0,
    william: 0,
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

  const bookTypes = [
    { name: 'Random', color: 'bg-gray-500', icon: '🎲' },
    { name: 'Strength', color: 'bg-red-500', icon: '💪' },
    { name: 'Allure', color: 'bg-purple-500', icon: '💫' },
    { name: 'Intellect', color: 'bg-blue-500', icon: '🧠' },
    { name: 'Spirit', color: 'bg-green-500', icon: '✨' }
  ];

  const updateBookCount = (sectionKey, bookType, value) => {
    const numValue = parseInt(value) || 0;
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        books: {
          ...prev[sectionKey].books,
          [bookType]: Math.max(0, numValue)
        }
      }
    }));
  };

  const updateAura = (auraKey, value) => {
    const numValue = parseFloat(value) || 0;
    setWardenAuras(prev => ({
      ...prev,
      [auraKey]: Math.max(0, numValue)
    }));
  };

  const calculateDominance = () => {
    let total = 0;
    
    Object.values(sections).forEach(section => {
      Object.entries(section.books).forEach(([bookType, count]) => {
        if (count > 0) {
          let multiplier = 1;
          
          // Apply attribute-specific bonuses
          switch(bookType) {
            case 'Strength':
              multiplier *= (1 + wardenAuras.rudra_companions / 100);
              multiplier *= (1 + wardenAuras.rudra_summon / 100);
              multiplier *= (1 + wardenAuras.eddie_companions / 100);
              multiplier *= (1 + wardenAuras.eddie_summon / 100);
              multiplier *= (1 + wardenAuras.cesare_companions / 100);
              multiplier *= (1 + wardenAuras.cesare_summon / 100);
              multiplier *= (1 + wardenAuras.max_companions / 100);
              multiplier *= (1 + wardenAuras.max_summon / 100);
              multiplier *= (1 + wardenAuras.victor / 100);
              multiplier *= (1 + wardenAuras.tomas / 100);
              multiplier *= (1 + wardenAuras.aurelia / 100);
              break;
              
            case 'Allure':
              multiplier *= (1 + wardenAuras.woden_companions / 100);
              multiplier *= (1 + wardenAuras.woden_summon / 100);
              multiplier *= (1 + wardenAuras.scarlet_companions / 100);
              multiplier *= (1 + wardenAuras.scarlet_summon / 100);
              multiplier *= (1 + wardenAuras.erzsebet_companions / 100);
              multiplier *= (1 + wardenAuras.erzsebet_summon / 100);
              multiplier *= (1 + wardenAuras.ivan_companions / 100);
              multiplier *= (1 + wardenAuras.ivan_summon / 100);
              multiplier *= (1 + wardenAuras.frederick_talent / 100);
              multiplier *= (1 + wardenAuras.frederick_books / 100);
              multiplier *= (1 + wardenAuras.cleo / 100);
              multiplier *= (1 + wardenAuras.william / 100);
              break;
              
            case 'Intellect':
              multiplier *= (1 + wardenAuras.artemis_companions / 100);
              multiplier *= (1 + wardenAuras.artemis_summon / 100);
              multiplier *= (1 + wardenAuras.sam_companions / 100);
              multiplier *= (1 + wardenAuras.sam_summon / 100);
              multiplier *= (1 + wardenAuras.cesare_companions / 100);
              multiplier *= (1 + wardenAuras.cesare_summon / 100);
              multiplier *= (1 + wardenAuras.erzsebet_companions / 100);
              multiplier *= (1 + wardenAuras.erzsebet_summon / 100);
              multiplier *= (1 + wardenAuras.tomas / 100);
              multiplier *= (1 + wardenAuras.william / 100);
              break;
              
            case 'Spirit':
              multiplier *= (1 + wardenAuras.finn_companions / 100);
              multiplier *= (1 + wardenAuras.finn_summon / 100);
              multiplier *= (1 + wardenAuras.grendel_companions / 100);
              multiplier *= (1 + wardenAuras.grendel_summon / 100);
              multiplier *= (1 + wardenAuras.max_companions / 100);
              multiplier *= (1 + wardenAuras.max_summon / 100);
              multiplier *= (1 + wardenAuras.ivan_companions / 100);
              multiplier *= (1 + wardenAuras.ivan_summon / 100);
              multiplier *= (1 + wardenAuras.cleo / 100);
              multiplier *= (1 + wardenAuras.aurelia / 100);
              break;
          }
          
          // Apply all-attribute bonuses to all book types including Random
          multiplier *= (1 + wardenAuras.maria_companions / 100);
          multiplier *= (1 + wardenAuras.maria_summon / 100);
          multiplier *= (1 + wardenAuras.dracula_talent / 100);
          multiplier *= (1 + wardenAuras.dracula_books / 100);
          multiplier *= (1 + wardenAuras.nyx_talent / 100);
          multiplier *= (1 + wardenAuras.nyx_books / 100);
          multiplier *= (1 + wardenAuras.poe_talent / 100);
          multiplier *= (1 + wardenAuras.poe_books / 100);
          multiplier *= (1 + wardenAuras.damian_talent / 100);
          multiplier *= (1 + wardenAuras.damian_books / 100);
          multiplier *= (1 + wardenAuras.vance_talent / 100);
          multiplier *= (1 + wardenAuras.vance_books / 100);
          multiplier *= (1 + wardenAuras.diana_talent / 100);
          multiplier *= (1 + wardenAuras.diana_books / 100);
          
          total += count * section.value * multiplier;
        }
      });
    });

    setTotalDominance(Math.round(total));
  };

  const resetAll = () => {
    setSections(prev => {
      const reset = { ...prev };
      Object.keys(reset).forEach(key => {
        reset[key].books = { Random: 0, Strength: 0, Allure: 0, Intellect: 0, Spirit: 0 };
      });
      return reset;
    });
    setWardenAuras(prev => {
      const reset = { ...prev };
      Object.keys(reset).forEach(key => {
        reset[key] = 0;
      });
      return reset;
    });
    setTotalDominance(0);
  };

  const getSectionTotal = (section) => {
    return Object.values(section.books).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Book className="text-purple-400" />
            GoV Dominance Calculator
          </h1>
          <p className="text-purple-200 mb-2">Estimates GoV dominance based on books, scripts, and more.</p>
          <p className="text-purple-300 text-sm">Questions? Email <a href="mailto:bxstion@gmail.com" className="text-blue-400 hover:text-blue-300 underline">bxstion@gmail.com</a></p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <button
              onClick={calculateDominance}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 font-semibold transition-all transform hover:scale-105"
            >
              <Calculator size={20} />
              Calculate Total Dominance
            </button>
            
            <button
              onClick={resetAll}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Reset All
            </button>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-xl p-6">
              <h2 className="text-3xl font-bold text-yellow-300 mb-2">Total Dominance</h2>
              <div className="text-6xl font-bold text-white mb-4">
                {totalDominance.toLocaleString()}
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {Object.entries(sections).map(([sectionKey, section]) => (
                  <div key={sectionKey} className="bg-white/10 rounded-lg p-3">
                    <div className="text-sm text-yellow-200">{section.title}</div>
                    <div className="text-lg font-bold text-white">
                      {(getSectionTotal(section) * section.value).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-300">{getSectionTotal(section)} books</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {Object.entries(sections).map(([sectionKey, section]) => (
            <div key={sectionKey} className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-2xl">
              <div className="text-center mb-3">
                <h2 className="text-sm font-bold text-white">{section.title}</h2>
                <div className="text-xs text-purple-200">Per book</div>
                <div className="text-sm font-bold text-purple-300">{section.value.toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {bookTypes.map((bookType) => (
                  <div key={bookType.name} className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <div className="flex flex-col items-center gap-1">
                      <div className="relative w-5 h-6">
                        <BookIcon type={bookType.name} />
                      </div>
                      <h3 className="text-white font-medium text-xs text-center">{bookType.name}</h3>
                      
                      <input
                        type="number"
                        min="0"
                        value={section.books[bookType.name]}
                        onChange={(e) => updateBookCount(sectionKey, bookType.name, e.target.value)}
                        className="w-full bg-white/10 text-white text-center text-sm font-bold px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400/50"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                <div className="text-center">
                  <div className="text-xs text-gray-300">
                    {getSectionTotal(section)} books
                  </div>
                  <div className="text-sm font-bold text-white">
                    {(getSectionTotal(section) * section.value).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Warden Auras Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Warden Auras (% Boosts)</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Wild Hunt */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <h3 className="text-lg font-bold text-green-300 mb-3">Wild Hunt</h3>
              <div className="space-y-3">
                {/* Rudra */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Rudra</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Strength Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.rudra_companions} onChange={(e) => updateAura('rudra_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Strength Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.rudra_summon} onChange={(e) => updateAura('rudra_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Woden */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Woden</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Allure Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.woden_companions} onChange={(e) => updateAura('woden_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Allure Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.woden_summon} onChange={(e) => updateAura('woden_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Artemis */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Artemis</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Intellect Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.artemis_companions} onChange={(e) => updateAura('artemis_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Intellect Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.artemis_summon} onChange={(e) => updateAura('artemis_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Finn */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Finn</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Spirit Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.finn_companions} onChange={(e) => updateAura('finn_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Spirit Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.finn_summon} onChange={(e) => updateAura('finn_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monster Noir */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <h3 className="text-lg font-bold text-red-300 mb-3">Monster Noir</h3>
              <div className="space-y-3">
                {/* Eddie */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Eddie</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Strength Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.eddie_companions} onChange={(e) => updateAura('eddie_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Strength Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.eddie_summon} onChange={(e) => updateAura('eddie_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Scarlet */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Scarlet</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Allure Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.scarlet_companions} onChange={(e) => updateAura('scarlet_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Allure Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.scarlet_summon} onChange={(e) => updateAura('scarlet_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Sam */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Sam</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Intellect Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.sam_companions} onChange={(e) => updateAura('sam_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Intellect Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.sam_summon} onChange={(e) => updateAura('sam_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Grendel */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Grendel</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Spirit Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.grendel_companions} onChange={(e) => updateAura('grendel_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Spirit Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.grendel_summon} onChange={(e) => updateAura('grendel_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloody Tyrants */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <h3 className="text-lg font-bold text-purple-300 mb-3">Bloody Tyrants</h3>
              <div className="space-y-3">
                {/* Cesare */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Cesare</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Str/Int Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.cesare_companions} onChange={(e) => updateAura('cesare_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Str/Int Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.cesare_summon} onChange={(e) => updateAura('cesare_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Max */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Max</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Str/Spr Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.max_companions} onChange={(e) => updateAura('max_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Str/Spr Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.max_summon} onChange={(e) => updateAura('max_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Erzsebet */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Erzsebet</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All/Int Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.erzsebet_companions} onChange={(e) => updateAura('erzsebet_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All/Int Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.erzsebet_summon} onChange={(e) => updateAura('erzsebet_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Ivan */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Ivan</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All/Spr Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.ivan_companions} onChange={(e) => updateAura('ivan_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All/Spr Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.ivan_summon} onChange={(e) => updateAura('ivan_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Maria */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Maria</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.maria_companions} onChange={(e) => updateAura('maria_companions', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.maria_summon} onChange={(e) => updateAura('maria_summon', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Misc & VIP Wardens */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">Misc & VIP Wardens</h3>
              <div className="space-y-3">
                {/* Dracula */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Dracula</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.dracula_talent} onChange={(e) => updateAura('dracula_talent', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.dracula_books} onChange={(e) => updateAura('dracula_books', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Nyx */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Nyx</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.nyx_talent} onChange={(e) => updateAura('nyx_talent', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">All Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.nyx_books} onChange={(e) => updateAura('nyx_books', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Frederick */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Frederick</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Allure Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.frederick_talent} onChange={(e) => updateAura('frederick_talent', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Allure Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.frederick_books} onChange={(e) => updateAura('frederick_books', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Victor */}
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2">Victor</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">Strength Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.victor} onChange={(e) => updateAura('victor', e.target.value)} className="w-14 bg-white/10 text-white text-center text-xs px-1 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Remaining VIP Wardens in compact format */}
                <div className="bg-white/5 rounded-lg p-2">
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white">Poe All Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.poe_talent} onChange={(e) => updateAura('poe_talent', e.target.value)} className="w-12 bg-white/10 text-white text-center px-1 py-0.5 rounded border border-white/20" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Poe All Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.poe_books} onChange={(e) => updateAura('poe_books', e.target.value)} className="w-12 bg-white/10 text-white text-center px-1 py-0.5 rounded border border-white/20" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Damian All Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.damian_talent} onChange={(e) => updateAura('damian_talent', e.target.value)} className="w-12 bg-white/10 text-white text-center px-1 py-0.5 rounded border border-white/20" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Damian All Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.damian_books} onChange={(e) => updateAura('damian_books', e.target.value)} className="w-12 bg-white/10 text-white text-center px-1 py-0.5 rounded border border-white/20" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Vance All Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.vance_talent} onChange={(e) => updateAura('vance_talent', e.target.value)} className="w-12 bg-white/10 text-white text-center px-1 py-0.5 rounded border border-white/20" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Vance All Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.vance_books} onChange={(e) => updateAura('vance_books', e.target.value)} className="w-12 bg-white/10 text-white text-center px-1 py-0.5 rounded border border-white/20" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Diana All Talent %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.diana_talent} onChange={(e) => updateAura('diana_talent', e.target.value)} className="w-12 bg-white/10 text-white text-center px-1 py-0.5 rounded border border-white/20" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Diana All Books %:</span>
                      <input type="number" min="0" step="0.1" value={wardenAuras.diana_books} onChange={(e) => updateAura('diana_books', e.target.value)} className="w-12 bg-white/10 text-white text-center px-1 py-0.5 rounded border border-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                  <span className="text-white text-sm">Rudra Strength (Companions):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.rudra_companions} onChange={(e) => updateAura('rudra_companions', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Rudra Strength (Summon):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.rudra_summon} onChange={(e) => updateAura('rudra_summon', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Woden Allure (Companions):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.woden_companions} onChange={(e) => updateAura('woden_companions', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Woden Allure (Summon):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.woden_summon} onChange={(e) => updateAura('woden_summon', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Artemis Intellect (Companions):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.artemis_companions} onChange={(e) => updateAura('artemis_companions', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Artemis Intellect (Summon):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.artemis_summon} onChange={(e) => updateAura('artemis_summon', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Finn Spirit (Companions):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.finn_companions} onChange={(e) => updateAura('finn_companions', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Finn Spirit (Summon):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.finn_summon} onChange={(e) => updateAura('finn_summon', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monster Noir */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <h3 className="text-lg font-bold text-red-300 mb-3">Monster Noir</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Eddie Strength Books (Companions):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.eddie_companions} onChange={(e) => updateAura('eddie_companions', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Eddie Strength Books (Summon):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.eddie_summon} onChange={(e) => updateAura('eddie_summon', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Scarlet Allure Books (Companions):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.scarlet_companions} onChange={(e) => updateAura('scarlet_companions', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Scarlet Allure Books (Summon):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.scarlet_summon} onChange={(e) => updateAura('scarlet_summon', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Sam Intellect Books (Companions):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.sam_companions} onChange={(e) => updateAura('sam_companions', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Sam Intellect Books (Summon):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.sam_summon} onChange={(e) => updateAura('sam_summon', e.target.value)} className="w-16 bg-white/10 text-white text-center text-sm px-2 py-1 rounded border border-white/20 focus:border-purple-400 focus:outline-none" placeholder="0" />
                    <span className="text-purple-200 text-sm">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Grendel Spirit Books (Companions):</span>
                  <div className="flex items-center gap-1">
                    <input type="number" min="0" step="0.1" value={wardenAuras.grendel_companions} onChange={(e) => updateAura('grendel_companions', e.target.value)} className="w-16 bg-white/10 text-