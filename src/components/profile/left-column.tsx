import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

export default function LeftColumn() {
  return (
    <div className="h-full md:w-1/3 md:overflow-y-scroll space-y-3 flex flex-col pb-4">
        <Link href="/" className='w-fit'>
        <Button variant={"ghost"} className="w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back</Button>
        </Link>
          <Card className=" h-fit p-0">
            <CardHeader className="flex flex-row items-center gap-4 p-2">
              <div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback>I</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1 text-sm">
                <CardTitle>Irene</CardTitle>
                <CardDescription className="hover:underline text-xs">627 Reccomendations</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card className=" h-full hidden md:block">
            <CardHeader>
            
                <CardTitle>About MuseClub</CardTitle>
                <CardDescription>made with love by brxjonesdev</CardDescription>
                <Separator/>
                <CardContent className="space-y-4 p-0">
  <p className="text-sm">
    Made to bring people together
    through the shared love of authentic, handpicked music. Connect, discover, and share music that
    resonates with your soul.
  </p>

  <p className="text-sm">
    Music is more than just sound—it&apos;s a universal language. I hope you find joy in Muse.Club and
    the experiences it creates.
  </p>

  <p className="text-sm">
    You can explore more of my work and reach out to me on my website at{' '}
    <a href="https://portfolio.braxtonjones.dev/" className="text-purple-400">
      braxtonjonesdev
    </a>
    .
  </p>
</CardContent>
        
            </CardHeader>
          </Card>
        </div>
  )
}
