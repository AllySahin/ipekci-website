'use client';

import Image from 'next/image';
import { Users, Award, Heart, Globe, CheckCircle, Target, Sparkles, Shield, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/useTranslations';

interface TeamMember {
  id: number;
  name: string;
  position_tr: string;
  position_ar: string;
  bio_tr: string;
  bio_ar: string;
  image: string;
  order: number;
}

export default function HakkimizdaPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslations();

  useEffect(() => {
    fetchTeam();
    setIsVisible(true);
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (Array.isArray(data)) {
        setTeam(data);
      } else {
        console.error('API yanıtı array değil:', data);
        setTeam([]);
      }
    } catch (error) {
      console.error('Ekip yüklenirken hata:', error);
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  const values = [
    {
      icon: Shield,
      title: t('aboutPage.trust'),
      description: t('aboutPage.trustDesc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: t('aboutPage.quality'),
      description: t('aboutPage.qualityDesc'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      title: t('aboutPage.spiritualPeace'),
      description: t('aboutPage.spiritualPeaceDesc'),
      color: 'from-rose-500 to-rose-600'
    },
    {
      icon: Clock,
      title: t('aboutPage.support247'),
      description: t('aboutPage.support247Desc'),
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 lg:pt-56">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=1080&fit=crop"
          alt="Hakkımızda - Kutsal Topraklar"
          fill
          className="object-cover"
          priority
        />
        <div className={`relative z-20 container mx-auto px-6 text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-gold/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-pulse">
            <Sparkles className="inline-block w-5 h-5 mr-2" />
            <span className="text-gold font-semibold">{t('aboutPage.sinceTrust')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('aboutPage.title')}</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {t('aboutPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <div className="inline-block">
                  <h2 className="text-4xl font-bold text-navy mb-2">{t('aboutPage.ourStory')}</h2>
                  <div className="h-1 w-20 bg-gold rounded"></div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t('aboutPage.storyText1')}
                  </p>
                  <div className="bg-gradient-to-r from-gold/10 to-transparent p-5 rounded-lg border-l-4 border-gold">
                    <p className="text-gray-800 leading-relaxed">
                      <strong className="text-navy">{t('aboutPage.storyHighlight')}</strong> {t('aboutPage.storyHighlightText')}
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t('aboutPage.storyText2')}
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=900&fit=crop"
                    alt="Kabe - Kutsal Topraklar"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">{t('aboutPage.teamTitle')}</h2>
            <p className="text-gray-600 text-lg">{t('aboutPage.teamSubtitle')}</p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4 rounded"></div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
              <p className="mt-6 text-gray-600 text-lg">{t('aboutPage.loading')}</p>
            </div>
          ) : !Array.isArray(team) || team.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-2xl p-12 max-w-md mx-auto">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">{t('aboutPage.noTeam')}</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <div 
                  key={member.id} 
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {member.image && (
                    <div className="relative h-72 bg-gradient-to-b from-gray-200 to-gray-300 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">{member.name}</h3>
                    <p className="text-gold font-semibold mb-3 text-sm">{member.position_tr}</p>
                    {member.bio_tr && (
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio_tr}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmYWY4ZjQiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0wIDMwdi0yaDMwdjJIMzZ6TTAgMzZoMzB2Mkgwdi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">{t('aboutPage.valuesTitle')}</h2>
            <p className="text-gray-600 text-lg">{t('aboutPage.valuesSubtitle')}</p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4 rounded"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <value.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-navy text-center group-hover:text-gold transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="group bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-t-4 border-gold hover:-translate-y-2">
              <div className="bg-gradient-to-br from-gold to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-navy mb-6 group-hover:text-gold transition-colors">{t('aboutPage.ourMission')}</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t('aboutPage.missionText')}
              </p>
            </div>
            
            <div className="group bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-t-4 border-navy hover:-translate-y-2">
              <div className="bg-gradient-to-br from-navy to-blue-900 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-navy mb-6 group-hover:text-gold transition-colors">{t('aboutPage.ourVision')}</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t('aboutPage.visionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmet Anlayışımız */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1E8] via-white to-[#FAF8F4]"></div>
        <Image
          src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&h=1080&fit=crop"
          alt="Mescid-i Nebevi"
          fill
          className="object-cover opacity-5"
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">{t('aboutPage.serviceApproach')}</h2>
              <div className="w-20 h-1 bg-gold mx-auto rounded"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-gold">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-gold to-yellow-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-3">{t('aboutPage.comfortPeace')}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('aboutPage.comfortPeaceText')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-navy">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-navy to-blue-900 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-3">{t('aboutPage.alwaysWithYou')}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('aboutPage.alwaysWithYouText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-navy mb-4">{t('aboutPage.whyUs')}</h2>
              <p className="text-gray-600 text-lg">{t('aboutPage.whyUsSubtitle')}</p>
              <div className="w-20 h-1 bg-gold mx-auto mt-4 rounded"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: Shield,
                  text: t('aboutPage.whyItem1'),
                  color: 'from-blue-500 to-blue-600'
                },
                { 
                  icon: Award,
                  text: t('aboutPage.whyItem2'),
                  color: 'from-purple-500 to-purple-600'
                },
                { 
                  icon: Users,
                  text: t('aboutPage.whyItem3'),
                  color: 'from-teal-500 to-teal-600'
                },
                { 
                  icon: CheckCircle,
                  text: t('aboutPage.whyItem4'),
                  color: 'from-green-500 to-green-600'
                },
                { 
                  icon: Globe,
                  text: t('aboutPage.whyItem5'),
                  color: 'from-rose-500 to-rose-600'
                },
                { 
                  icon: Clock,
                  text: t('aboutPage.whyItem6'),
                  color: 'from-orange-500 to-orange-600'
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`bg-gradient-to-br ${item.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
