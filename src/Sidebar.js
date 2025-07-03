// Sidebar.js
import React, { useState } from 'react';
import { Book, Trophy, Menu, X } from 'lucide-react';

const Sidebar = ({ activeCalculator, setActiveCalculator }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dominance', name: 'Dominance (Books)', icon: Book },
    { id: 'conclave', name: 'Conclave Points', icon: Trophy },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black/70 backdrop-blur rounded-lg border border-red-900/50"
      >
        {isOpen ? <X className="text-red-200" /> : <Menu className="text-red-200" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-black/60 backdrop-blur-lg
        transform transition-transform duration-300 z-40
        border-r border-red-900/30
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-200 mb-2">GoV Tools</h2>
          <p className="text-xs text-red-300 mb-8">Calculators & Optimizers</p>
          
          <nav className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCalculator(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${activeCalculator === item.id 
                    ? 'bg-red-900/50 text-red-100 shadow-lg' 
                    : 'hover:bg-red-900/30 text-red-200'
                  }
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs text-red-300">
              Discord: <a href="https://discord.com/users/399252368190865411" 
                className="text-red-400 hover:text-red-300 underline">entj.</a>
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
