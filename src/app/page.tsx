'use client';
import Navbar from '@/components/navbar';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const Home = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        <Navbar />
        <div className="pt-20">
          Home
        </div>
      </>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}

export default withPageAuthRequired(Home);