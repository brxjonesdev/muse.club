import { Bell, Users, Settings, Music, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { FlipWords } from './ui/flip-words';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreatePost from './createpost';

type UserInfo = {
  isLoggedIn: boolean;
  username?: string;
  avatarUrl?: string;
  notifications?: number;
  friends?: Friend[];
};

type Friend = {
  id: number;
  avatarUrl: string;
};
type UserInfoProps = {
  userInfo: UserInfo;
};

export default function UserInfoCard({ userInfo }: UserInfoProps) {
  const { isLoggedIn, username, avatarUrl, notifications, friends } = userInfo;
  const words = [
    'Music is the universal language of mankind.<br>— Henry Wadsworth Longfellow',
    'Where words fail, music speaks.<br>— Hans Christian Andersen',
    'Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything.<br>— Plato',
    'Music is the divine way to tell beautiful, poetic things to the heart.<br>— Pablo Casals',
    'To share your music is to share your soul.<br>— Anonymous',
  ];

  return (
    <div className="min-h-screen xl:flex flex-col w-full max-w-[350px] mt-16 hidden">
      <Card className="bg-[#161616] border-none text-app-text">
        <CardHeader className="flex flex-row items-center gap-4">
          {isLoggedIn ? (
            <>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  alt={`${username}'s profile picture`}
                  src={avatarUrl || '/placeholder.svg?height=80&width=80'}
                />
                <AvatarFallback>{username ? username[0].toUpperCase() : 'UN'}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{username || 'User Name'}</CardTitle>
                <p className="text-sm text-muted-foreground">@{username}</p>
              </div>

              <Dialog>
                <DialogTrigger className="ml-auto">
                  <Music className="w-5 h-5 animate-bounce " />
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-[#161616] text-gray-100 h-fit flex flex-col border-none p-0">
                  <div className="bg-gradient-to-r from-cyan-400 to-sky-500 min-h-[50px] flex items-center px-6 rounded-t-md">
                    <DialogTitle className="font-bold text-black/70">
                      Muse.Club, <span className="text-sm"> from brxjonesdev.</span>
                    </DialogTitle>
                  </div>
                  <div className="pt-0 p-6 flex flex-col h-full gap-4">
                    <DialogHeader className="space-y-1">
                      <DialogTitle className="text-xl font-bold">What is Muse.Club?</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        To share your music is to share your soul.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <p>
                        We believe that music is more than just sound—it&apos;s the universal
                        language that connects us all. Our mission is to bring people together
                        through the shared love of authentic, handpicked music that resonates with
                        the soul.
                      </p>
                      <p>
                        Muse.Club was born out of a passion for discovering and celebrating
                        meaningful music. This project is a labor of love crafted by Braxton Jones,
                        who wanted to build a space where music lovers can come together and
                        experience music together in a whole new way.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">Welcome to Muse.Club</CardTitle>
              <CardDescription>
                <FlipWords words={words} className="text-white" />
              </CardDescription>
            </div>
          )}
        </CardHeader>

        {isLoggedIn && (
          <>
            <div className="mx-6 p-4 text-sm bg-white/10 flex items-center justify-center rounded-lg mb-4">
              <FlipWords words={words} className="text-white" />
            </div>
            <CardContent className="gap-2 flex flex-col">
              <div className="flex items-center gap-4">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">Notifications</div>
                <Badge variant="secondary">{notifications || 0}</Badge>
              </div>
              <div className="flex items-center gap-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">Friends</div>
                <div className="flex -space-x-2">
                  {friends?.slice(0, 4).map((friend, i) => (
                    <Avatar key={friend.id} className="border-2 border-background h-8 w-8">
                      <AvatarImage
                        alt={`Friend ${i + 1}`}
                        src={
                          friend.avatarUrl || `/placeholder.svg?height=32&width=32&text=F${i + 1}`
                        }
                      />
                      <AvatarFallback>F{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                  {friends && friends.length > 4 && (
                    <Avatar className="border-2 border-background h-8 w-8">
                      <AvatarFallback>+{friends.length - 4}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">Settings</div>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            </CardContent>
          </>
        )}

        <CardFooter>
          {isLoggedIn ? (
            <CreatePost/>
          ) : (
            <Button className="bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-semibold text-center w-full">
              Sign In / Sign Up
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
