import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PostProps {
  songTitle: string;
  artistName: string;
  videoURL: string;
  caption: string;
}

export default function PostDetails({ songTitle, artistName, videoURL, caption }: PostProps) {
  return (
    <DialogContent className="max-w-2xl bg-[#161616] text-gray-100 h-[95%] flex flex-col border-none p-0">
      <div className="bg-gradient-to-r from-cyan-400 to-sky-500 min-h-[50px] flex items-center px-6 rounded-t-md">
        <DialogTitle className="font-bold text-black/70">New Recommendation</DialogTitle>
      </div>
      <div className="px-6 flex flex-col h-full gap-4">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold">{songTitle}</DialogTitle>
          <DialogDescription className="text-gray-400">by {artistName}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow">
          <video className="w-full h-full" controls src={videoURL} />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2">Caption</h3>
          <p className="text-sm text-gray-300">{caption}</p>
        </div>
      </div>
    </DialogContent>
  );
}
