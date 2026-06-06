'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, X } from 'lucide-react';

interface Representative {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface CityData {
  [key: string]: Representative;
}

export default function TurkeyMap() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const representatives: CityData = {
    'İstanbul': {
      name: 'Ahmet Yılmaz',
      phone: '+90 212 123 45 67',
      email: 'istanbul@ipekci.com',
      address: 'Fatih Mahallesi, Turizm Caddesi No: 123, Fatih / İstanbul'
    },
    'Ankara': {
      name: 'Mehmet Demir',
      phone: '+90 312 123 45 67',
      email: 'ankara@ipekci.com',
      address: 'Kızılay Mahallesi, Atatürk Bulvarı No: 45, Çankaya / Ankara'
    },
    'İzmir': {
      name: 'Ayşe Kaya',
      phone: '+90 232 123 45 67',
      email: 'izmir@ipekci.com',
      address: 'Alsancak Mahallesi, Cumhuriyet Bulvarı No: 78, Konak / İzmir'
    },
    'Bursa': {
      name: 'Ali Öz',
      phone: '+90 224 123 45 67',
      email: 'bursa@ipekci.com',
      address: 'Heykel Mahallesi, Atatürk Caddesi No: 34, Osmangazi / Bursa'
    },
    'Antalya': {
      name: 'Fatma Arslan',
      phone: '+90 242 123 45 67',
      email: 'antalya@ipekci.com',
      address: 'Kaleiçi Mahallesi, Atatürk Caddesi No: 56, Muratpaşa / Antalya'
    },
    'Konya': {
      name: 'Mustafa Çelik',
      phone: '+90 332 123 45 67',
      email: 'konya@ipekci.com',
      address: 'Mevlana Mahallesi, Ankara Caddesi No: 90, Meram / Konya'
    },
  };

  const activeCities = Object.keys(representatives);

  const handleCityClick = (cityName: string) => {
    if (activeCities.includes(cityName)) {
      setSelectedCity(cityName);
      setShowModal(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent, cityName: string) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCity(null);
  };

  // SVG ile iframe embed yöntemi - gerçek Türkiye haritası
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-navy mb-2">İl Temsilcilerimiz</h2>
      <p className="text-gray-600 mb-8">Haritadan hizmet verdiğimiz illere tıklayarak temsilci bilgilerine ulaşabilirsiniz.</p>
      
      <div className="mb-8">
        <div className="w-full" dangerouslySetInnerHTML={{__html: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1007.087 589.5" className="w-full h-auto">
            <defs>
              <style>
                .province { stroke: #FFFFFF; stroke-width: 1; transition: all 0.3s; }
                .province.inactive { fill: #E0F3FF; cursor: not-allowed; }
                .province.active { fill: #81d742; cursor: pointer; }
                .province.active:hover { fill: #D4AF37; }
              </style>
            </defs>
            <g id="adana" class="province ${activeCities.includes('Adana') ? 'active' : 'inactive'}" onclick="window.handleCityClick?.('Adana')">
              <path d="M645.96,411.08l-2.11-2.11.7-1.41.7-1.41.7,1.41,2.82.7,3.52,0,.7.7v1.41l1.41,2.11v.7l.7.7,2.82,1.41h.7l1.41-.7,1.41-.7.7,2.11h-2.11l-1.41-1.41-1.41-.7-2.11,2.11-1.41.7h-2.11l-.7-.7v.7h-.7l-1.41.7-1.41,0-1.41-.7-.7-.7.7-.7Z"/>
            </g>
            <g id="adiyaman" class="province ${activeCities.includes('Adıyaman') ? 'active' : 'inactive'}" onclick="window.handleCityClick?.('Adıyaman')">
              <path d="M728.39,368.93l.7.7,2.11,3.52v1.41l-.7.7,2.11,2.11.7-1.41,2.11-.7,2.11.7.7-.7.7-2.11.7-1.41,1.41.7v2.82l-.7.7,1.41,1.41,4.23,2.11v2.11l-1.41.7-1.41-.7-1.41-1.41-2.11-2.82-1.41-1.41-.7.7-2.82-1.41v2.11l-.7.7.7,1.41h-.7l-3.52-1.41-.7,2.11-1.41-.7-1.41,1.41v-1.41l-2.11-2.11-2.82-2.82-4.23-1.41-2.82-.7-1.41-.7Z"/>
            </g>
          </svg>
        `}} />
      </div>

      {/* Modal */}
      {showModal && selectedCity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">{selectedCity} Temsilcimiz</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Temsilci Adı</p>
                <p className="font-semibold text-navy">{representatives[selectedCity]?.name}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Telefon</p>
                    <a href={`tel:${representatives[selectedCity]?.phone}`} className="font-semibold text-navy hover:text-gold transition-colors">
                      {representatives[selectedCity]?.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">E-posta</p>
                    <a href={`mailto:${representatives[selectedCity]?.email}`} className="font-semibold text-navy hover:text-gold transition-colors break-all">
                      {representatives[selectedCity]?.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Adres</p>
                    <p className="font-semibold text-navy">{representatives[selectedCity]?.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="w-full mt-6 bg-navy text-white py-3 rounded-lg font-semibold hover:bg-navy/90 transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
