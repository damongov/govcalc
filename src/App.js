// App.js - Fixed with proper height handling
import React, { useState } from 'react';
import { Menu, X, Sword, Armchair, Flower, Gift } from 'lucide-react';
import DominanceCalculator from './DominanceCalculator';
import ConclaveCalculator from './ConclaveCalculator';
import AttractionCalculator from './AttractionCalculator';
import IntimacyCalculator from './IntimacyCalculator'; // ADD THIS LINE

const App = () => {
  const [currentView, setCurrentView] = useState('dominance');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black">
      {/* Sidebar - stays the same */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-black/60 backdrop-blur-lg border-r border-red-900/50 sticky top-0 h-screen`}>
        {/* ... sidebar content stays the same ... */}
      </div>

      {/* Main Content - ADD THE INTIMACY CASE */}
      <div className="flex-1 min-h-screen">
        {currentView === 'dominance' && <DominanceCalculator />}
        {currentView === 'conclave' && <ConclaveCalculator />}
        {currentView === 'attraction' && <AttractionCalculator />}
        {currentView === 'intimacy' && <IntimacyCalculator />} {/* ADD THIS LINE */}
      </div>
    </div>
  );
};

export default App;
