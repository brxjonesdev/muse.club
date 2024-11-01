/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import CreatePost from '@/components/homepage/create-post';
import { useAppStore } from '@/providers/app-store-provider';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function UserActionBar() {
  const { setUserID } = useAppStore((state) => state);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [profileImage, setProfileImage] = React.useState('');
  const supabase = createClient();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      setIsLoggedIn(false);
      setFullName('');
      setProfileImage('');
    }
  };

  const checkUserInDatabase = async (user: User) => {
    // we will check if there is a user in the database
    const { data, error } = await supabase.from('users').select().eq('user_id', user.id);
    if (error) {
      console.error('Error getting user:', error);
    }
    if (data && !data.length) {
      // if there is no user in the database, we will add them
      const { error } = await supabase.from('users').insert([
        {
          user_id: user.id,
          name: user.user_metadata.full_name,
          profile_photo: user.user_metadata.avatar_url,
          username: user.user_metadata.full_name.replace(/\s/g, ''),
        },
      ]);
      if (error) {
        console.error('Error adding user:', error);
      }
    }
  };

  React.useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setFullName(user.user_metadata.full_name);
        setProfileImage(user.user_metadata.avatar_url);
        setIsLoggedIn(true);
        setUserID(user.id);
      }
      // if there is no user, do nothing
      // we need to check if that user is in the database
      if (user) {
        checkUserInDatabase(user);
      }
    };

    checkUser();
  }, [isLoggedIn]); // Only re-run when `isLoggedIn` changes

  if (!isLoggedIn) {
    return (
      <>
        <Button onClick={handleLogin} className="w-full" variant={'outline'}>
          Login
        </Button>
      </>
    );
  }

  return (
    <Card className=" h-fit flex items-center justify-center ">
      <CardHeader className="flex flex-row items-center gap-4 p-2 md:px-4 w-full">
        <div>
          {profileImage && (
            <Avatar className="w-12 h-12">
              <AvatarImage src={profileImage} />
              <AvatarFallback>{fullName[0]}</AvatarFallback>
            </Avatar>
          )}
        </div>
        <div className="space-y-2">
          <CardTitle>{fullName}</CardTitle>
          <div className="flex gap-2">
            <Link href="/user/userIDGOESHERE">
              <CardDescription className="hover:underline">View Profile</CardDescription>
            </Link>
            <CardDescription onClick={handleLogout} className="hover:underline cursor-pointer">
              Logout
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="gap-4 flex justify-center  p-2 items-center md:w-full">
        <CreatePost>
          <Button className="w-full ">Post a song</Button>
        </CreatePost>
      </CardContent>
    </Card>
  );
}
