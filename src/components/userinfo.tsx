'use client';

import { useEffect, useState } from 'react';
import { Music, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { FlipWords } from './ui/flip-words';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreatePost from './createpost';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import SignInButton from './signInBtn';
import LogoutBtn from './logoutBtn';
import { DialogClose } from '@radix-ui/react-dialog';

const words = [
  'Music is the universal language of mankind. — Henry Wadsworth Longfellow',
  'Where words fail, music speaks. — Hans Christian Andersen',
  'Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything. — Plato',
  'Music is the divine way to tell beautiful, poetic things to the heart. — Pablo Casals',
  'To share your music is to share your soul. — Anonymous',
];

export default function UserInfoCard() {
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'User Name',
    email: '',
    profile_photo: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        setUserInfo({
          name: user.user_metadata.full_name,
          email: user.email,
          profile_photo: user.user_metadata.avatar_url,
        });
      }
    };

    checkAuth();
  }, [supabase, supabase.auth]);

  useEffect(() => {
    const checkDatabase = async () => {
      if (!userInfo.email) return; // Ensure email is available before running

      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', userInfo.email);
      if (error) {
        throw error;
      }
      if (users.length === 0) {
        const { error } = await supabase
          .from('users')
          .insert([
            { email: userInfo.email, name: userInfo.name, profile_photo: userInfo.profile_photo },
          ]);
        if (error) {
          throw error;
        }
      }
    };

    checkDatabase();
  }, [userInfo.email, supabase, userInfo.name, userInfo.profile_photo]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen xl:flex flex-col w-full max-w-[350px] mt-16 hidden h-[260px] ">
        <Card className="bg-[#161616] border-none text-app-text">
          <CardHeader className="">
            <CardTitle>Welcome to Muse.Club!</CardTitle>
            <CardDescription>Discover new music and share your favorites</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton />
          </CardContent>

          <div className="mx-6 p-4 text-sm bg-white/10 flex items-center justify-center rounded-lg mb-4">
            <FlipWords words={words} className="text-white" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen xl:flex flex-col w-full max-w-[350px] mt-16 hidden h-[260px] ">
      <Card className="bg-[#161616] border-none text-app-text">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-10 w-10">
            {userInfo.profile_photo ? (
              <AvatarImage
                alt={`${userInfo.email}'s profile picture`}
                src={userInfo.profile_photo}
              />
            ) : (
              <AvatarFallback>
                {userInfo.name ? userInfo.name[0].toUpperCase() : 'UN'}
              </AvatarFallback>
            )}
          </Avatar>

          <div>
            <CardTitle>{userInfo.name || 'User Name'}</CardTitle>
            <p className="text-sm text-muted-foreground">
              @{userInfo.email ? userInfo.email.replace('@gmail.com', '') : 'unknown'}
            </p>
          </div>

          <Dialog>
            <DialogTrigger className="ml-auto">
              <Music className="w-5 h-5 animate-bounce" />
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#161616] text-gray-100 h-fit flex flex-col border-none p-0">
              <div className="bg-gradient-to-r from-cyan-400 to-sky-500 min-h-[50px] flex items-center px-6 rounded-t-md">
                <DialogTitle className="font-bold text-black/70">
                  Muse.Club, <span className="text-sm">from brxjonesdev.</span>
                </DialogTitle>
              </div>
              <div className="pt-0 p-6 flex flex-col h-full gap-4">
                <DialogHeader className="space-y-1">
                  <DialogTitle className="text-xl font-bold">What is Muse.Club?</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    To share your music is to share your soul.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                  <p>
                    We believe that music is more than just sound—it&apos;s the universal language
                    that connects us all. Our mission is to bring people together through the shared
                    love of authentic, handpicked music that resonates with the soul.
                  </p>
                  <p>
                    Muse.Club was born out of a passion for discovering and celebrating meaningful
                    music. This project is a labor of love crafted by Braxton Jones, who wanted to
                    build a space where music lovers can come together and experience music together
                    in a whole new way.
                  </p>
                </div>
              </div>
              <DialogFooter className="px-6 pb-4">
                <DialogClose asChild>
                  <Button variant="secondary" className="w-full">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <div className="mx-6 p-4 text-sm bg-white/10 flex items-center justify-center rounded-lg mb-4">
          <FlipWords words={words} className="text-white" />
        </div>

        <CardFooter>
          <CreatePost email={userInfo.email}>
            <Button className="w-full bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold">
              <Plus className="mr-2" size={24} />
              Add a Recommendation
            </Button>
          </CreatePost>
        </CardFooter>
      </Card>
    </div>
  );
}
