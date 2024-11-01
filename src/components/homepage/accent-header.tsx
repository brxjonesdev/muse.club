'use client';
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/providers/app-store-provider';

export default function AccentHeader() {
  const { totalRecommendations, fetchRecommndationTotal } = useAppStore((state) => state);
  const today = new Date();

  React.useEffect(() => {
    fetchRecommndationTotal();
  }, [fetchRecommndationTotal]);
  return (
    <Card
      className=" rounded-none rounded-b-lg min-h-[150px] md:min-h-[300px] flex flex-col  items-start  justify-end  bg-gradient-to-r from-blue-200 to-cyan-200 "
      suppressHydrationWarning
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-md lg:text-lg text-black">
          Welcome to <br />
          <span className="text-5xl lg:text-6xl font-bold">Harmoniq</span>
        </CardTitle>
        <CardDescription className="text-black/70 font-bold">
          {today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
      </CardHeader>
      <div className="flex w-full lg:justify-end px-6 pb-3">
        <p className="bg-black/80 p-2 text-xs rounded-sm font-bold">
          {totalRecommendations} songs reccomened so far!
        </p>
      </div>
    </Card>
  );
}
