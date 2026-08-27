import React, { useState } from 'react';
import { ExternalLink, Check, Copy, Maximize2, ImageOff } from 'lucide-react';
import { SneakerItem } from '../types';

interface SneakerCardProps {
  sneaker: SneakerItem;
  viewMode: 'grid' | 'list';
  index: number;
  onPreviewImage?: (sneaker: SneakerItem) => void;
}

export const SneakerCard: React.FC<SneakerCardProps> = ({
  sneaker,
  viewMode,
  index,
  onPreviewImage,
}) => {
  const [copied, setCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState(sneaker.imageUrl);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(sneaker.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageError = () => {
    if (sneaker.fallbackImageUrl && imgSrc !== sneaker.fallbackImageUrl) {
      setImgSrc(sneaker.fallbackImageUrl);
    } else {
      setHasError(true);
    }
  };

  const isDark = sneaker.isDarkTheme;
  const isSpecial = sneaker.isSpecialBg;

  if (viewMode === 'list') {
    return (
      <div
        id={`sneaker-card-${sneaker.id}`}
        className={`group border-b border-[#f0f0f0] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 transition-colors ${
          isDark
            ? 'bg-black text-white hover:bg-neutral-900'
            : isSpecial
            ? 'bg-gray-50/70 hover:bg-gray-100/70 text-[#1a1a1a]'
            : 'bg-white hover:bg-neutral-50/80 text-[#1a1a1a]'
        }`}
      >
        {/* Thumbnail on left */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div
            onClick={() => onPreviewImage?.(sneaker)}
            className={`relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden border cursor-pointer ${
              isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200/80'
            }`}
            title="Click to view full photo"
          >
            {!hasError ? (
              <>
                {!isLoaded && (
                  <div
                    className={`absolute inset-0 animate-pulse ${
                      isDark ? 'bg-neutral-800' : 'bg-neutral-200'
                    }`}
                  />
                )}
                <img
                  src={imgSrc}
                  alt={sneaker.title}
                  referrerPolicy="no-referrer"
                  onLoad={() => setIsLoaded(true)}
                  onError={handleImageError}
                  className={`w-full h-full object-contain p-1.5 object-center transition-all duration-300 group-hover:scale-105 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-gray-400">
                <ImageOff className="w-4 h-4 mb-1" />
                <span className="text-[8px] uppercase tracking-wider">{sneaker.brand}</span>
              </div>
            )}

            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1 text-white rounded-none">
              <Maximize2 className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span
                className={`text-[9px] font-bold uppercase tracking-widest ${
                  isDark ? 'text-neutral-400' : 'text-gray-400'
                }`}
              >
                {sneaker.indexNumber || String(index + 1).padStart(2, '0')} &mdash;{' '}
                {sneaker.brandFull || sneaker.brand}
              </span>
              {sneaker.badge && (
                <span
                  className={`text-[8px] uppercase tracking-widest font-semibold px-1.5 py-0.5 border ${
                    isDark
                      ? 'border-neutral-700 text-neutral-300'
                      : 'border-neutral-200 text-neutral-600 bg-white'
                  }`}
                >
                  {sneaker.badge}
                </span>
              )}
            </div>

            <h2
              className={`text-sm sm:text-base font-semibold leading-tight uppercase tracking-tight truncate ${
                isDark ? 'text-white' : 'text-[#1a1a1a]'
              }`}
            >
              {sneaker.title}
            </h2>

            <div
              className={`flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-[10px] uppercase tracking-wider ${
                isDark ? 'text-neutral-400' : 'text-gray-400'
              }`}
            >
              <span>{sneaker.category}</span>
              <span>&bull;</span>
              <span>{sneaker.colorway}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? 'Copied link' : 'Copy product link'}
            className={`p-1.5 text-[10px] uppercase tracking-wider transition-opacity hover:opacity-60 flex items-center gap-1 ${
              isDark ? 'text-neutral-300' : 'text-neutral-500'
            }`}
            aria-label="Copy share link"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="text-[9px] font-medium uppercase tracking-widest">
              {copied ? 'Copied' : 'Share'}
            </span>
          </button>

          <a
            href={sneaker.url}
            target="_blank"
            rel="noopener noreferrer"
            id={`view-btn-${sneaker.id}`}
            className={`text-[10px] uppercase tracking-widest border-b pb-0.5 inline-flex items-center gap-1.5 font-bold transition-opacity hover:opacity-50 ${
              isDark ? 'border-white text-white' : 'border-black text-black'
            }`}
          >
            <span>View Catalog</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>
    );
  }

  // Grid Cell View matching Clean Minimalism design
  return (
    <div
      id={`sneaker-card-${sneaker.id}`}
      className={`group p-6 sm:p-7 flex flex-col justify-between min-h-[360px] sm:min-h-[400px] border-r border-b border-[#f0f0f0] transition-colors relative ${
        isDark
          ? 'bg-black text-white hover:bg-neutral-900'
          : isSpecial
          ? 'bg-gray-50/60 hover:bg-gray-100/70 text-[#1a1a1a]'
          : 'bg-white hover:bg-neutral-50/80 text-[#1a1a1a]'
      }`}
    >
      <div>
        {/* Header with index number & badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-[9px] font-bold uppercase tracking-widest ${
              isDark ? 'text-neutral-400' : 'text-gray-400'
            }`}
          >
            {sneaker.indexNumber || String(index + 1).padStart(2, '0')} &mdash;{' '}
            {sneaker.brandFull || sneaker.brand}
          </span>
          {sneaker.badge && (
            <span
              className={`text-[8px] uppercase tracking-widest font-semibold px-1 py-0.5 border ${
                isDark
                  ? 'border-neutral-700 text-neutral-300'
                  : 'border-neutral-200 text-neutral-500 bg-white'
              }`}
            >
              {sneaker.badge}
            </span>
          )}
        </div>

        {/* Sneaker Image Frame */}
        <div
          onClick={() => onPreviewImage?.(sneaker)}
          className={`relative w-full aspect-[4/3] overflow-hidden my-3 cursor-pointer border transition-all ${
            isDark
              ? 'bg-neutral-900 border-neutral-800'
              : 'bg-[#fafafa] border-neutral-200/60 group-hover:border-neutral-300'
          }`}
          title="Click to expand photograph"
        >
          {!hasError ? (
            <>
              {!isLoaded && (
                <div
                  className={`absolute inset-0 animate-pulse ${
                    isDark ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                />
              )}
              <img
                src={imgSrc}
                alt={sneaker.title}
                referrerPolicy="no-referrer"
                onLoad={() => setIsLoaded(true)}
                onError={handleImageError}
                className={`w-full h-full object-contain p-3 object-center transition-transform duration-500 group-hover:scale-105 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-gray-400">
              <ImageOff className="w-6 h-6 mb-2 opacity-50" />
              <span className="text-[9px] uppercase tracking-wider font-semibold">
                {sneaker.brand} Model
              </span>
            </div>
          )}

          {/* Minimal Expand Overlay */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1.5 text-white">
            <Maximize2 className="w-3 h-3" />
          </div>
        </div>

        {/* Title & Specifications */}
        <h2
          className={`text-[13px] sm:text-[14px] font-semibold leading-snug uppercase tracking-tight ${
            isDark ? 'text-white' : 'text-[#1a1a1a]'
          }`}
        >
          {sneaker.title}
        </h2>

        <p
          className={`mt-2 text-[10px] uppercase tracking-wider leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-gray-400'
          }`}
        >
          {sneaker.colorway}
        </p>
      </div>

      {/* Card Actions */}
      <div className="mt-6 pt-3 flex items-center justify-between gap-2 border-t border-dashed border-gray-100">
        <a
          href={sneaker.url}
          target="_blank"
          rel="noopener noreferrer"
          id={`view-btn-${sneaker.id}`}
          className={`text-[10px] uppercase tracking-widest border-b pb-0.5 inline-flex items-center gap-1.5 font-bold transition-opacity hover:opacity-50 ${
            isDark ? 'border-white text-white' : 'border-black text-black'
          }`}
        >
          <span>View Catalog</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>

        <button
          type="button"
          onClick={handleCopy}
          title={copied ? 'Copied' : 'Copy link'}
          className={`p-1 text-[10px] uppercase tracking-widest transition-opacity hover:opacity-60 flex items-center gap-1 ${
            isDark ? 'text-neutral-400 hover:text-white' : 'text-gray-400 hover:text-black'
          }`}
          aria-label="Copy share link"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span className="text-[8px] uppercase tracking-wider hidden xs:inline">
            {copied ? 'Copied' : 'Share'}
          </span>
        </button>
      </div>
    </div>
  );
};
