import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';

export default async function SavedRecs() { 
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('User is not authenticated');
    return (
      <section className="w-full h-full p-4 rounded-lg overflow-y-scroll">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full overflow-y-scroll">
          <p>User is not authenticated</p>
        </div>
      </section>
    );
  }

  const { data, error } = await supabase.from('recommendations').select().eq('poster', user.id);
  if (error) {
    console.error('Error getting recommendations:', error);
  }

  return (
    <section className="w-full h-full  rounded-lg overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full overflow-y-scroll">
        {data && data.map((rec) => {
          const { id, youtube_url, youtube_thumbnail, song_title, song_artist, user_caption } = rec;
          return (
            <Card key={id} className="w-full max-w-sm overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <Link href={youtube_url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={youtube_thumbnail}
                    alt={`${song_title} by ${song_artist}`}
                    width={480}
                    height={360}
                    className="w-full h-auto object-cover"
                  />
                </Link>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <Link
                  href={youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-lg hover:underline inline-flex items-center gap-2"
                >
                  {song_title}
                </Link>
                <p className="text-sm text-muted-foreground">{song_artist}</p>
              </CardContent>
              {user_caption && (
                <CardFooter className="px-4 py-3 bg-muted">
                  <p className="text-sm italic">&quot;{user_caption}&quot;</p>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
