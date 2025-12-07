import { TeamMember, Review } from './types';

export const LAGOS_LOCATIONS = [
  "Ikeja",
  "Lekki Phase 1",
  "Victoria Island",
  "Ikoyi",
  "Yaba",
  "Surulere",
  "Ajah",
  "Magodo",
  "Maryland",
  "Festac"
];

export const TIME_SLOTS = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM"
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'director',
    role: 'Director',
    name: 'Toju Dediare',
    description: 'Visionary leader overseeing all major creative direction and premium client relations.',
    image: 'https://picsum.photos/400/500?grayscale',
    contactContext: "I would like to speak with the Director, Toju Dediare, regarding a high-profile project."
  },
  {
    id: 'photographer',
    role: 'Photographer',
    name: 'Smyleon',
    description: 'Expert in high-end photography, portraits, and capturing the perfect moment.',
    image: 'https://picsum.photos/401/500?grayscale',
    contactContext: "I have a query for Smyleon, the photographer."
  },
  {
    id: 'secretary',
    role: 'Secretary',
    name: 'Taiwo',
    description: 'Managing schedules, bookings, and general inquiries to ensure smooth operations.',
    image: 'https://picsum.photos/402/500?grayscale',
    contactContext: "I need assistance from the Secretary, Taiwo, regarding my appointment."
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Emeka P.',
    rating: 5,
    text: 'J Shots Media is the best in Lagos! The director really understood my vision.',
    date: '2023-10-15'
  },
  {
    id: '2',
    author: 'Sarah K.',
    rating: 5,
    text: 'Loved the session with Smyleon. The photos came out crisp!',
    date: '2023-11-02'
  },
  {
    id: '3',
    author: 'Tunde B.',
    rating: 4,
    text: 'Great service, though traffic in Lekki almost made me late. The team waited patiently.',
    date: '2023-12-10'
  }
];