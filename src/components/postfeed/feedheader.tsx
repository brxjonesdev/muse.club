import React from 'react';

export default function FeedHeader() {
  return (
    <header className="bg-gradient-to-r from-cyan-400 to-sky-500  text-black tracking-tight min-h-[275px] flex  w-full rounded-b-xl">
      <div className="max-w-2xl w-full fixed top-0 bg-gradient-to-r from-cyan-400 to-sky-500 text-black border-b-[1.75px] border-black px-4 py-2 z-10 ">
        <h1 className="text-xl font-bold">Monday, January 3rd, 2024</h1>
        <p className="text-sm">27 Songs Reccomenended Today</p>
      </div>

      <div className="mt-auto px-4 py-4">
        <p className="text-black text-3xl font-bold">Welcome to Muse.Club</p>
        <p className="text-black text-md ">Discover new music and share your favorites</p>
      </div>
    </header>
  );
}
