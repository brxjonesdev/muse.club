import { Separator } from '@/components/ui/separator';
import AccentHeader from '@/components/homepage/accent-header';
import UserActionBar from '@/components/homepage/user-action-bar';
import Feed from '@/components/homepage/feed/feed';

export default async function MuseClubHomePage() {
  return (
    <main className="h-dvh flex flex-col w-full md:max-w-5xl gap-y-4">
      <section className="w-full px-4 flex  gap-6 overflow-y-scroll flex-col md:flex-row h-full ">
        <div className="w-full  flex flex-col gap-4">
          <AccentHeader />
          <UserActionBar />
        </div>
        <Separator orientation="vertical" className="hidden md:block" />
        <div className="h-full w-full  overflow-y-scroll py-4">
          <Feed />
        </div>
      </section>
    </main>
  );
}
