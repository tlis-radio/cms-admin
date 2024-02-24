'use client';
import Navbar from '@/components/navbar';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const ManagementLayout = ({ children, }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className='flex flex-row justify-center h-full pt-[70px] pl-[50px] sm:pl-[80px] w-full mt-4'>
        <div className='bg-white p-4 w-full sm:w-3/4 md:w-2/4 mx-1 sm:mx-0'>
          {children}
        </div>
      </div>
    </>
  );
};

export default withPageAuthRequired(ManagementLayout);
