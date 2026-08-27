import React, { useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { SneakerItem } from '../types';

interface ImageModalProps {
  sneaker: SneakerItem | null;
  allSneakers: SneakerItem[];
  onClose: () => void;
  onSelectSneaker: (sneaker: SneakerItem) => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  sneaker,
  allSneakers,
  onClose,
  onSelectSneaker,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!sneaker) return;
      const currentIndex = allSneakers.findIndex((s) => s.id === sneaker.id);
      if (e.key === 'ArrowRight' && currentIndex < allSneakers.length - 1) {
        onSelectSneaker(allSneakers[currentIndex + 1]);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectSneaker(allSneakers[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sneaker, allSneakers, onClose, onSelectSneaker]);

  if (!sneaker) return null;

  const currentIndex = allSneakers.findIndex((s) => s.id === sneaker.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
              {sneaker.indexNumber} &mdash; {sneaker.brandFull || sneaker.brand}
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-tight text-black mt-0.5">
              {sneaker.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative flex-1 bg-[#fafafa] flex items-center justify-center min-h-[320px] max-h-[520px] p-6 overflow-hidden">
          <img
            src={sneaker.imageUrl}
            alt={sneaker.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (sneaker.fallbackImageUrl && e.currentTarget.src !== sneaker.fallbackImageUrl) {
                e.currentTarget.src = sneaker.fallbackImageUrl;
              }
            }}
            className="w-full h-full object-contain max-h-[460px]"
          />

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={() => onSelectSneaker(allSneakers[currentIndex - 1])}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
              title="Previous shoe"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {currentIndex < allSneakers.length - 1 && (
            <button
              type="button"
              onClick={() => onSelectSneaker(allSneakers[currentIndex + 1])}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
              title="Next shoe"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Footer info & direct link */}
        <div className="p-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 space-y-0.5">
            <div>
              Colorway: <span className="font-semibold text-black">{sneaker.colorway}</span>
            </div>
            <div>
              Category: <span className="font-semibold text-black">{sneaker.category}</span>
            </div>
          </div>

          <a
            href={sneaker.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest border-b border-black pb-0.5 font-bold inline-flex items-center gap-1.5 hover:opacity-60 transition-opacity"
          >
            <span>View Full Product Link</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
