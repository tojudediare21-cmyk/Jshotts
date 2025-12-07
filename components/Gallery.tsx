import React, { useState } from 'react';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [showUpload, setShowUpload] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  
  // Initial Mock Data
  const [images, setImages] = useState<GalleryItem[]>([
    { id: '1', src: 'https://picsum.photos/800/600?random=10', category: 'Portraits', caption: 'Studio Session in Ikeja' },
    { id: '2', src: 'https://picsum.photos/800/800?random=11', category: 'Events', caption: 'Wedding at Lekki' },
    { id: '3', src: 'https://picsum.photos/600/800?random=12', category: 'Portraits', caption: 'Fashion Shoot' },
    { id: '4', src: 'https://picsum.photos/800/600?random=13', category: 'Nature', caption: 'Lagos Lagoon Sunset' },
    { id: '5', src: 'https://picsum.photos/800/800?random=14', category: 'Events', caption: 'Corporate Gala' },
    { id: '6', src: 'https://picsum.photos/600/800?random=15', category: 'Urban', caption: 'Victoria Island Skyline' },
  ]);

  const [newImage, setNewImage] = useState<{ file: File | null; caption: string; category: string }>({
    file: null,
    caption: '',
    category: 'Portraits'
  });

  const categories = ['All', 'Portraits', 'Events', 'Nature', 'Urban'];

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage({ ...newImage, file: e.target.files[0] });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setShowLogin(false);
      setShowUpload(true);
      setPassword('');
    } else {
      alert('Incorrect Access PIN');
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.file || !newImage.caption) return;

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      src: URL.createObjectURL(newImage.file),
      category: newImage.category,
      caption: newImage.caption
    };

    setImages([newItem, ...images]);
    setNewImage({ file: null, caption: '', category: 'Portraits' });
    setShowUpload(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Gallery</h1>
            <p className="text-zinc-400 text-lg">A curated collection of our finest moments in Lagos.</p>
          </div>
          
          <div className="flex items-center gap-3">
             {!isAuthenticated ? (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="px-6 py-3 bg-zinc-900 border border-zinc-700 hover:border-amber-500 text-zinc-300 hover:text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Team Access
                </button>
             ) : (
                <button 
                  onClick={() => setShowUpload(!showUpload)}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  {showUpload ? 'Close Upload' : 'Add Photo'}
                </button>
             )}
          </div>
        </div>

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-sm relative shadow-2xl">
              <button 
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Team Verification
              </h3>
              <form onSubmit={handleLogin}>
                <label className="block text-zinc-400 text-sm mb-2">Access PIN</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl focus:border-amber-500 outline-none mb-6"
                  placeholder="Enter PIN"
                  autoFocus
                />
                <button type="submit" className="w-full bg-white text-zinc-950 font-bold py-3 rounded-xl hover:bg-amber-500 transition-colors shadow-lg">
                  Access Dashboard
                </button>
                <p className="text-center text-zinc-600 text-xs mt-4">Hint: use 'admin'</p>
              </form>
            </div>
          </div>
        )}

        {/* Upload Form */}
        {isAuthenticated && showUpload && (
          <div className="mb-12 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-4">Upload to Gallery</h3>
            <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-zinc-400 text-sm mb-2">Select Image</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-amber-500 hover:file:bg-zinc-700 cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Caption</label>
                <input 
                  type="text" 
                  value={newImage.caption}
                  onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
                  placeholder="e.g. Wedding at Ikeja"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-2.5 rounded-lg focus:border-amber-500 outline-none"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                   <label className="block text-zinc-400 text-sm mb-2">Category</label>
                   <select 
                     value={newImage.category}
                     onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                     className="w-full bg-zinc-950 border border-zinc-800 text-white p-2.5 rounded-lg focus:border-amber-500 outline-none"
                   >
                     {categories.filter(c => c !== 'All').map(c => (
                       <option key={c} value={c}>{c}</option>
                     ))}
                   </select>
                </div>
                <button 
                  type="submit" 
                  disabled={!newImage.file || !newImage.caption}
                  className="mt-4 md:mt-0 w-full bg-white text-zinc-950 font-bold py-2.5 rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-white text-zinc-950 shadow-lg scale-105' 
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div key={img.id} className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
               <div className="aspect-[4/3] w-full overflow-hidden">
                 <img 
                   src={img.src} 
                   alt={img.caption} 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
               </div>
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                 <span className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
                 <p className="text-white font-medium">{img.caption}</p>
               </div>
            </div>
          ))}
          {filteredImages.length === 0 && (
             <div className="col-span-full text-center py-20 text-zinc-500">
               No images found in this category.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};