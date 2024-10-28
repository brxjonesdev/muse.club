import React from 'react';

interface YouTubeEmbedProps {
  url: string; // YouTube video URL
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  // Function to extract the video ID from the YouTube URL
  const getVideoID = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  const videoID = getVideoID(url);

  if (!videoID) {
    return <div>Invalid YouTube URL</div>; // Handle invalid URLs
  }

  const embedUrl = `https://www.youtube.com/embed/${videoID}`;

  return (
    <div className="p-2 bg-white/10 rounded">
      <iframe
        className="w-full rounded-xl"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
