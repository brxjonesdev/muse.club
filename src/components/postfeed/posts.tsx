import Post from './post';

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

export default function Posts() {
  const posts: PostProps[] = [
    // {
    //   profilePicture: 'profile_1.jpg',
    //   username: 'basshead',
    //   timeAgo: '2h ago',
    //   upvotes: 667,
    //   videoURL: 'https://videosite.com/video_1',
    //   videoThumbnail: 'https://videosite.com/thumbnail_1.jpg',
    //   songTitle: 'Mountain Echoes',
    //   artistName: 'BeatSmith',
    //   caption: "Can't stop listening to this track!",
    // },
  ];

  return (
    <main className="flex-grow p-6 bg-white/5 relative">
      <div className="h-full flex flex-col gap-4 ">
        {posts.length === 0 && (
            <div className="flex-grow flex items-center justify-center h-full">
                <p className="text-gray-300">No posts to show</p>
            </div>
        )}
        {posts.map((post) => (
          <Post
            key={post.videoURL}
            profilePicture={post.profilePicture}
            username={post.username}
            timeAgo={post.timeAgo}
            upvotes={post.upvotes}
            videoURL={post.videoURL}
            videoThumbnail={post.videoThumbnail}
            songTitle={post.songTitle}
            artistName={post.artistName}
            caption={post.caption}
          />
        ))}
      </div>
    </main>
  );
}
