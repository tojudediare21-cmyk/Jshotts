import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingSection } from './components/Booking';
import { Workplace } from './components/Workplace';
import { Team } from './components/Team';
import { Gallery } from './components/Gallery';
import { Privacy } from './components/Privacy';
import { ViewState } from './types';
import { getChatResponse } from './services/gemini';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setInstallPrompt(null);
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  const handleTalkToTeam = (context: string) => {
    setCurrentView(ViewState.WORKPLACE);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <Hero 
            onNavigate={setCurrentView} 
            installPrompt={installPrompt} 
            onInstall={handleInstallClick} 
          />
        );
      case ViewState.BOOKING:
        return <BookingSection />;
      case ViewState.WORKPLACE:
        return <Workplace />;
      case ViewState.TEAM:
        return <Team onTalkTo={handleTalkToTeam} />;
      case ViewState.GALLERY:
        return <Gallery />;
      case ViewState.PRIVACY:
        return <Privacy />;
      default:
        return (
          <Hero 
            onNavigate={setCurrentView} 
            installPrompt={installPrompt} 
            onInstall={handleInstallClick} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/30 flex flex-col">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        installPrompt={installPrompt}
        onInstall={handleInstallClick}
      />
      <main className="fade-in flex-grow">
        {renderView()}
      </main>
      
      {/* Footer */}
      {currentView !== ViewState.HOME && (
        <footer className="py-8 border-t border-zinc-800 text-center text-zinc-500 text-sm bg-zinc-950 mt-auto">
          <div className="flex justify-center gap-6 mb-4">
            <button onClick={() => setCurrentView(ViewState.HOME)} className="hover:text-amber-500 transition-colors">Home</button>
            <button onClick={() => setCurrentView(ViewState.BOOKING)} className="hover:text-amber-500 transition-colors">Book</button>
            <button onClick={() => setCurrentView(ViewState.PRIVACY)} className="hover:text-amber-500 transition-colors">Privacy & Regulations</button>
          </div>
          <p>&copy; {new Date().getFullYear()} J Shots Media. Lagos, Nigeria.</p>
        </footer>
      )}
    </div>
  );
};

export default App;