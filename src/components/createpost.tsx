'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function CreatePost({ children, email }: { children: React.ReactNode, email: string }) {
  const supabase = createClient();
  const router = useRouter();
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
      youtube_url: youtubeLink,
      youtube_thumbnail: videoDetails.thumbnail,
      song_title: videoDetails.songName,
      song_artist: videoDetails.songArtist,
      user_caption: videoDetails.caption,
      user: email
    };

    console.log(songData);

    const { data, error } = await supabase.from('recommendations').insert({
      youtube_thumbnail: songData.youtube_thumbnail,
      youtube_url: songData.youtube_url,
      song_title: songData.song_title,
      song_artist: songData.song_artist,
      user_caption: songData.user_caption,
      user: songData.user

    }
    );
    if (error) {
      console.error('Error inserting song:', error);
      return;
    } else{
      setOpen(false);
      router.refresh();

    }



  };

  return (
    <Dialog 
    open={open}
    onOpenChange={()=>{
      setYoutubeLink('');
      setVideoDetails({
        thumbnail: '',
        songName: '',
        songArtist: '',
        caption: '',
      });
    }}>
      <DialogTrigger asChild onClick={()=>{
        setOpen(!open);
      }}>{children}</DialogTrigger>
      
      <DialogContent className="max-w-2xl bg-[#161616] text-gray-100 sm:max-h-[95%] flex flex-col border-none p-0">
      <div className="bg-gradient-to-r from-cyan-400 to-sky-500 min-h-[50px] flex items-center px-6 rounded-t-md">
          <DialogTitle className="font-bold text-black/70">New Recommendation</DialogTitle>
        </div>
        <section className='px-6 py-4 flex flex-col gap-4 overflow-y-scroll'>
        <div className=" flex flex-col h-full gap-4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Post a Song</DialogTitle>
          </DialogHeader>
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
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold"
              >
                Search Video
              </Button>
            </form>
          ) : (<>
            <form onSubmit={handleSongPost} className="space-y-4">
              <div className="space-y-2">
                <img
                  src={videoDetails.thumbnail}
                  alt="Video thumbnail"
                  className="w-full  rounded-md aspect-video "
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
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold"
              >
                Add Recommendation
              </Button>

            </form>
          
          </>)}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={()=>{
              setOpen(false);
            }}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
        </section>
      </DialogContent>
      
    </Dialog>
  );
}

