/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header.js';
import { HeroSection } from './components/HeroSection.js';
import { AboutSection } from './components/AboutSection.js';
import { VehiclesSection } from './components/VehiclesSection.js';
import { ServicesSection } from './components/ServicesSection.js';
import { TestimonialsSection } from './components/TestimonialsSection.js';
import { ContactSection } from './components/ContactSection.js';
import { Footer } from './components/Footer.js';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.js';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:rounded-lg focus:shadow-xl"
      >
        Pular para o conteúdo principal
      </a>

      {/* Main Header */}
      <Header />

      {/* Semantic Main Element encapsulating all page sections */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Sobre / Missão Section */}
        <AboutSection />

        {/* 3. Veículos em Destaque Section */}
        <VehiclesSection />

        {/* 4. Serviços Section */}
        <ServicesSection />

        {/* 5. Depoimentos Section */}
        <TestimonialsSection />

        {/* 6. Contato e Localização Section */}
        <ContactSection />
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Quick Action Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
