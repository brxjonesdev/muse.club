import Feed from '@/components/postfeed/feed';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import CreatePost from '@/components/createpost';


export default async function MuseClubHomePage() {
  return (
    <main className="h-dvh flex flex-col w-full md:max-w-5xl gap-y-4">
     
      <section className="w-full px-4 flex  gap-6 overflow-y-scroll flex-col md:flex-row ">
        <section className='w-full  flex flex-col gap-4'>
      <Card className=" rounded-none rounded-b-lg min-h-[200px] md:min-h-[300px] flex flex-col  items-start  justify-end  bg-gradient-to-r from-blue-200 to-cyan-200 ">
          <CardHeader className="pb-3">
            <CardTitle className="text-md lg:text-lg text-black">
              Welcome to <br />
              <span className="text-5xl lg:text-6xl font-bold">MuseClub</span>
            </CardTitle>
            <CardDescription className="text-black/70 font-bold">
              Thursday, October 24th 2024
            </CardDescription>
          </CardHeader>
          <div className="flex w-full lg:justify-end px-6 pb-3">
            <p className="bg-black/80 p-2 text-xs rounded-sm font-bold">
              17703 songs reccomened so far!
            </p>
          </div>
        </Card>
        <Card className=" h-fit flex items-center justify-center ">
          <CardHeader className="flex flex-row items-center gap-4 p-2 md:px-4 w-full">
            <div>
              <Avatar className="w-12 h-12">
                <AvatarImage src="" />
                <AvatarFallback>I</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <CardTitle>Irene</CardTitle>
              <Link href="/user/userIDGOESHERE">
                <CardDescription className="hover:underline">View Profile</CardDescription>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="gap-4 flex justify-center  p-2 items-center md:w-full">
            
            {/* <Dialog>
  <DialogTrigger asChild><Button className="w-full ">Post a song</Button></DialogTrigger>
  <DialogContent  className='p-3'>
    <DialogHeader className='p-0 space-y-4'>
      <div className='h-[100px] bg-gradient-to-r from-blue-200 to-cyan-200 rounded-md '/>
      <DialogTitle>Reccomend a Song</DialogTitle>
      <Separator/>
    </DialogHeader>
    <section className='space-y-2'>
      <Label htmlFor="songTitle">Youtube URL</Label>
      <Input/>
    </section>
    <Button className='w-full mt-2'>Submit</Button>
  </DialogContent>
</Dialog> */}
<CreatePost>
  <Button className="w-full ">Post a song</Button>
</CreatePost>

          
          </CardContent>
        </Card>
        </section>
        <Separator orientation="vertical" className="hidden md:block" />

        <div className="h-full w-full  overflow-y-scroll py-4">
          <Feed />
        </div>
      </section>
    </main>
  );
}
