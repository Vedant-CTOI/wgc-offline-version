import { Creative } from './types';

export const THEMES = ['All', 'Wedding', 'Festive', 'Everyday', 'Minimalist'];
export const ASPECT_RATIOS = ['All', '1:1', '4:5', '9:16', '16:9'];

export const MOCK_CREATIVES: Creative[] = [
  { id: 'c1', theme: 'Wedding', title: 'Bridal Elegance', aspectRatio: '9:16' },
  { id: 'c2', theme: 'Wedding', title: 'Gold Heritage', aspectRatio: '1:1' },
  { id: 'c3', theme: 'Festive', title: 'Diwali Sparkle', aspectRatio: '4:5' },
  { id: 'c4', theme: 'Festive', title: 'Navratri Special', aspectRatio: '16:9' },
  { id: 'c5', theme: 'Everyday', title: 'Office Chic', aspectRatio: '9:16' },
  { id: 'c6', theme: 'Minimalist', title: 'Modern Silver', aspectRatio: '1:1' },
  { id: 'c7', theme: 'Wedding', title: 'Diamond Vows', aspectRatio: '4:5' },
  { id: 'c8', theme: 'Everyday', title: 'Casual Gold', aspectRatio: '16:9' },
];

export const getAspectRatioClass = (ratio: string) => {
  switch(ratio) {
    case '1:1': return 'aspect-square';
    case '4:5': return 'aspect-[4/5]';
    case '9:16': return 'aspect-[9/16]';
    case '16:9': return 'aspect-video';
    default: return 'aspect-square';
  }
};
