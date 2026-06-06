'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
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

export default function GaleriPage() {
  const { t } = useTranslations();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image: string; title: string } | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/gallery/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
    }
  };

  const fetchGallery = async () => {
    try {
      const url = selectedCategory === 'all' 
        ? '/api/gallery' 
        : `/api/gallery?category=${selectedCategory}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setGallery(data);
      } else {
        setGallery([]);
      }
    } catch (error) {
      console.error('Galeri yüklenirken hata:', error);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (image: string, title: string) => {
    setLightbox({ isOpen: true, image, title });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

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
          <p className="text-xl text-gray-200">
            {t('galleryPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-md sticky top-20 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gold text-white shadow-lg'
                  : 'bg-gray-100 text-navy hover:bg-gray-200'
              }`}
            >
              {t('galleryPage.allCategories')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-gold text-white shadow-lg'
                    : 'bg-gray-100 text-navy hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
              <p className="mt-4 text-gray-600">{t('galleryPage.loading')}</p>
            </div>
          ) : gallery.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {t('galleryPage.noImages')}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery
                .filter(item => selectedCategory === 'all' ? true : item.category === selectedCategory)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(item.image, item.title_tr)}
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <Image
                      src={item.image}
                      alt={item.title_tr}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-lg">{item.title_tr}</h3>
                        {item.description_tr && (
                          <p className="text-gray-200 text-sm mt-1 line-clamp-2">{item.description_tr}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox?.isOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
            aria-label={t('galleryPage.closeButton')}
          >
            <X className="w-10 h-10" />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={lightbox.image}
              alt={lightbox.title}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-bold text-center">{lightbox.title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
