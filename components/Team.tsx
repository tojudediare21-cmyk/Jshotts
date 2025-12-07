import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import { ViewState } from '../types';

interface TeamProps {
    onTalkTo: (context: string) => void;
}

export const Team: React.FC<TeamProps> = ({ onTalkTo }) => {
  return (
    <div className="min-h-screen pt-28 pb-12 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet The Team</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Direct access to the creative minds behind J Shots Media. Select a team member to connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-xl">
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                   <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                    {member.role}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-zinc-400 text-sm mb-6 min-h-[60px]">
                  {member.description}
                </p>
                <button 
                  onClick={() => onTalkTo(member.contactContext)}
                  className="w-full py-3 border border-zinc-700 text-white rounded-xl hover:bg-white hover:text-black hover:border-white transition-all font-medium flex items-center justify-center gap-2 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-black"
                >
                  <span>Connect with {member.role}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};