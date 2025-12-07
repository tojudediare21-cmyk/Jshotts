export interface Booking {
  name: string;
  email: string;
  phone: string;
  serviceType: 'Photography' | 'Videography' | 'Both';
  location: string;
  date: string;
  timeSlot: string;
  notes: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  HOME = 'HOME',
  BOOKING = 'BOOKING',
  WORKPLACE = 'WORKPLACE',
  TEAM = 'TEAM',
  GALLERY = 'GALLERY',
  PRIVACY = 'PRIVACY'
}

export interface TeamMember {
  id: string;
  role: string;
  name: string;
  description: string;
  image: string;
  contactContext: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  category: string;
  caption: string;
}