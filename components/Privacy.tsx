import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-12 px-4 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy & Regulations</h1>
        
        <div className="space-y-8 text-zinc-300">
          <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-500">1.</span> Data Collection
            </h2>
            <p className="leading-relaxed mb-4">
              At J Shots Media, we collect minimal personal information necessary to provide our photography and videography services. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-400">
              <li>Full Name (for booking identification)</li>
              <li>Contact Details (Phone Number and Email)</li>
              <li>Session Location and Address</li>
              <li>Specific preferences or notes regarding your shoot</li>
            </ul>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-500">2.</span> Image Usage Rights
            </h2>
            <p className="leading-relaxed text-zinc-400">
              By booking a session with J Shots Media, you acknowledge that J Shots Media retains the copyright to all images created. 
              We reserve the right to use selected images for our portfolio, social media, and marketing purposes unless a 
              Non-Disclosure Agreement (NDA) or privacy buy-out is explicitly agreed upon prior to the shoot.
            </p>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-500">3.</span> Booking & Cancellation
            </h2>
            <p className="leading-relaxed text-zinc-400 mb-4">
              <strong>Deposits:</strong> A non-refundable commitment fee is required to secure any date.
            </p>
            <p className="leading-relaxed text-zinc-400">
              <strong>Rescheduling:</strong> Clients may reschedule their session up to 48 hours before the appointed time without penalty. 
              Cancellations made less than 24 hours prior may result in forfeiture of the deposit.
            </p>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-500">4.</span> NDPR Compliance
            </h2>
            <p className="leading-relaxed text-zinc-400">
              We are committed to complying with the Nigeria Data Protection Regulation (NDPR). Your data is stored securely and is never sold to third parties. 
              You have the right to request the deletion of your personal contact data from our records at any time by contacting our Secretary via the Workplace section.
            </p>
          </section>

          <div className="text-center pt-8">
            <p className="text-zinc-500 text-sm">Last updated: October 2023</p>
            <p className="text-zinc-600 text-xs mt-2">J Shots Media • Lagos, Nigeria</p>
          </div>
        </div>
      </div>
    </div>
  );
};