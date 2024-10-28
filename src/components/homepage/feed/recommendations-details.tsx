import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import YouTubeEmbed from './youtube-embed';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostProps {
  songTitle: string;
  artistName: string;
  videoURL: string;
  caption: string;
  posterName: string;
  posterProfilePicture: string;
}

export default function RecommendationsDetails({
  songTitle,
  artistName,
  videoURL,
  caption,
  posterName,
  posterProfilePicture,
}: PostProps) {
  return (
    <DialogContent className="max-w-2xl p-0">
      <div className="bg-gradient-to-r from-blue-200 to-cyan-200  min-h-[50px] flex items-center px-6 rounded-t-md">
        <DialogTitle className="font-bold text-black/70">New Recommendation</DialogTitle>
      </div>
      <div className="px-6 flex flex-col h-full gap-4">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold">{songTitle}</DialogTitle>
          <DialogDescription className="text-gray-400">by {artistName}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow">
          <YouTubeEmbed url={videoURL} />
        </div>
        <div className="flex  text-xs font-bold items-center gap-1">
          <p>Reccomended By:</p>
          <Avatar className="w-5 h-5">
            <AvatarImage src={posterProfilePicture} />
            <AvatarFallback>{posterName[0]}</AvatarFallback>
          </Avatar>
          <p>{posterName}</p>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2">About this song</h3>
          <p className="text-sm text-gray-300">{caption}</p>
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
  );
}
