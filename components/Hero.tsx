import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
  installPrompt?: any;
  onInstall?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, installPrompt, onInstall }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Studio Background" 
          className="w-full h-full object-cover opacity-30 scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block animate-fade-in-up">
           <span className="px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/50 text-amber-500 text-sm font-semibold tracking-wider uppercase backdrop-blur-md mb-6 inline-block shadow-lg shadow-amber-900/20">
            Premier Lagos Studio
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter mb-8 leading-tight drop-shadow-2xl">
          It's all about <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
            Art.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          J Shots Media delivers world-class photography and videography across Lagos. 
          From Ikeja to Lekki, we don't just take photos; we craft legacies.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => onNavigate(ViewState.BOOKING)}
            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 rounded-full font-bold text-lg hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Book a Session
          </button>
          
          {installPrompt ? (
            <button 
              onClick={onInstall}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-700 text-amber-500 rounded-full font-bold text-lg hover:border-amber-500 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Get the App
            </button>
          ) : (
            <button 
              onClick={() => onNavigate(ViewState.WORKPLACE)}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-zinc-700 text-white rounded-full font-bold text-lg hover:border-white transition-all"
            >
              Visit Workplace
            </button>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-28 md:bottom-10 left-10 md:left-10 hidden md:block opacity-60 hover:opacity-100 transition-opacity cursor-default">
        <div className="flex -space-x-4">
          <img className="w-12 h-12 rounded-full border-2 border-zinc-950 grayscale hover:grayscale-0 transition-all" src="https://picsum.photos/100/100?random=1" alt="User" />
          <img className="w-12 h-12 rounded-full border-2 border-zinc-950 grayscale hover:grayscale-0 transition-all" src="https://picsum.photos/100/100?random=2" alt="User" />
          <img className="w-12 h-12 rounded-full border-2 border-zinc-950 grayscale hover:grayscale-0 transition-all" src="https://picsum.photos/100/100?random=3" alt="User" />
          <div className="w-12 h-12 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
            500+
          </div>
        </div>
        <p className="text-zinc-500 text-xs mt-2 ml-2">Happy Clients in Lagos</p>
      </div>
    </div>
  );
};