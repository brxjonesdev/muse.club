'use client';
import React, { useState } from 'react';
import { EllipsisVertical, Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RecommendationsDetails from './recommendations-details';
import { useAppStore } from '@/providers/app-store-provider';
import Image from 'next/image';

type PostProps = {
  postedAt: string;
  videoURL: string;
  videoThumbnail: string;
  songTitle: string;
  songArtist: string;
  caption: string;
  posterID: string;
  posterName: string;
  posterProfilePicture: string;
};

export default function Recommendation({
  postedAt,
  videoURL,
  videoThumbnail,
  songTitle,
  songArtist,
  caption,
  posterID,
  posterName,
  posterProfilePicture,
}: PostProps) {
  const { userID } = useAppStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Card className="w-full">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage alt="User's profile picture" src={posterProfilePicture} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{posterName}</h3>
                <p className="text-xs text-gray-400">{new Date(postedAt).toLocaleString()}</p>
              </div>
            </div>
            {posterID == userID && (
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-black/20 dark:hover:bg-white/20 rounded-full py-1">
                  <EllipsisVertical className="h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-geist-mono">
                  <DropdownMenuLabel className="font-geist-sans">Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        <div
          className="relative aspect-video cursor-pointer p-2 m-4 "
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={videoThumbnail}
            alt="Video thumbnail"
            layout="fill"
            objectFit="cover"
            className="rounded-md "
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 bg-opacity-50">
            <Play className="w-16 h-16 text-white" />
          </div>
        </div>
        <CardContent className="p-4">
          <h2 className=" md:text-xl font-bold mb-2">
            {songTitle} by {songArtist}
          </h2>
          <div className="space-y-1">
            <h3 className="font-semibold">About this song:</h3>
            <p className="text-gray-600 text-sm">{caption}</p>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <RecommendationsDetails
          songTitle={songTitle}
          artistName={songArtist}
          videoURL={videoURL}
          caption={caption}
          posterName={posterName}
          posterProfilePicture={posterProfilePicture}
        />
      </Dialog>
    </>
  );
}
