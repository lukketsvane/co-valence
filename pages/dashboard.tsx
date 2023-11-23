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
        <div className=" justify-center items-start pt-4"> 
          <div className=''></div>
            <ChatBox title={`Welcome to Your Dashboard, ${userName}`} initialMessages={[]} />
      </div>
    </Layout>
  );
}