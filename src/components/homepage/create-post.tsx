/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/client';
import { Separator } from '../ui/separator';
import { useAppStore } from '@/providers/app-store-provider';

export default function CreatePost({ children }: { children: React.ReactNode}) {
  const { userID, addRecommendation } = useAppStore((state) => state);
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [videoDetails, setVideoDetails] = useState({
    thumbnail: '',
    songName: '',
    songArtist: '',
    caption: '',
  });

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const videoId = youtubeLink.split('v=')[1]; // Extract video ID from the URL
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // Fetch from env variable
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const video = data.items[0].snippet; // Get the video details

      setVideoDetails({
        thumbnail: video.thumbnails.high.url,
        songName: video.title,
        songArtist: video.channelTitle,
        caption: '', // Initialize with an empty caption
      });
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setVideoDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSongPost = async (e: React.FormEvent) => {
    e.preventDefault();

    const songData = {
      id: '', // Add a unique ID here if necessary
      created_at: new Date().toISOString(),
      likes: "0",
      youtube_url: youtubeLink,
      youtube_thumbnail: videoDetails.thumbnail,
      song_title: videoDetails.songName,
      song_artist: videoDetails.songArtist,
      user_caption: videoDetails.caption,
      poster: userID,
    };
    // check if all fields are filled
    if (
      !songData.youtube_url ||
      !songData.song_title ||
      !songData.song_artist ||
      !songData.user_caption
    ) {
      alert('Please fill all fields');
      return;
    }

    console.log(songData);

    const { error } = await supabase.from('recommendations').insert([songData]);
    if (error) {
      console.error('Error adding song recommendation:', error);
    } else {
      setOpen(false);
      addRecommendation(songData);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setYoutubeLink('');
        setVideoDetails({
          thumbnail: '',
          songName: '',
          songArtist: '',
          caption: '',
        });
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => {
          setOpen(!open);
        }}
      >
        {children}
      </DialogTrigger>

      <DialogContent className="p-4 max-h-[90%] overflow-y-scroll">
        <DialogHeader className="p-2 space-y-4">
          <DialogTitle>Reccomend a Song</DialogTitle>
          <Separator />
          {!videoDetails.thumbnail ? (
            <form onSubmit={handleLinkSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="youtube-link">YouTube Link</Label>
                <Input
                  id="youtube-link"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  className="bg-[#242424] border-gray-700 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="  text-black font-semibold w-3/4">
                  Search Video
                </Button>
                <Button
                  type="button"
                  variant={'outline'}
                  onClick={() => setOpen(false)}
                  className="w-1/4   font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <form onSubmit={handleSongPost} className="space-y-4 overflow-y-scroll">
                <div className="space-y-2">
                  <img
                    src={videoDetails.thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-fit  rounded-md "
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="songName">Song Name</Label>
                  <Input
                    id="songName"
                    value={videoDetails.songName}
                    onChange={handleInputChange}
                    className="bg-[#242424] border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="songArtist">Song Artist</Label>
                  <Input
                    id="songArtist"
                    value={videoDetails.songArtist}
                    onChange={handleInputChange}
                    className="bg-[#242424] border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caption">Why do you love this song?</Label>
                  <textarea
                    id="caption"
                    value={videoDetails.caption}
                    onChange={handleInputChange}
                    className="w-full h-24 px-3 py-2 text-white bg-[#242424] border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <Button type="submit" className="w-full  text-black font-semibold">
                  Add Recommendation
                </Button>
              </form>
            </>
          )}
        </DialogHeader>
        <div className="h-[10px] bg-gradient-to-r from-blue-200 to-cyan-200 rounded-md " />
      </DialogContent>
    </Dialog>
  );
}
