import React from 'react';

export default function FeedHeader({ posts }: { posts: number }) {
  return (
    <header className="bg-gradient-to-r from-blue-200 to-cyan-200   text-black tracking-tight min-h-[275px] flex  w-full rounded-b-xl">
      <div className="max-w-2xl w-full fixed top-0 bg-gradient-to-r from-blue-200 to-cyan-200  text-black border-b-[1.75px] border-black px-4 py-2 z-10 ">
        <h1 className="text-xl font-bold">
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </h1>
        <p className="text-sm">
          {posts} {posts === 1 ? 'rec' : 'recs'} today so far
        </p>
      </div>

      <div className="mt-auto px-4 py-4">
        <p className="text-black text-3xl font-bold">Welcome to Muse.Club</p>
        <p className="text-black text-md ">Discover new music and share your favorites</p>
      </div>
    </header>
  );
}
