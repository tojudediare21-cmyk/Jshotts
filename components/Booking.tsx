import React, { useState } from 'react';
import { Booking } from '../types';
import { LAGOS_LOCATIONS, TIME_SLOTS } from '../constants';
import { Logo } from './Logo';

export const BookingSection: React.FC = () => {
  const [formData, setFormData] = useState<Booking>({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Photography',
    location: LAGOS_LOCATIONS[0],
    date: '',
    timeSlot: TIME_SLOTS[0],
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center bg-zinc-950">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Logo className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
          <p className="text-zinc-400 mb-6">
            Thanks, {formData.name}. We've received your request for a {formData.serviceType} session in {formData.location}. 
            Our Secretary will contact you shortly to finalize details.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
          >
            Book Another Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Session</h1>
          <p className="text-zinc-400 text-lg">Secure your spot with Lagos' finest media team.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-amber-500 font-semibold uppercase text-xs tracking-wider mb-2">Contact Details</h3>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Full Name</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Email</label>
                <input 
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Phone Number</label>
                <input 
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="+234..."
                />
              </div>
            </div>

            {/* Session Info */}
            <div className="space-y-4">
              <h3 className="text-amber-500 font-semibold uppercase text-xs tracking-wider mb-2">Session Details</h3>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Service Type</label>
                <select 
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="Photography">Photography</option>
                  <option value="Videography">Videography</option>
                  <option value="Both">Both (Photo & Video)</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Location (Lagos)</label>
                <select 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {LAGOS_LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-1">Date</label>
                  <input 
                    required
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    type="date" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-1">Time Slot</label>
                  <select 
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {TIME_SLOTS.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-zinc-400 text-sm mb-1">Additional Notes / Special Requests</label>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
              placeholder="Tell us about your vision..."
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all duration-200"
          >
            CONFIRM BOOKING REQUEST
          </button>
        </form>
      </div>
    </div>
  );
};