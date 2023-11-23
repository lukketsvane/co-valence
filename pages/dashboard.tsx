// dashboard.tsx

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/layout';
import ChatBox from '@/components/dashboard/chatbox';
import Sidebar, { Agent } from '@/components/dashboard/sidebar'; // Import the Sidebar component and Agent interface
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

  const handleAgentSelect = (agent: Agent) => { // Use the Agent type here
    setSystemMessage(agent.systemMessage);
  };

  return (
    <Layout>
      <div className="flex">
        <Sidebar onAgentSelect={handleAgentSelect} />
        <main className="main-content flex-1">
          <ChatBox title={`Welcome to Your Dashboard, ${userName}`} systemMessage={systemMessage} initialMessages={[]} />
        </main>
      </div>
    </Layout>
  );
}
