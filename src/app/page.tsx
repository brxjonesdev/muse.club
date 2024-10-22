import MobileNav from '@/components/mobilenavigation';
import Feed from '@/components/postfeed/feed';
import UserInfo from '@/components/userinfo';

export default async function MuseClubHomePage() {
  return (
    <section className="flex gap-4 min-w-full justify-center">
      <UserInfo />
      <Feed />
      <MobileNav />
    </section>
  );
}
