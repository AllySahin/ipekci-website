'use client';

import { Geist, Geist_Mono } from "next/font/google";
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { LanguageProvider } from '@/lib/LanguageContext';
import "./globals.css";
import { useState } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageSelectorOpen, setLanguageSelectorOpen] = useState(false);

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <LanguageSelector isOpen={languageSelectorOpen} onClose={() => setLanguageSelectorOpen(false)} />
          <Header 
            onMenuClick={() => setSidebarOpen(true)} 
            onLanguageClick={() => setLanguageSelectorOpen(true)}
          />
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="lg:ml-16 transition-all duration-300">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
