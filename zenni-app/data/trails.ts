export type Difficulty = 'easy' | 'moderate' | 'hard';
export type TrailType = 'trail run' | 'hike' | 'walk';

export type Trail = {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  elevationM: number;
  difficulty: Difficulty;
  type: TrailType;
  rating: number;
  reviewCount: number;
  estMinutes: number;
  description: string;
  routePath: string;
  tags: string[];
};

export const TRAILS: Trail[] = [
  {
    id: 'ridgeline-loop',
    name: 'Ridgeline Loop',
    location: 'Bear Canyon Park',
    distanceKm: 8.2,
    elevationM: 320,
    difficulty: 'moderate',
    type: 'trail run',
    rating: 4.8,
    reviewCount: 312,
    estMinutes: 52,
    description:
      'A rolling ridgeline route with panoramic views for the last 2km. Shaded switchbacks early, exposed climb near the summit.',
    routePath: 'M10,95 C30,70 20,50 55,45 C90,40 85,15 170,10',
    tags: ['Scenic', 'Hills', 'Dog friendly'],
  },
  {
    id: 'riverside-flats',
    name: 'Riverside Flats',
    location: 'Millbrook Greenway',
    distanceKm: 5.0,
    elevationM: 40,
    difficulty: 'easy',
    type: 'walk',
    rating: 4.6,
    reviewCount: 508,
    estMinutes: 40,
    description:
      'Flat paved path along the river, great for an easy recovery walk or an easy conversational-pace run.',
    routePath: 'M10,60 C50,55 90,65 130,58 C150,55 160,60 170,58',
    tags: ['Flat', 'Paved', 'Stroller friendly'],
  },
  {
    id: 'summit-push',
    name: 'Summit Push',
    location: 'Granite Peak Wilderness',
    distanceKm: 14.6,
    elevationM: 890,
    difficulty: 'hard',
    type: 'hike',
    rating: 4.9,
    reviewCount: 176,
    estMinutes: 210,
    description:
      'A demanding out-and-back to the summit with sustained climbing in the second half. Bring poles and layers.',
    routePath: 'M10,100 C30,80 25,55 50,50 C80,45 75,20 90,15 C110,8 130,25 170,5',
    tags: ['Summit', 'Exposed', 'Technical'],
  },
  {
    id: 'harbor-loop',
    name: 'Harbor Loop',
    location: 'Old Harbor District',
    distanceKm: 6.4,
    elevationM: 60,
    difficulty: 'easy',
    type: 'trail run',
    rating: 4.5,
    reviewCount: 421,
    estMinutes: 34,
    description: 'City-adjacent loop tracing the old harbor wall — a fast, mostly-flat tempo route.',
    routePath: 'M10,70 C40,75 60,40 90,45 C120,50 130,30 170,35',
    tags: ['Fast', 'Urban', 'Well lit'],
  },
  {
    id: 'pinewood-switchbacks',
    name: 'Pinewood Switchbacks',
    location: 'Cedar Hollow Forest',
    distanceKm: 10.1,
    elevationM: 540,
    difficulty: 'moderate',
    type: 'hike',
    rating: 4.7,
    reviewCount: 264,
    estMinutes: 130,
    description: 'Dense forest switchbacks with a creek crossing at the halfway point.',
    routePath: 'M10,95 C25,60 45,70 55,40 C65,15 90,30 110,20 C140,8 150,25 170,18',
    tags: ['Shaded', 'Creek crossing'],
  },
];
