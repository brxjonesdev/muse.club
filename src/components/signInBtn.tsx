'use client';
import { createClient } from '@/utils/supabase/client';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function SignInButton() {
  const supabase = createClient();
  const router = useRouter();

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (!error) {
      router.refresh();
    }

    if (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <Button
      onClick={signIn} // Add the onClick handler here
      className="bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold text-center w-full"
    >
      Sign In / Sign Up
    </Button>
  );
}
