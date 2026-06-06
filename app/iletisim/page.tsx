'use client';

import { Phone, Mail, MapPin, Clock, Send, Star, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import TurkeyMap from '@/components/TurkeyMap';
import { useTranslations } from '@/lib/useTranslations';

interface Comment {
  id: number;
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export default function IletisimPage() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [commentFormData, setCommentFormData] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments');
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error('Yorumlar yüklenemedi:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentFormData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Yorumunuz alındı! Onaylandıktan sonra yayınlanacaktır.');
        setCommentFormData({ name: '', email: '', comment: '', rating: 5 });
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage(data.error || 'Bir hata oluştu');
      }
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-56">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy to-navy/90 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('contactPage.title')}</h1>
          <p className="text-xl text-gray-200">
            {t('contactPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Türkiye Haritası - Temsilciler */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <TurkeyMap />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Phone */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t('contactPage.phone')}</h3>
                <p className="text-gray-600 mb-2">{t('contactPage.callUs')}</p>
                <a href="tel:+903182248282" className="text-gold font-semibold hover:underline">
                  (0318) 224 82 82
                </a>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t('contactPage.email')}</h3>
                <p className="text-gray-600 mb-2">{t('contactPage.writeUs')}</p>
                <a href="mailto:ipekciturizmacenta@gmail.com" className="text-gold font-semibold hover:underline">
                  ipekciturizmacenta@gmail.com
                </a>
              </div>

              {/* Address */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t('contactPage.address')}</h3>
                <p className="text-gray-600 mb-3">
                  Ovacık, Hürriyet Cd. NO: 32/C
                  <br />
                  71200 Kırıkkale Merkez / Kırıkkale
                  <br />
                  Türkiye
                </p>
                <a 
                  href="https://www.google.com/maps/dir//%C4%B0pekci+Turizm+Hac+ve+Umre+Acentas%C4%B1,+Ovac%C4%B1k,+H%C3%BCrriyet+Cd.+NO+:+32%5CC,+71200+K%C4%B1r%C4%B1kkale+Merkez%2FK%C4%B1r%C4%B1kkale/@39.8798958,33.4700523,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4081df4cf1753563:0x5f1464515f20e1eb!2m2!1d33.5034731!2d39.8422221?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <MapPin className="h-4 w-4" />
                  {t('contactPage.viewOnMap')}
                </a>
              </div>

              {/* Working Hours */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t('contactPage.workingHours')}</h3>
                <div className="text-gray-600 space-y-1">
                  <p><span className="font-semibold">{t('contactPage.mondayFriday')}</span> 09:00 - 18:00</p>
                  <p><span className="font-semibold">{t('contactPage.saturday')}</span> 10:00 - 16:00</p>
                  <p><span className="font-semibold">{t('contactPage.sunday')}</span> {t('contactPage.closed')}</p>
                  <p className="text-sm mt-2 text-gold">
                    {t('contactPage.emergencyNote')}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-navy mb-6">{t('contactPage.sendMessage')}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        {t('contactPage.fullName')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder={t('contactPage.fullName')}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        {t('contactPage.yourEmail')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        {t('contactPage.yourPhone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="0500 000 00 00"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                        {t('contactPage.subject')}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      >
                        <option value="">{t('contactPage.selectSubject')}</option>
                        <option value="umre">{t('contactPage.umrah')}</option>
                        <option value="hac">{t('contactPage.hajj')}</option>
                        <option value="kultur">{t('contactPage.cultural')}</option>
                        <option value="genel">{t('contactPage.generalInfo')}</option>
                        <option value="other">{t('contactPage.other')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      {t('contactPage.yourMessage')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                      placeholder={t('contactPage.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-navy text-white py-4 rounded-lg font-semibold hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    {t('contactPage.sendButton')}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    {t('contactPage.requiredFields')}
                  </p>
                </form>
              </div>

              {/* Map */}
              <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-navy mb-6">{t('contactPage.visitOffice')}</h2>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.3786954321234!2d33.50034731234567!3d39.8422221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4081df4cf1753563%3A0x5f1464515f20e1eb!2zxLBwZWtjaSBUdXJpem0gSGFjIHZlIFVtcmUgQWNlbnRhc8Sx!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  {t('contactPage.appointmentNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yorum Formu ve Yorumlar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Yorum Formu */}
            <div className="bg-gradient-to-br from-gold/5 to-navy/5 rounded-2xl p-8 shadow-lg mb-12">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-gold" />
                <h2 className="text-3xl font-bold text-navy">{t('contactPage.shareComment')}</h2>
              </div>
              
              <form onSubmit={handleSubmitComment} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      {t('contactPage.fullName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={commentFormData.name}
                      onChange={(e) => setCommentFormData({ ...commentFormData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder={t('contactPage.fullName')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      {t('contactPage.yourEmail')}
                    </label>
                    <input
                      type="email"
                      value={commentFormData.email}
                      onChange={(e) => setCommentFormData({ ...commentFormData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    {t('contactPage.yourRating')}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setCommentFormData({ ...commentFormData, rating })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            rating <= commentFormData.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    {t('contactPage.yourComment')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={commentFormData.comment}
                    onChange={(e) => setCommentFormData({ ...commentFormData, comment: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    placeholder={t('contactPage.commentPlaceholder')}
                  />
                </div>

                {message && (
                  <div className={`p-4 rounded-lg text-sm font-medium ${
                    message.includes('alındı') 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold text-white py-4 rounded-lg font-semibold hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {submitting ? t('contactPage.submittingComment') : t('contactPage.submitComment')}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Müşteri Yorumları */}
            {comments.length > 0 && (
              <div>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-navy mb-3">{t('contactPage.customerReviews')}</h2>
                  <p className="text-gray-600">{t('contactPage.customerExperiences')}</p>
                  <div className="w-20 h-1 bg-gold mx-auto mt-4 rounded"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < comment.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
                        &quot;{comment.comment}&quot;
                      </p>
                      <div className="border-t pt-4">
                        <p className="font-semibold text-navy">{comment.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-8">{t('contactPage.faqTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">{t('contactPage.faq1Title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('contactPage.faq1Text')}
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">{t('contactPage.faq2Title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('contactPage.faq2Text')}
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">{t('contactPage.faq3Title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('contactPage.faq3Text')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
