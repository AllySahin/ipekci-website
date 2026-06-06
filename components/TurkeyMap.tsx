'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, User } from 'lucide-react';

interface Representative {
  id: number;
  city: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  image?: string;
  order: number;
  isActive: boolean;
}

const TurkeyMap: React.FC = () => {
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepresentatives();
  }, []);

  const fetchRepresentatives = async () => {
    try {
      const res = await fetch('/api/representatives');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setRepresentatives(data);
        setSelectedCity(data[0].city); // İlk ili otomatik seç
      }
    } catch (error) {
      console.error('Temsilciler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedRep = representatives.find(rep => rep.city === selectedCity);

  if (loading) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-500">Yükleniyor...</p>
      </div>
    );
  }

  if (representatives.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-500">Henüz temsilci bilgisi bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Hizmet Verdiğimiz İller
        </h2>
        <p className="text-gray-600">
          Türkiye genelinde {representatives.length} ilde hizmetinizdeyiz
        </p>
      </div>

      {/* İki Kolonlu Yapı */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sol Taraf - İl Butonları */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">İller</h3>
            <div className="space-y-2">
              {representatives.map((rep) => (
                <button
                  key={rep.id}
                  onClick={() => setSelectedCity(rep.city)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                    selectedCity === rep.city
                      ? 'bg-gradient-to-r from-[#35509a] to-[#2a4080] text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rep.city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ Taraf - İletişim Bilgileri */}
        <div className="lg:col-span-2">
          {selectedRep && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Başlık ve Görsel */}
              <div className="border-b-2 border-navy pb-6 mb-6">
                <div className="flex items-center gap-6">
                  {selectedRep.image && (
                    <img
                      src={selectedRep.image}
                      alt={selectedRep.name}
                      className="w-24 h-24 rounded-full object-cover border-3 border-gold shadow-md flex-shrink-0"
                    />
                  )}
                  <div>
                    <h3 className="text-3xl font-bold text-navy">{selectedRep.city}</h3>
                    <p className="text-gray-600 mt-1">Bölge Temsilciliği</p>
                  </div>
                </div>
              </div>

              {/* İletişim Bilgileri */}
              <div className="space-y-6">
                {/* Temsilci */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gold border-opacity-30">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Temsilci</p>
                    <p className="text-xl font-bold text-navy">{selectedRep.name}</p>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-navy hover:shadow-md transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-navy bg-opacity-10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Telefon</p>
                    <a 
                      href={`tel:${selectedRep.phone}`}
                      className="text-lg font-semibold text-navy hover:text-gold transition-colors"
                    >
                      {selectedRep.phone}
                    </a>
                  </div>
                </div>

                {/* E-posta */}
                <div className="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gold hover:shadow-md transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold bg-opacity-10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">E-posta</p>
                    <a 
                      href={`mailto:${selectedRep.email}`}
                      className="text-lg font-semibold text-gold hover:text-navy transition-colors break-all"
                    >
                      {selectedRep.email}
                    </a>
                  </div>
                </div>

                {/* Adres */}
                <div className="flex items-start gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-navy hover:shadow-md transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-navy bg-opacity-10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Adres</p>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRep.address + ', ' + selectedRep.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-navy hover:text-gold transition-colors cursor-pointer hover:underline"
                    >
                      {selectedRep.address}
                    </a>
                  </div>
                </div>

                {/* İletişim Butonları */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <a
                    href={`tel:${selectedRep.phone}`}
                    className="bg-navy hover:bg-navy-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    Hemen Ara
                  </a>
                  <a
                    href={`mailto:${selectedRep.email}`}
                    className="bg-white border-2 border-gold text-gold hover:bg-gold hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    E-posta Gönder
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurkeyMap;
