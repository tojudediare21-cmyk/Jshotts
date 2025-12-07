import React, { useState } from 'react';
import { CompanyInfo, InternalMessage, TeamMember } from '../types';

interface AdminDashboardProps {
  teamMembers: TeamMember[];
  onUpdateMember: (id: string, updates: Partial<TeamMember>) => void;
  companyInfo: CompanyInfo;
  onUpdateCompanyInfo: (info: CompanyInfo) => void;
  internalMessages: InternalMessage[];
  onSendInternalMessage: (text: string, sender: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  teamMembers,
  onUpdateMember,
  companyInfo,
  onUpdateCompanyInfo,
  internalMessages,
  onSendInternalMessage
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [activeTab, setActiveTab] = useState<'team' | 'boardroom' | 'settings'>('team');
  const [chatInput, setChatInput] = useState('');
  const [chatSender, setChatSender] = useState('Director');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid PIN');
    }
  };

  // Handle Image Upload for Team Member
  const handleMemberImageUpload = (memberId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      onUpdateMember(memberId, { image: imageUrl });
    }
  };

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      onUpdateCompanyInfo({ ...companyInfo, logoUrl: imageUrl });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendInternalMessage(chatInput, chatSender);
    setChatInput('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-12 px-4 bg-zinc-950 flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-sm w-full shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Staff Access</h2>
            <p className="text-zinc-500 text-sm">Restricted Area for Director, Secretary & Mobile Handler</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Security PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none text-center tracking-widest text-xl"
                placeholder="••••"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Unlock Dashboard
            </button>
            <p className="text-center text-zinc-700 text-xs">Hint: admin</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
             <p className="text-zinc-500 text-sm mt-1">Private management area. Not visible to public.</p>
          </div>
          
          <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl">
            {(['team', 'boardroom', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeTab === tab ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab === 'boardroom' ? 'Private Boardroom' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* TEAM TAB */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-800 relative group">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleMemberImageUpload(member.id, e)} />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{member.name}</h3>
                    <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">{member.role}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">Display Name</label>
                    <input 
                      type="text" 
                      value={member.name} 
                      onChange={(e) => onUpdateMember(member.id, { name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={member.phoneNumber} 
                      onChange={(e) => onUpdateMember(member.id, { phoneNumber: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">Role Title</label>
                    <input 
                      type="text" 
                      value={member.role} 
                      onChange={(e) => onUpdateMember(member.id, { role: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOARDROOM (Private Chat) */}
        {activeTab === 'boardroom' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl h-[600px] flex flex-col">
            <div className="bg-zinc-800/50 p-4 border-b border-zinc-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-zinc-300 font-bold text-sm uppercase tracking-wider">Internal Team Only</span>
              </div>
              <select 
                value={chatSender}
                onChange={(e) => setChatSender(e.target.value)}
                className="bg-zinc-950 text-white text-sm border border-zinc-700 rounded-lg px-2 py-1 outline-none"
              >
                <option value="Director">ID: Director</option>
                <option value="Secretary">ID: Secretary</option>
                <option value="Mobile Handler">ID: Mobile Handler</option>
              </select>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-950/50">
              {internalMessages.length === 0 && (
                <div className="text-center text-zinc-600 mt-20">
                    <p>No messages yet.</p>
                    <p className="text-xs">Use this space to discuss improvements and private matters.</p>
                </div>
              )}
              {internalMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === chatSender ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-zinc-500 mb-1 px-1">{msg.sender} • {msg.timestamp}</span>
                  <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                    msg.sender === chatSender
                      ? 'bg-amber-700 text-white rounded-tr-none' 
                      : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-zinc-900 border-t border-zinc-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Message team as ${chatSender}...`}
                  className="flex-1 bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-8">
             <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">App Appearance</h3>
                
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-zinc-950 border border-zinc-700 rounded-xl flex items-center justify-center overflow-hidden">
                        {companyInfo.logoUrl ? (
                            <img src={companyInfo.logoUrl} className="w-full h-full object-cover" alt="App Logo" />
                        ) : (
                            <span className="text-zinc-600 text-xs">No Custom Logo</span>
                        )}
                    </div>
                    <div>
                        <p className="text-zinc-400 text-sm mb-3">Upload a new App Logo (Square Recommended)</p>
                        <label className="bg-white text-zinc-950 px-4 py-2 rounded-lg font-bold text-sm cursor-pointer hover:bg-amber-500 transition-colors">
                            Select Image
                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </label>
                    </div>
                </div>
             </div>

             <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Public Contact Info</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-zinc-400 text-sm block mb-1">Company Phone</label>
                        <input 
                          type="text" 
                          value={companyInfo.phone} 
                          onChange={(e) => onUpdateCompanyInfo({...companyInfo, phone: e.target.value})}
                          className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-zinc-400 text-sm block mb-1">Company Email</label>
                        <input 
                          type="text" 
                          value={companyInfo.email} 
                          onChange={(e) => onUpdateCompanyInfo({...companyInfo, email: e.target.value})}
                          className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none"
                        />
                    </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};