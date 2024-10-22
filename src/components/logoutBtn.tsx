'use client';
import { createClient } from '@/utils/supabase/client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutBtn() {
  const supabase = createClient();
  const router = useRouter();

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log('Logged out');
      router.refresh();
    }
    if (error) {
      console.error('Error signing out:', error.message);
    }
  };
  return (
    <p className="text-sm text-muted-foreground cursor-pointer hover:underline" onClick={logOut}>
      Logout
    </p>
  );
}
