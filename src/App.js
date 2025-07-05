// App.js - Improved version with single sidebar
import React, { useState } from 'react';
import { Menu, X, Sword, Table, Flower, Gift } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import DominanceCalculator from './DominanceCalculator';
import ConclaveCalculator from './ConclaveCalculator';
import AttractionCalculator from './AttractionCalculator';

const App = () => {
  const [currentView, setCurrentView] = useState('dominance');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black">
        {/* Sidebar - Now only in App.js */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-black/60 backdrop-blur-lg border-r border-red-900/50`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <div className={`${sidebarOpen ? 'block' : 'hidden'}`}>
                <h2 className="text-red-200 font-bold text-xl">govcalc.io</h2>
                <p className="text-red-200 text-xs mt-1">
                  Feedback? Discord @ <a href="https://discord.com/users/399252368190865411" className="text-red-400 hover:text-red-300 underline">entj.</a>
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            <nav className="space-y-2">
              <button 
                onClick={() => handleNavigate('dominance')} 
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-200 transition-colors text-left ${
                  currentView === 'dominance' ? 'bg-red-900/30 hover:bg-red-900/50' : 'hover:bg-red-900/30'
                }`}
              >
                <Sword size={20} />
                {sidebarOpen && <span>Dominance Calculator</span>}
              </button>
              <button 
                onClick={() => handleNavigate('conclave')} 
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-200 transition-colors text-left ${
                  currentView === 'conclave' ? 'bg-red-900/30 hover:bg-red-900/50' : 'hover:bg-red-900/30'
                }`}
              >
                <Table size={20} />
                {sidebarOpen && <span>Conclave Calculator</span>}
              </button>
              <button 
                onClick={() => handleNavigate('attraction')} 
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-200 transition-colors text-left ${
                  currentView === 'attraction' ? 'bg-red-900/30 hover:bg-red-900/50' : 'hover:bg-red-900/30'
                }`}
              >
                <Flower size={20} />
                {sidebarOpen && <span>Attraction Calculator</span>}
              </button>
              <button 
                onClick={() => handleNavigate('intimacy')} 
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-200 transition-colors text-left ${
                  currentView === 'intimacy' ? 'bg-red-900/30 hover:bg-red-900/50' : 'hover:bg-red-900/30'
                }`}
              >
                <Gift size={20} />
                {sidebarOpen && <span>Intimacy Calculator</span>}
              </button>
            </nav>

            {sidebarOpen && (
              <div className="mt-8 p-4 bg-black/30 rounded-lg">
                <p className="text-red-200 text-xs mb-2">
                  If you found this tool helpful, please consider donating to{' '}
                  <a href="http://charitywater.org/" className="text-red-400 hover:text-red-300 underline" target="_blank" rel="noopener noreferrer">
                    Charity: Water
                  </a>
                  . A $1 donation supplies one family with clean drinking water for 12.5 days.
                </p>
                <p className="text-red-200 text-xs mt-3 text-right">
                  With gratitude,<br />
                  [S-147] (YAY) Damon
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {currentView === 'dominance' && <DominanceCalculator />}
          {currentView === 'conclave' && <ConclaveCalculator />}
          {currentView === 'attraction' && <AttractionCalculator />}
        </div>
      </div>
      <Analytics />
    </>
  );
};

export default App;
