import React from 'react';
import FeedHeader from './feedheader';
import Posts from './posts';

export default function Feed() {
  return (
    <div className="min-h-screen flex flex-col w-full max-w-2xl overflow-y-auto min-w-[400px]">
      <FeedHeader />
      <Posts />
    </div>
  );
}
