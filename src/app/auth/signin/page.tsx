"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Lock,
  User,
  MessageCircle,
  Github,
  Sparkles,
  ArrowLeft,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth process
    console.log('Auth attempt:', formData);
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className={`absolute animate-pulse ${i % 3 === 0 ? 'text-purple-300/30' : i % 3 === 1 ? 'text-blue-300/30' : 'text-pink-300/30'
            }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            fontSize: `${Math.random() * 10 + 6}px`,
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
        className="fixed inset-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`
        }}
      />

      {/* Header */}
      <header className={`relative z-10 border-b border-purple-500/20 backdrop-blur-lg bg-black/20 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <ArrowLeft className="w-5 h-5 text-purple-400" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AnimeTalk AI
                </h1>
              </div>
            </div>
          </Link>

          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Zap className="w-4 h-4 mr-1" />
            Beta Version
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className={`w-full max-w-md transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {isLogin ? 'Selamat Datang Kembali!' : 'Bergabung dengan Kami!'}
            </h1>
            <p className="text-gray-300 leading-relaxed">
              {isLogin
                ? 'Masuk untuk melanjutkan petualangan anime Anda'
                : 'Daftar untuk memulai petualangan anime yang seru'
              }
            </p>
          </div>

          {/* Auth Form */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-purple-800/30 border-purple-500/30 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {isLogin ? 'Masuk ke Akun' : 'Buat Akun Baru'}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {isLogin
                  ? 'Masukkan email dan password untuk melanjutkan'
                  : 'Isi data di bawah untuk membuat akun baru'
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {/* Username field - only for register */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-purple-300 font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Masukkan username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      />
                    </div>
                  </div>
                )}

                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-purple-300 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="anime@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-purple-300 font-medium">
                      Password
                    </Label>
                    {isLogin && (
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
                      >
                        Lupa password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="space-y-4">
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-xl shadow-xl shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'}
                  </Button>

                  {/* Social Login */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-purple-500/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-slate-800 text-gray-400">Atau lanjutkan dengan</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-slate-700/50 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300"
                      onClick={() => console.log('Google auth')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Google
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="bg-slate-700/50 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300"
                      onClick={() => console.log('GitHub auth')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>

              {/* Toggle Auth Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-300 text-sm">
                  {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
                  {' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 underline underline-offset-4"
                  >
                    {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 leading-relaxed">
              Dengan {isLogin ? 'masuk' : 'mendaftar'}, Anda menyetujui{' '}
              <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                Syarat & Ketentuan
              </Link>
              {' '}dan{' '}
              <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                Kebijakan Privasi
              </Link>
              {' '}kami
            </p>
          </div>

          {/* Demo Info */}
          <Card className="mt-6 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/30 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-300">Demo Mode</span>
              </div>
              <p className="text-xs text-gray-300">
                Coba fitur lengkap dengan akun demo. Tidak perlu registrasi!
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 text-xs"
                onClick={() => window.location.href = '/dashboard'}
              >
                Masuk sebagai Demo User
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 8}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoginForm;