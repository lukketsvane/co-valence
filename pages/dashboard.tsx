import React from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/layout';
import ChatBox from '@/components/dashboard/chatbox'; // Import the ChatBox component
import '@/app/globals.css';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied. Please log in.</div>;
  }

  const userName = session.user?.name || 'User'; // Provide a default value

  return (
    <Layout>
      <div className='h-screen pt-22 '>
    <div className=" w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
    <div className="flex justify-center items-start pt-16 px-4 md:px-8 lg:px-16">
      <div className="w-full justify-center max-w-2xl">
        <ChatBox title="" initialMessages={[]} /> {/* Include ChatBox here */}
      </div>
    </div>
    </div>
  </Layout>
  );
}