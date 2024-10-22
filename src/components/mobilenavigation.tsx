import React from 'react';
import { Home, Plus, User } from 'lucide-react';
import CreatePost from './createpost';
import SignInButton from './signInBtn';
import { createClient } from '@/utils/supabase/server';

export default async function MobileNav() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-app-background border-t-[1.75px] border-cyan-200/10 xl:hidden">
        <nav className="flex justify-around items-center text-app-text py-3 px-3">
          <SignInButton />
        </nav>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-app-background border-t-[1.75px] border-cyan-200/10 xl:hidden">
      <nav className="flex justify-around items-center text-app-text py-3 px-3">
        {user && (
          <>
            <button className="w-fit h-10 hover:text-black hover:bg-gradient-to-b from-cyan-200 to-sky-500 rounded-full flex items-center justify-between px-4">
              <Home />
            </button>

            <button className="w-fit h-10 hover:text-black hover:bg-gradient-to-b from-cyan-200 to-sky-500 rounded-full flex items-center justify-between px-4">
              <User />
            </button>

            <CreatePost>
              <button className="w-1/3 h-10 bg-gradient-to-b from-cyan-200 to-sky-500 rounded-full flex items-center justify-center px-4 hover:text-black ">
                <Plus />
              </button>
            </CreatePost>
          </>
        )}
      </nav>
    </footer>
  );
}
