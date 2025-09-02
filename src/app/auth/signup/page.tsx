'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';

export default function SignUpPage() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Anitalk</h1>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>
        
        <RegisterForm className="mb-6" />
{/*         
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}