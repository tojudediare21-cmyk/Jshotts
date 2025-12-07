import React from 'react';
import { ViewState } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  installPrompt: any;
  onInstall: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, installPrompt, onInstall }) => {
  const navItems = [
    { label: 'Home', view: ViewState.HOME },
    { label: 'Book', view: ViewState.BOOKING },
    { label: 'Gallery', view: ViewState.GALLERY },
    { label: 'Team', view: ViewState.TEAM },
    { label: 'Workplace', view: ViewState.WORKPLACE },
  ];

  const handleShareApp = async () => {
    const shareData = {
      title: 'J Shots Media',
      text: 'Book your premium photography session in Lagos with J Shots Media! Download the app or book online.',
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl transition-all duration-300">
      {/* Aesthetic Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate(ViewState.HOME)}
          >
            <div className="relative">
               <div className="absolute inset-0 bg-amber-500 blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
               <div className="relative bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-white group-hover:border-amber-500/50 transition-colors duration-300">
                 <Logo className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-amber-500 transition-colors" />
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">
                J SHOTS
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.2em] text-amber-500 uppercase font-medium">
                Media
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-full border border-white/5 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentView === item.view 
                    ? 'bg-zinc-800 text-white shadow-lg' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="flex items-center gap-3">
            {installPrompt ? (
               <button
                onClick={onInstall}
                className="hidden md:flex bg-gradient-to-r from-amber-600 to-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 hover:scale-105 transition-all items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Get App</span>
              </button>
            ) : (
              <button
                onClick={handleShareApp}
                className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-zinc-800/50"
                title="Share App"
              >
                <span className="text-xs font-medium">Share</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            )}

            {/* Mobile Menu Trigger (Stylized) */}
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-amber-500"
              onClick={() => onNavigate(ViewState.BOOKING)}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav Bar (Bottom) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl flex justify-between px-6 py-4 shadow-2xl z-50">
         {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                currentView === item.view ? 'text-amber-500' : 'text-zinc-500'
              }`}
            >
              <div className={`w-1 h-1 rounded-full mb-1 ${currentView === item.view ? 'bg-amber-500' : 'bg-transparent'}`}></div>
              <span className="text-[10px] uppercase tracking-wider font-bold">{item.label}</span>
            </button>
          ))}
      </div>
    </header>
  );
};