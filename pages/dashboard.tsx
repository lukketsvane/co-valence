import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/layout';
import ChatBox from '@/components/dashboard/chatbox';
import Sidebar from '@/components/dashboard/sidebar'; // Import the Sidebar component
import '@/app/globals.css';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [systemMessage, setSystemMessage] = useState('');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied. Please log in.</div>;
  }

  const userName = session.user?.name || 'User';

  const handleAgentSelect = (agent) => {
    setSystemMessage(agent.systemMessage);
  };

  return (
    <Layout>
      <div className="flex">
        <Sidebar onAgentSelect={handleAgentSelect} />
        <div className=" justify-center items-start pt:-14"> 
          {/* Pass the systemMessage to ChatBox */}
          <ChatBox title={`Welcome to Your Dashboard, ${userName}`} systemMessage={systemMessage} initialMessages={[]} />
        </div>
      </div>
    </Layout>
  );
}
