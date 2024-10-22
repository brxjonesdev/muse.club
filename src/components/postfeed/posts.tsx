import Post from './post';

// Define the types for a User and a Post
interface User {
  profile_photo: string;
  email: string
  name: string;
}

interface PostData {
  youtube_url: string;
  youtube_thumbnail: string;
  created_at: string;
  song_title: string;
  song_artist: string;
  user_caption: string;
  users: User; // Nested user object
}

// Define the props for the Posts component
interface PostsProps {
  feed: PostData[];
}

export default function Posts({ feed }: PostsProps) {
  console.log(feed, 'feed');

  return (
    <main className="flex-grow p-6 bg-white/5 relative">
      <div className="h-full flex flex-col gap-4 ">
        {feed.length === 0 && (
          <div className="flex-grow flex items-center justify-center h-full">
            <p className="text-gray-300">No posts to show</p>
          </div>
        )}
        {feed
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) // Sort posts by creation time
        .map((post) => (
          <Post
            key={post.youtube_url} 
             // Use 'youtube_url' as a unique key
             name={post.users.name}  // Access user's name from 'users' object
            profilePicture={post.users.profile_photo}  // Access user's profile photo
            username={post.users.email.replace('@gmail.com', '')}  // Access user's name from 'users' object // User's profile photo
            postedAt={post.created_at}  // Post's creation time
            videoURL={post.youtube_url}  // YouTube video URL
            videoThumbnail={post.youtube_thumbnail}  // YouTube video thumbnail
            songTitle={post.song_title}  // Song title
            songArtist={post.song_artist}  // Song artist
            caption={post.user_caption}  // User's caption
          />
        ))}
      </div>
    </main>
  );
}
