'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Images } from 'lucide-react';
import { useTranslations } from '@/lib/useTranslations';

interface GalleryItem {
  id: number;
  title_tr: string;
  title_ar: string;
  description_tr: string;
  description_ar: string;
  image: string;
  category: string;
  order: number;
}

interface CategoryGroup {
  value: string;
  label: string;
  images: string[];
  count: number;
}

// Her fotoğraf için dağınık açı sabitleri (deterministik)
const SCATTER_ROTATIONS = [-8, 4, -3, 7, -5, 2, -6, 9, -2, 5];
const SCATTER_OFFSETS = [
  { x: -6, y: -4 },
  { x: 5, y: 3 },
  { x: -3, y: 6 },
  { x: 8, y: -2 },
  { x: -5, y: 5 },
];

export default function GaleriPage() {
  const { t } = useTranslations();
  const [allGallery, setAllGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image: string; index: number; images: string[] } | null>(null);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchGallery()]);
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/gallery/categories');
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch {}
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setAllGallery(Array.isArray(data) ? data : []);
    } catch {
      setAllGallery([]);
    } finally {
      setLoading(false);
    }
  };

  // Kategorilere göre grupla
  const categoryGroups: CategoryGroup[] = categories.map(cat => {
    const imgs = allGallery
      .filter(item => item.category === cat.value)
      .sort((a, b) => a.order - b.order)
      .map(item => item.image);
    return { value: cat.value, label: cat.label, images: imgs, count: imgs.length };
  }).filter(g => g.count > 0);

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ isOpen: true, image: images[index], index, images });
  };

  const closeLightbox = () => setLightbox(null);

  const goNext = () => {
    if (!lightbox) return;
    const next = (lightbox.index + 1) % lightbox.images.length;
    setLightbox({ ...lightbox, image: lightbox.images[next], index: next });
  };

  const goPrev = () => {
    if (!lightbox) return;
    const prev = (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length;
    setLightbox({ ...lightbox, image: lightbox.images[prev], index: prev });
  };

  // Seçili kategori görselleri
  const selectedGroup = selectedCategory
    ? categoryGroups.find(g => g.value === selectedCategory)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-56">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/70 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=800&fit=crop"
          alt="Galeri"
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{t('galleryPage.title')}</h1>
          <p className="text-xl text-gray-200">{t('galleryPage.subtitle')}</p>
        </div>
      </section>

      {/* Ana içerik */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent" />
              <p className="mt-4 text-gray-600">{t('galleryPage.loading')}</p>
            </div>
          ) : !selectedCategory ? (
            // KATEGORİ KART GÖRÜNÜMÜ
            <>
              {categoryGroups.length === 0 ? (
                <div className="text-center py-20 text-gray-500">{t('galleryPage.noImages')}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {categoryGroups.map((group) => (
                    <button
                      key={group.value}
                      onClick={() => setSelectedCategory(group.value)}
                      className="group flex flex-col items-center text-center focus:outline-none"
                    >
                      {/* Dağınık katmanlı fotoğraflar */}
                      <div className="relative w-64 h-64 mb-5">
                        {/* Arka katmanlar (max 3 arka fotoğraf) */}
                        {group.images.slice(1, 4).reverse().map((img, i) => {
                          const rot = SCATTER_ROTATIONS[(i + 1) % SCATTER_ROTATIONS.length];
                          const off = SCATTER_OFFSETS[(i + 1) % SCATTER_OFFSETS.length];
                          return (
                            <div
                              key={i}
                              className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border-4 border-white"
                              style={{
                                transform: `rotate(${rot}deg) translate(${off.x}px, ${off.y}px)`,
                                zIndex: i,
                              }}
                            >
                              <Image
                                src={img}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                          );
                        })}
                        {/* Ön (ana) fotoğraf */}
                        {group.images[0] && (
                          <div
                            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white group-hover:scale-105 transition-transform duration-300"
                            style={{ zIndex: 10 }}
                          >
                            <Image
                              src={group.images[0]}
                              alt={group.label}
                              fill
                              className="object-cover"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Images className="w-10 h-10 text-white drop-shadow" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Kategori adı ve sayısı */}
                      <h2 className="text-xl font-bold text-navy group-hover:text-gold transition-colors duration-200">
                        {group.label}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">{group.count} fotoğraf</p>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            // SEÇİLİ KATEGORİ GÖRSEL GRID
            <>
              {/* Geri butonu */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="mb-8 flex items-center gap-2 text-navy hover:text-gold font-semibold transition-colors"
              >
                <span className="text-lg">←</span>
                <span>Tüm Kategoriler</span>
              </button>

              <h2 className="text-3xl font-bold text-navy mb-8">
                {selectedGroup?.label}
                <span className="ml-3 text-lg font-normal text-gray-400">({selectedGroup?.count} fotoğraf)</span>
              </h2>

              {selectedGroup && selectedGroup.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {selectedGroup.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => openLightbox(selectedGroup.images, idx)}
                      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <Image
                        src={img}
                        alt={`${selectedGroup.label} ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">Bu kategoride görsel yok</div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox?.isOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gold transition-colors z-10"
          >
            <X className="w-10 h-10" />
          </button>

          {/* Prev */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors text-4xl font-light z-10"
            >
              ‹
            </button>
          )}

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.image}
              alt="Galeri"
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Next */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors text-4xl font-light z-10"
            >
              ›
            </button>
          )}

          {/* Counter */}
          {lightbox.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
