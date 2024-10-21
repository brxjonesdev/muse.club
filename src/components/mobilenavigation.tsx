import React from 'react';
import { Bell, Home, Plus, User } from 'lucide-react';
import { Button } from './ui/button';

export default function MobileNav() {
  const isLoggedIn = true;
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-app-background border-t-[1.75px] border-cyan-200/10 xl:hidden">
      <nav className="flex justify-around items-center text-app-text py-3 px-3">
        <button className="w-fit h-10 hover:text-black hover:bg-gradient-to-b from-cyan-200 to-sky-500 rounded-full flex items-center justify-between  px-4">
          <Home />
        </button>

        {isLoggedIn ? (
          <>
            <button className="w-fit h-10 hover:text-black hover:bg-gradient-to-b from-cyan-200 to-sky-500 rounded-full flex items-center justify-between  px-4 ">
              <Bell />
            </button>

            <button className="w-fit h-10 hover:text-black hover:bg-gradient-to-b from-cyan-200 to-sky-500 rounded-full flex items-center justify-between  px-4 ">
              <User />
            </button>

            <button className="w-fit h-10 bg-gradient-to-b from-cyan-200 to-sky-500 rounded-full flex items-center justify-between  px-4 hover:text-black ">
              <Plus />
            </button>
          </>
        ) : (
          <Button className="bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold text-center w-full">
            Sign Up / Log In
          </Button>
        )}
      </nav>
    </footer>
  );
}
