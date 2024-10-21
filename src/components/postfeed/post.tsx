'use client';
import React, { useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PostDetails from './postdetails';
import { Dialog } from '@/components/ui/dialog';

type PostProps = {
  profilePicture: string;
  username: string;
  timeAgo: string;
  upvotes: number;
  videoURL: string;
  videoThumbnail: string;
  songTitle: string;
  artistName: string;
  caption: string;
};

export default function Post({
  profilePicture,
  username,
  timeAgo,
  upvotes,
  videoURL,
  videoThumbnail,
  songTitle,
  artistName,
  caption,
}: PostProps) {
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
                <p className="text-sm text-gray-400">{timeAgo}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-300">{upvotes}</span>
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
            {songTitle} by {artistName}
          </h2>
          <p className="text-sm text-gray-300">{caption}</p>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <PostDetails
          songTitle={songTitle}
          artistName={artistName}
          videoURL={videoURL}
          caption={caption}
        />
      </Dialog>
    </>
  );
}
