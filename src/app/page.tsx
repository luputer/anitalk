'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MessageCircle,
  Sparkles,
  Shield,
  Brain,
  Star,
  Zap,
  Github,
  Twitter,
  Instagram,
  ChevronRight
} from 'lucide-react';

const AnimeTalkLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: React.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove as any);
    return () => window.removeEventListener('mousemove', handleMouseMove as any);
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
      title: "Karakter Dinamis",
      description: "Berbicara dengan karakter anime favorit yang memiliki kepribadian unik dan respons yang natural",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      title: "Login Aman",
      description: "Sistem autentikasi yang aman dan terpercaya untuk melindungi privasi percakapan Anda",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-8 h-8 text-indigo-400" />,
      title: "AI Multi-Model",
      description: "Teknologi AI canggih yang memberikan pengalaman chatbot yang realistis dan menyenangkan",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute animate-pulse ${i % 3 === 0 ? 'text-purple-300' : i % 3 === 1 ? 'text-blue-300' : 'text-pink-300'
            }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${Math.random() * 8 + 4}px`,
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <FloatingElements />

      {/* Animated background gradient */}
      <div
        className="fixed inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className={`text-center transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              <Star className="w-4 h-4 mr-1" />
              Powered by Advanced AI
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              Masuki Dunia
              <br />
              <span className="inline-block animate-pulse">Anime AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Berbicara langsung dengan karakter anime favorit Anda menggunakan teknologi AI terdepan.
              Rasakan pengalaman chatbot yang tak terlupakan!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/40"
              onClick={() => window.location.href = '/auth/signin'}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Mulai Ngobrol
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg rounded-xl transition-all duration-300"
            >
              <Star className="w-5 h-5 mr-2" />
              Lihat Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { number: "50+", label: "Karakter Anime" },
              { number: "10K+", label: "Pengguna Aktif" },
              { number: "1M+", label: "Pesan Terkirim" },
              { number: "99%", label: "Kepuasan User" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Nikmati pengalaman chatbot anime yang tak terlupakan dengan fitur-fitur canggih kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} p-[1px] rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-slate-900/90 backdrop-blur-lg rounded-2xl p-8 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-lg">
            <CardContent className="text-center py-16 px-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Siap Memulai Petualangan?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan penggemar anime yang sudah merasakan keseruan berbicara dengan karakter favorit mereka
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.location.href = '/auth/signin'}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Mulai Sekarang - Gratis!
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-10 py-6 text-lg rounded-xl transition-all duration-300"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 backdrop-blur-lg bg-black/20 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AnimeTalk AI
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Platform chatbot AI terdepan untuk berbicara dengan karakter anime favorit Anda.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-300">Tautan Cepat</h4>
              <div className="space-y-2">
                {['Beranda', 'Karakter', 'Fitur', 'Bantuan', 'Kontak'].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-gray-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-300">Ikuti Kami</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
                  { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
                  { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/30 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-purple-500/20 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 AnimeTalk AI. Semua hak dilindungi. Made with ❤️ for anime lovers.
            </p>
          </div>
        </div>
      </footer>

      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Floating action button */}
      <div className="fixed bottom-8 right-8 z-20">
        <Button
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 animate-bounce"
          onClick={() => window.location.href = '/auth/signin'}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default AnimeTalkLanding;