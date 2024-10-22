'use client';
import React, { useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PostDetails from './postdetails';
import { Dialog } from '@/components/ui/dialog';

type PostProps = {
  name: string;
  profilePicture: string;
  username: string;
  postedAt: string;
  videoURL: string;
  videoThumbnail: string;
  songTitle: string;
  songArtist: string;
  caption: string;
}

export default function Post({
  name,
  profilePicture,
  username,
  postedAt,
  videoURL,
  videoThumbnail,
  songTitle,
  songArtist,
  caption,

} : PostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Card className="w-full  bg-[#161616] text-gray-100 border-none">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage alt="User's profile picture" src={profilePicture} />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{username}</h3>
                <p className="text-sm text-gray-400">
  {new Date(postedAt).toLocaleString()}
</p>

              </div>
            </div>
          </div>
        </CardHeader>
        <div className="relative aspect-video cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <img
            alt="Video thumbnail"
            className="object-cover w-full h-full"
            height="225"
            src={videoThumbnail}
            style={{
              aspectRatio: '400/225',
              objectFit: 'cover',
            }}
            width="400"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Play className="w-16 h-16 text-white" />
          </div>
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">
            {songTitle} by {songArtist}
          </h2>
          <p className="text-sm text-gray-300">{caption}</p>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <PostDetails
          songTitle={songTitle}
          artistName={songArtist}
          videoURL={videoURL}
          caption={caption}
        />
      </Dialog>
    </>
  );
}
