import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Review, TeamMember } from '../types';
import { getChatResponse } from '../services/gemini';
import { INITIAL_REVIEWS, TEAM_MEMBERS } from '../constants';

export const Workplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'reviews' | 'team'>('chat');
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! Welcome to the J Shots Media Workplace. I can help you with bookings, questions about our team (Toju, Smyleon, Taiwo), or service details. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ author: '', text: '', rating: 5 });

  // Team State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [newMember, setNewMember] = useState({ name: '', role: '', description: '', phoneNumber: '' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await getChatResponse(userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newReview.author || !newReview.text) return;
    
    const review: Review = {
        id: Date.now().toString(),
        author: newReview.author,
        rating: newReview.rating,
        text: newReview.text,
        date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ author: '', text: '', rating: 5 });
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;

    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      role: newMember.role,
      description: newMember.description || 'New team member',
      image: `https://picsum.photos/400/500?random=${Date.now()}`,
      phoneNumber: newMember.phoneNumber || '+234 000 000 0000',
      contactContext: `I would like to contact ${newMember.name}, the ${newMember.role}`
    };

    setTeamMembers(prev => [...prev, member]);
    setNewMember({ name: '', role: '', description: '', phoneNumber: '' });
  };

  const handleShareReview = async (review: Review) => {
    const shareText = `Check out this review for J Shots Media by ${review.author}: "${review.text}"`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'J Shots Media Review',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank', 'width=550,height=420');
    }
  };

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'J Shots Media App',
          text: 'Download the J Shots Media app for premium photography booking in Lagos!',
          url: window.location.origin,
        });
      } catch (err) {
        console.error('Error sharing app:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('App link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 bg-zinc-950 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Customer Workplace</h1>
            <p className="text-zinc-400">Connect, Review, and Meet the Team.</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-center">
             <button
              onClick={() => setShowInstallHelp(true)}
              className="text-zinc-400 hover:text-white text-xs underline px-2"
            >
              Problems Downloading?
            </button>
            <button
              onClick={handleShareApp}
              className="bg-zinc-800 hover:bg-zinc-700 text-amber-500 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold border border-zinc-700 transition-colors"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
               Share App
            </button>
            <div className="bg-zinc-900 p-1 rounded-xl overflow-x-auto flex">
                <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === 'chat' 
                    ? 'bg-zinc-800 text-white shadow-md' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                >
                Live Chat
                </button>
                <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === 'reviews' 
                    ? 'bg-zinc-800 text-white shadow-md' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                >
                Reviews
                </button>
                <button
                onClick={() => setActiveTab('team')}
                className={`px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === 'team' 
                    ? 'bg-zinc-800 text-white shadow-md' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                >
                Team Board
                </button>
            </div>
          </div>
        </div>

        {/* Install Help Modal */}
        {showInstallHelp && (
          <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full relative">
              <button 
                onClick={() => setShowInstallHelp(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <h3 className="text-xl font-bold text-white mb-4">How to Install App</h3>
              
              <div className="space-y-4 text-zinc-300 text-sm">
                <div>
                  <h4 className="font-bold text-amber-500 mb-1">On iPhone (Safari):</h4>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Tap the <span className="font-bold">Share</span> button at the bottom.</li>
                    <li>Scroll down and tap <span className="font-bold">Add to Home Screen</span>.</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-bold text-amber-500 mb-1">On Android (Chrome):</h4>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Tap the <span className="font-bold">three dots</span> menu (top right).</li>
                    <li>Tap <span className="font-bold">Install App</span> or <span className="font-bold">Add to Home Screen</span>.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl h-[600px] flex flex-col">
            <div className="bg-zinc-800/50 p-4 border-b border-zinc-700 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-zinc-300 font-medium text-sm">Online Assistant</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-amber-600 text-white rounded-br-none' 
                      : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-4 rounded-2xl rounded-bl-none border border-zinc-700">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-zinc-900 border-t border-zinc-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about booking or team info..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-white text-zinc-950 px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Review Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Leave a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={newReview.author}
                        onChange={e => setNewReview({...newReview, author: e.target.value})}
                        className="bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none"
                    />
                    <select
                        value={newReview.rating}
                        onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})}
                        className="bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none"
                    >
                        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                </div>
                <textarea 
                    placeholder="Share your experience..." 
                    value={newReview.text}
                    onChange={e => setNewReview({...newReview, text: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none h-24 resize-none"
                />
                <button type="submit" className="px-6 py-2 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors">
                    Post Review
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                        {review.author.charAt(0)}
                      </div>
                      <span className="font-semibold text-white">{review.author}</span>
                    </div>
                    <div className="flex text-amber-500 text-sm">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{review.text}</p>
                  
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-800/50 pt-3">
                    <div className="text-xs text-zinc-600">{review.date}</div>
                    <button 
                      onClick={() => handleShareReview(review)}
                      className="text-zinc-500 hover:text-amber-500 text-sm flex items-center gap-2 transition-colors group"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="group-hover:scale-110 transition-transform"
                      >
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Add Team Member</h3>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Member Name" 
                    value={newMember.name}
                    onChange={e => setNewMember({...newMember, name: e.target.value})}
                    className="bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Role (e.g., Editor)" 
                    value={newMember.role}
                    onChange={e => setNewMember({...newMember, role: e.target.value})}
                    className="bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={newMember.phoneNumber}
                    onChange={e => setNewMember({...newMember, phoneNumber: e.target.value})}
                    className="bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none md:col-span-2"
                  />
                </div>
                <textarea 
                  placeholder="Short description..." 
                  value={newMember.description}
                  onChange={e => setNewMember({...newMember, description: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none h-20 resize-none"
                />
                <button type="submit" className="px-6 py-2 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors">
                  Add Member
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map(member => (
                <div key={member.id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex gap-4 items-center">
                   <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <h4 className="text-white font-bold">{member.name}</h4>
                     <p className="text-amber-500 text-xs uppercase tracking-wider font-semibold">{member.role}</p>
                     <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{member.description}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};