'use client';
import MobileNav from '@/components/mobilenavigation';
import Feed from '@/components/postfeed/feed';
import UserInfo from '@/components/userinfo';

export default function MuseClubHomePage() {
  {
    /*
    Check In:
    - Finis up the user info component
    - seed data for the application
    - add auth to the user info component
    + User should be able to see their profile picture, username, and number of recommendations
    + User should be a ble to view their feeds even if they are not logged in
    + User should be able to see the feeds of other users
    - CRUD operations for posts

  */
  }
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

  const sampleUserInfo: UserInfo = {
    isLoggedIn: false,
    username: 'basshead',
    avatarUrl: '/profile_1.jpg',
    notifications: 3,
    friends: [
      {
        id: 1,
        avatarUrl: '/profile_2.jpg',
      },
      {
        id: 2,
        avatarUrl: '/profile_3.jpg',
      },
      {
        id: 3,
        avatarUrl: '/profile_4.jpg',
      },
    ],
  };

  return (
    <section className="flex gap-4 min-w-full justify-center">
      <UserInfo userInfo={sampleUserInfo} />
      <Feed />
      <MobileNav />
    </section>
  );
}
