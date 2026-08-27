export interface SneakerItem {
  id: string;
  indexNumber: string;
  brand: 'Adidas' | 'On' | 'Nike';
  brandFull?: string;
  title: string;
  url: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  category: string;
  colorway: string;
  badge?: string;
  isSpecialBg?: boolean;
  isDarkTheme?: boolean;
}

