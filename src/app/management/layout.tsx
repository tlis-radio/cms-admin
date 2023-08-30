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
        <div className='flex flex-row pt-[70px] pl-[80px]'>
            {children}
        </div>
    </>
  );
};

export default withPageAuthRequired(ManagementLayout);
