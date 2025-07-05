// App.js - Improved version with single sidebar
import React, { useState } from 'react';
import { Menu, X, Sword, Table, Flower, Gift } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import DominanceCalculator from './DominanceCalculator';
import ConclaveCalculator from './ConclaveCalculator';
import AttractionCalculator from './AttractionCalculator';
import IntimacyCalculator from './IntimacyCalculator';

const App = () => {
  const [currentView, setCurrentView] = useState('dominance');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black">
        {/* Sidebar - Removed bg-black/60 to let gradient show through */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 backdrop-blur-lg border-r border-red-900/50`}>
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
