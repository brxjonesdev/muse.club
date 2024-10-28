'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import CreatePost from '@/components/homepage/create-post';
import { useAppStore } from '@/providers/app-store-provider';

export default function UserActionBar() {
  const { setUserID } = useAppStore((state) => state);
  const userInfo = {
    name: 'Irene',
    profilePicture: '',
  };

  React.useEffect(() => {
    setUserID(userInfo.name);
  }, [setUserID, userInfo.name]);
  return (
    <Card className=" h-fit flex items-center justify-center ">
      <CardHeader className="flex flex-row items-center gap-4 p-2 md:px-4 w-full">
        <div>
          <Avatar className="w-12 h-12">
            <AvatarImage src={userInfo.profilePicture} />
            <AvatarFallback>{userInfo.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-2">
          <CardTitle>{userInfo.name}</CardTitle>
          <Link href="/user/userIDGOESHERE">
            <CardDescription className="hover:underline">View Profile</CardDescription>
          </Link>
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
