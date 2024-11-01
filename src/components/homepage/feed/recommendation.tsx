'use client';

import React, { useState } from 'react';
import { EllipsisVertical, Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RecommendationsDetails from './recommendations-details';
import { useAppStore } from '@/providers/app-store-provider';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

type PostProps = {
  id: string;
  created_at: string;
  youtube_url: string;
  youtube_thumbnail: string;
  song_artist: string;
  song_title: string;
  user_caption: string;
  poster: string;
};

export default function Recommendation({
  id,
  created_at: postedAt,
  youtube_url: videoURL,
  youtube_thumbnail: videoThumbnail,
  song_artist: songArtist,
  song_title: songTitle,
  user_caption: caption,
  poster,
}: PostProps) {
  const supabase = createClient();
  const { userID, editRecommendation, deleteRecommendation } = useAppStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [posterName, setPosterName] = useState('');
  const [posterProfilePicture, setPosterProfilePicture] = useState('');
  const [editedSongTitle, setEditedSongTitle] = useState(songTitle);
  const [editedSongArtist, setEditedSongArtist] = useState(songArtist);
  const [editedCaption, setEditedCaption] = useState(caption);

  const handleDeleteRecommendation = async () => {
    const { error } = await supabase.from('recommendations').delete().eq('id', id);
    if (error) {
      console.error('Error deleting recommendation:', error);
    } else {
      setIsDeleteModalOpen(false);
      deleteRecommendation(id);
    }
  }

  const handleEditRecommendation = async () => {
    const { error } = await supabase
      .from('recommendations')
      .update({
        song_title: editedSongTitle,
        song_artist: editedSongArtist,
        user_caption: editedCaption
      })
      .eq('id', id);
    if (error) {
      console.error('Error updating recommendation:', error);
    } else {
      setIsEditModalOpen(false);
      editRecommendation(id, {
        song_title: editedSongTitle,
        song_artist: editedSongArtist,
        user_caption: editedCaption
      });
    }
  }

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      const { data, error } = await supabase.from('users').select().eq('user_id', poster);
      if (error) {
        console.error('Error fetching user details:', error);
      }
      if (data && data.length) {
        const user = data[0];
        setPosterName(user.username);
        setPosterProfilePicture(user.profile_photo);
      }
    }
    fetchUserDetails();
  }, [poster, supabase]);

  return (
    <>
      <Card className="w-full">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage alt="User's profile picture" src={posterProfilePicture} />
                <AvatarFallback>{posterName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{posterName}</h3>
                <p className="text-xs text-gray-400">{new Date(postedAt).toLocaleString()}</p>
              </div>
            </div>
            {poster === userID && (
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-black/20 dark:hover:bg-white/20 rounded-full py-1">
                  <EllipsisVertical className="h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-geist-mono">
                  <DropdownMenuLabel className="font-geist-sans">Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>Delete</DropdownMenuItem>
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

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Recommendation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="songTitle" className="text-sm font-medium">Song Title</label>
              <Input
                id="songTitle"
                value={editedSongTitle}
                onChange={(e) => setEditedSongTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="songArtist" className="text-sm font-medium">Song Artist</label>
              <Input
                id="songArtist"
                value={editedSongArtist}
                onChange={(e) => setEditedSongArtist(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="caption" className="text-sm font-medium">Caption</label>
              <Textarea
                id="caption"
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleEditRecommendation}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this recommendation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteRecommendation}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}