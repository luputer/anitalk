"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { LogIn, LogOut, User } from 'lucide-react';

const AuthButton = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Signed in as {session?.user?.email}</span>
                <Button onClick={() => signOut()} variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                </Button>
            </div>
        );
    }
    return (
        <Button onClick={() => signIn()} variant="default">
            <LogIn className="w-4 h-4 mr-2" />
            Sign in
        </Button>
    );
};

export default AuthButton;