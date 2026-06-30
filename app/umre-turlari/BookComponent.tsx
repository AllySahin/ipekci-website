'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface BookComponentProps {
  totalPages?: number;
  imagePrefix?: string;
  imageExtension?: string;
}

export default function BookComponent({ totalPages = 19, imagePrefix = '/images/', imageExtension = '.jpg' }: BookComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Web Audio API Synthesized Page Turn Sound (Paper Rustle)
  const playPageTurnSound = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1300, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.35);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
      
      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noiseSource.start();
      noiseSource.stop(ctx.currentTime + 0.4);
    } catch (err) {
      console.warn('Ses çalınamadı:', err);
    }
  }, [soundEnabled]);

  const handleNext = useCallback(() => {
    if (isFlipping) return;
    if (currentPage < totalPages) {
      setFlipDirection('next');
      setIsFlipping(true);
      playPageTurnSound();
      
      // Navigate to the next page after half of the animation
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
      }, 250);

      // Finish flipping animation
      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 500);
    } else {
      setIsPlaying(false); // Stop autoplay if reached the end
    }
  }, [currentPage, totalPages, isFlipping, playPageTurnSound]);

  const handlePrev = useCallback(() => {
    if (isFlipping) return;
    if (currentPage > 1) {
      setFlipDirection('prev');
      setIsFlipping(true);
      playPageTurnSound();

      // Navigate to the previous page after half of the animation
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
      }, 250);

      // Finish flipping animation
      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 500);
    }
  }, [currentPage, isFlipping, playPageTurnSound]);

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, 5000); // Change slide every 5 seconds
    } else {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPlaying, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen]);

  const getPageUrl = (pageNum: number) => {
    return `${imagePrefix}${pageNum}${imageExtension}`;
  };

  return (
    <div className={`flex flex-col items-center select-none ${isFullscreen ? 'fixed inset-0 z-[9999] bg-stone-950 flex items-center justify-center p-6' : 'relative py-6'}`}>
      
      {/* Premium Dark Leather / Wooden Container Wrapper */}
      <div className={`w-full max-w-4xl bg-stone-900 rounded-3xl p-4 md:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-stone-800 flex flex-col gap-4 ${isFullscreen ? 'h-[90vh] justify-between' : ''}`}>
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between w-full bg-stone-950/90 border border-gold/20 rounded-2xl px-4 py-3 text-white shadow-inner">
          <div className="text-xs md:text-sm font-semibold tracking-wide flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-stone-300 font-medium">UMRENİN FAZİLETLERİ</span>
            <span className="bg-gold/15 text-gold text-[10px] md:text-xs px-2.5 py-0.5 rounded-full font-bold font-mono">
              {currentPage} / {totalPages}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause Autoplay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-xl transition-all duration-200 ${isPlaying ? 'bg-gold text-navy' : 'hover:bg-stone-800 text-stone-300'}`}
              title={isPlaying ? 'Otomatik Oynatmayı Durdur' : 'Otomatik Oynat'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 hover:text-gold transition-colors duration-200"
              title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>
            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 hover:text-gold transition-colors duration-200"
              title={isFullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran Yap'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 16:9 Page Viewport with perspective for 3D flip effect */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-white shadow-2xl border-4 border-gold/30 perspective-2000">
          
          {/* Main Book Page Content */}
          <div className={`relative w-full h-full transform-style-3d ${
            isFlipping
              ? flipDirection === 'next'
                ? 'animate-3d-flip-next'
                : 'animate-3d-flip-prev'
              : ''
          }`}>
            <Image
              src={getPageUrl(currentPage)}
              alt={`Sayfa ${currentPage}`}
              fill
              className="object-contain bg-white"
              priority
              unoptimized
            />
            
            {/* Soft inner booklet shadows & paper texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none" />
            <div className="absolute inset-0 bg-white/[0.02] pointer-events-none mix-blend-overlay" />
          </div>

          {/* Navigation Overlay Buttons (Left / Right edge click areas) */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 1 || isFlipping}
            className="absolute left-0 top-0 bottom-0 w-[12%] flex items-center justify-start pl-4 text-stone-400 hover:text-gold bg-gradient-to-r from-black/30 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            title="Önceki Sayfa"
          >
            <ChevronLeft className="w-8 h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || isFlipping}
            className="absolute right-0 top-0 bottom-0 w-[12%] flex items-center justify-end pr-4 text-stone-400 hover:text-gold bg-gradient-to-l from-black/30 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            title="Sonraki Sayfa"
          >
            <ChevronRight className="w-8 h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
          </button>
        </div>

        {/* Bottom Navigation Controls */}
        <div className="flex items-center justify-between w-full bg-stone-950/40 rounded-xl px-4 py-2 border border-stone-800/60">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1 || isFlipping}
            className="flex items-center gap-1 px-4 py-2 text-xs md:text-sm font-semibold rounded-lg bg-stone-950 hover:bg-gold text-white hover:text-navy border border-stone-850 hover:border-gold transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
            Önceki
          </button>

          {/* Page Indicators dots (hidden on small screens if too many) */}
          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto max-w-[50%] py-1">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (isFlipping) return;
                  playPageTurnSound();
                  setCurrentPage(idx + 1);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === idx + 1 ? 'bg-gold scale-125' : 'bg-stone-700 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || isFlipping}
            className="flex items-center gap-1 px-4 py-2 text-xs md:text-sm font-semibold rounded-lg bg-stone-950 hover:bg-gold text-white hover:text-navy border border-stone-850 hover:border-gold transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
          >
            Sonraki
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Keyboard guide tip */}
      <p className="mt-4 text-xs text-gray-500 flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full shadow-sm">
        <span>💡 Klavye <b>yön tuşlarını</b> veya <b>boşluk (space)</b> tuşunu kullanarak otomatik oynatmayı başlatabilirsiniz.</span>
      </p>

      {/* 3D Flip animations for 16:9 single page */}
      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        @keyframes flip-3d-next {
          0% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
          45% {
            transform: rotateY(-90deg) scale(0.92);
            opacity: 0.3;
          }
          55% {
            transform: rotateY(90deg) scale(0.92);
            opacity: 0.3;
          }
          100% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
        }
        @keyframes flip-3d-prev {
          0% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
          45% {
            transform: rotateY(90deg) scale(0.92);
            opacity: 0.3;
          }
          55% {
            transform: rotateY(-90deg) scale(0.92);
            opacity: 0.3;
          }
          100% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
        }
        .animate-3d-flip-next {
          animation: flip-3d-next 0.5s ease-in-out forwards;
        }
        .animate-3d-flip-prev {
          animation: flip-3d-prev 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
