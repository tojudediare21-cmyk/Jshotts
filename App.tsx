import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingSection } from './components/Booking';
import { Workplace } from './components/Workplace';
import { Team } from './components/Team';
import { Gallery } from './components/Gallery';
import { Privacy } from './components/Privacy';
import { AdminDashboard } from './components/AdminDashboard';
import { ViewState, TeamMember, CompanyInfo, InternalMessage } from './types';
import { TEAM_MEMBERS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  // Global State for App Data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    phone: '+234 800 JSHOTS',
    email: 'hello@jshots.com'
  });
  const [internalMessages, setInternalMessages] = useState<InternalMessage[]>([]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        setInstallPrompt(null);
      }
    });
  };

  const handleTalkToTeam = (context: string) => {
    setCurrentView(ViewState.WORKPLACE);
  };

  // Admin Actions
  const handleUpdateMember = (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
  };

  const handleSendInternalMessage = (text: string, sender: string) => {
    const newMessage: InternalMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setInternalMessages(prev => [...prev, newMessage]);
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
        return <Team onTalkTo={handleTalkToTeam} teamMembers={teamMembers} />;
      case ViewState.GALLERY:
        return <Gallery />;
      case ViewState.PRIVACY:
        return <Privacy />;
      case ViewState.ADMIN:
        return (
          <AdminDashboard 
            teamMembers={teamMembers}
            onUpdateMember={handleUpdateMember}
            companyInfo={companyInfo}
            onUpdateCompanyInfo={setCompanyInfo}
            internalMessages={internalMessages}
            onSendInternalMessage={handleSendInternalMessage}
          />
        );
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
        companyLogo={companyInfo.logoUrl}
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
            <button onClick={() => setCurrentView(ViewState.ADMIN)} className="hover:text-white text-zinc-700 transition-colors">Staff Login</button>
          </div>
          <p className="mb-2">Contact: {companyInfo.phone} • {companyInfo.email}</p>
          <p>&copy; {new Date().getFullYear()} J Shots Media. Lagos, Nigeria.</p>
        </footer>
      )}
    </div>
  );
};

export default App;