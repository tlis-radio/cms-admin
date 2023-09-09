'use client';
import Navbar from '@/components/navbar';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const ManagementLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
        <Navbar />
        <div className='flex flex-row justify-center h-full pt-[70px] pl-[50px] sm:pl-[80px] w-full mt-4'>
          {children}
        </div>
    </>
  );
};

export default withPageAuthRequired(ManagementLayout);
