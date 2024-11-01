'use client';
import React from 'react';
import { useAppStore } from '@/providers/app-store-provider';
import Recommendation from './recommendation';

export default function Feed() {
  const { fetchRecommendations, feedStatus, recommendations } = useAppStore((state) => state); // Destructure the necessary state and actions from the store

  React.useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);
  console.log(recommendations);
  return (
    <main className="flex-grow relative h-full">
      {feedStatus.loading && (
        <div className="h-full w-full rounded-lg flex items-center justify-center text-lg font-bold text-center flex-col gap-4">
          <p className="text-xl font-bold">Loading...</p>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      {feedStatus.error && (
        <div className="bg-gradient-to-t from-rose-500 to-red-800 h-full w-full rounded-lg flex items-center justify-center text-lg font-bold text-center">
          Something went wrong:
          <br /> &quot;{feedStatus.error}&quot;
        </div>
      )}
      {!feedStatus.loading &&
        !feedStatus.error &&
        recommendations &&
        recommendations.length === 0 && (
          <div className="bg-white/10 h-full w-full rounded-lg flex items-center justify-center text-lg font-bold text-center">
            No recommendations available.
          </div>
        )}
      {!feedStatus.loading &&
        !feedStatus.error &&
        recommendations &&
        recommendations.length > 0 && (
          <div className="w-full flex flex-col gap-4">
            {recommendations
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((recommendation) => (
                <Recommendation
                  key={recommendation.id}
                  id={recommendation.id}
                  created_at={recommendation.created_at}
                  youtube_url={recommendation.youtube_url}
                  youtube_thumbnail={recommendation.youtube_thumbnail}
                  song_title={recommendation.song_title}
                  song_artist={recommendation.song_artist}
                  user_caption={recommendation.user_caption}
                  poster={recommendation.poster}
                />
                // <div>Recommendation Component</div>
              ))}
          </div>
        )}
    </main>
  );
}
