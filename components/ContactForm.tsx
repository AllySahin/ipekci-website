'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    people: '',
    message: '',
    kvkkConsent: false,
    whatsappConsent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ ' + result.message);
        // Formu temizle
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          people: '',
          message: '',
          kvkkConsent: false,
          whatsappConsent: false,
        });
      } else {
        alert('❌ ' + result.message);
      }
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      alert('❌ Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-navy font-medium mb-1.5 text-sm">
            Ad Soyad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-navy font-medium mb-1.5 text-sm">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+90 555 123 45 67"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-navy font-medium mb-1.5 text-sm">
            E-posta <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-navy font-medium mb-1.5 text-sm">
            Tarih Tercihi <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-navy font-medium mb-1.5 text-sm">
          Kişi Sayısı <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="people"
          value={formData.people}
          onChange={handleChange}
          min="1"
          placeholder="Kaç kişi"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-navy font-medium mb-1.5 text-sm">
          Mesajınız (İsteğe Bağlı)
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
          placeholder="Mesajınızı buraya yazın..."
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="kvkkConsent"
            checked={formData.kvkkConsent}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
            required
          />
          <span className="text-xs text-gray-700">
            KVKK kapsamında kişisel verilerimin işlenmesini kabul ediyorum{' '}
            <span className="text-red-500">*</span>
          </span>
        </label>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="whatsappConsent"
            checked={formData.whatsappConsent}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
          />
          <span className="text-xs text-gray-700">
            WhatsApp üzerinden bilgilendirilmek istiyorum
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-4 w-4" />
        {loading ? 'Gönderiliyor...' : 'Gönder'}
      </button>
    </form>
  );
}
