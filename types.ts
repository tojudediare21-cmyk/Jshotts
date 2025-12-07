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

export interface InternalMessage {
  id: string;
  sender: string; // 'Director', 'Secretary', 'Mobile Handler'
  text: string;
  timestamp: string;
}

export enum ViewState {
  HOME = 'HOME',
  BOOKING = 'BOOKING',
  WORKPLACE = 'WORKPLACE',
  TEAM = 'TEAM',
  GALLERY = 'GALLERY',
  PRIVACY = 'PRIVACY',
  ADMIN = 'ADMIN'
}

export interface TeamMember {
  id: string;
  role: string;
  name: string;
  description: string;
  image: string;
  phoneNumber: string;
  contactContext: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  category: string;
  caption: string;
}

export interface CompanyInfo {
  phone: string;
  email: string;
  logoUrl?: string; // Optional custom logo image
}