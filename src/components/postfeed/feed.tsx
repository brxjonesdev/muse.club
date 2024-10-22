import React from 'react';
import FeedHeader from './feedheader';
import Posts from './posts';
import { createClient } from '@/utils/supabase/server';

export default async function Feed() {
  const supabase = createClient();
  async function getFeed() {
    const { data: feed, error } = await supabase
  .from('recommendations')
  .select(`
    *,
    users (
      name,
      email,
      profile_photo
    )
  `);
    if (error) {
      throw error;
    }
   return feed;
  }

  const feed = await getFeed();

  //  Get the number of posts made today so far
  const postsToday = feed.filter((post) => {
    const postDate = new Date(post.created_at);
    const today = new Date();
    return (
      postDate.getDate() === today.getDate() &&
      postDate.getMonth() === today.getMonth() &&
      postDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="min-h-screen flex flex-col w-full max-w-2xl overflow-y-auto min-w-[400px]">
      <FeedHeader posts={postsToday.length} />
      <Posts feed={feed} />
    </div>
  );
}
