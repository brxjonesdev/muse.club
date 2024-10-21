import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreatePost() {
  const [youtubeLink, setYoutubeLink] = useState('')
  const [videoDetails, setVideoDetails] = useState(null)

  const handleLinkSubmit = async (e) => {
    e.preventDefault()
    // In a real application, you would make an API call to fetch video details
    // For this example, we'll simulate it with a timeout
    setTimeout(() => {
      setVideoDetails({
        thumbnail: '/placeholder.svg?height=180&width=320',
        songName: 'Example Song',
        songArtist: 'Example Artist',
        caption: 'This is an example caption for the video.'
      })
    }, 1000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold">
          <Plus className="mr-2" size={24} />
          Add a Recommendation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#161616] text-gray-100 sm:max-h-[95%] flex flex-col border-none p-0">
        <div className="bg-gradient-to-r from-cyan-400 to-sky-500 min-h-[50px] flex items-center px-6 rounded-t-md">
          <DialogTitle className="font-bold text-black/70">New Recommendation</DialogTitle>
        </div>
        <div className="px-6 py-4 flex flex-col h-full gap-4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Post a Song</DialogTitle>
          </DialogHeader>
          {!videoDetails ? (
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
              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold">
                Search Video
              </Button>
            </form>
          ) : (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <img
                  src={videoDetails.thumbnail}
                  alt="Video thumbnail"
                  className="w-full max-w-md mx-auto rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="song-name">Song Name</Label>
                <Input
                  id="song-name"
                  value={videoDetails.songName}
                  className="bg-[#242424] border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="song-artist">Song Artist</Label>
                <Input
                  id="song-artist"
                  value={videoDetails.songArtist}
                  className="bg-[#242424] border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <textarea
                  id="caption"
                  value={videoDetails.caption}
                  className="w-full h-24 px-3 py-2 text-white bg-[#242424] border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold">
                Add Recommendation
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}