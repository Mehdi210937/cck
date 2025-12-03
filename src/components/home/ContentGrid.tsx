import { ImageItem, ReleaseItem, YouTubeItem } from "./ContentItem";
import { Release } from "@/data/releases";

type ContentItem = 
  | { type: 'image'; src: string; alt: string; }
  | { type: 'release'; data: Release; }
  | { type: 'youtube'; videoId: string; };

interface ContentGridProps {
  items: ContentItem[];
  columns?: 2 | 3;
  excludeImage?: string;
}

const getScaleClass = (index: number, isMobile: boolean) => {
  if (isMobile) {
    const pattern = index % 9;
    if (pattern === 1 || pattern === 6) return 'scale-[1.4]';
    if (pattern === 3) return 'scale-[1.2]';
    if (pattern === 4) return 'scale-90';
    return '';
  }
  
  const pattern = index % 11;
  if (pattern === 1 || pattern === 7) return 'scale-[1.6]';
  if (pattern === 3 || pattern === 9) return 'scale-[1.3]';
  if (pattern === 5) return 'scale-[0.85]';
  return '';
};

export const DesktopGrid = ({ items, excludeImage }: ContentGridProps) => {
  const filteredItems = items.filter(
    item => item.type !== 'image' || (item.type === 'image' && item.src !== excludeImage)
  );

  return (
    <div className="columns-3 gap-0.5">
      {filteredItems.map((item, index) => {
        const scaleClass = getScaleClass(index, false);
        
        if (item.type === 'image') {
          return <ImageItem key={`image-${index}`} src={item.src} alt={item.alt} scaleClass={scaleClass} />;
        }
        if (item.type === 'release') {
          return <ReleaseItem key={`release-${item.data.id}`} release={item.data} scaleClass={scaleClass} />;
        }
        return null;
      })}
    </div>
  );
};

export const MobileGrid = ({ items }: ContentGridProps) => {
  const allItems: ContentItem[] = [
    { type: 'youtube', videoId: 'tOcCIcOuul8' },
    ...items
  ];

  return (
    <div className="columns-2 gap-0.5">
      {allItems.map((item, index) => {
        const scaleClass = getScaleClass(index, true);
        
        if (item.type === 'youtube') {
          return <YouTubeItem key={`youtube-${index}`} videoId={item.videoId} />;
        }
        if (item.type === 'image') {
          return <ImageItem key={`mobile-image-${index}`} src={item.src} alt={item.alt} scaleClass={scaleClass} />;
        }
        if (item.type === 'release') {
          return <ReleaseItem key={`mobile-release-${item.data.id}`} release={item.data} scaleClass={scaleClass} />;
        }
        return null;
      })}
    </div>
  );
};
