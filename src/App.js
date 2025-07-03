// App.js
import React, { useState } from 'react';
import DominanceCalculator from './DominanceCalculator';
import ConclaveCalculator from './ConclaveCalculator';

const App = () => {
  const [currentView, setCurrentView] = useState('dominance');

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black">
      {currentView === 'dominance' && (
        <DominanceCalculator onNavigate={handleNavigate} />
      )}
      {currentView === 'conclave' && (
        <ConclaveCalculator onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;
