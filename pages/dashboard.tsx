import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/layout';
import ChatBox from '@/components/dashboard/chatbox';
import Sidebar, { Agent } from '@/components/dashboard/sidebar'; // Make sure to import the Agent type
import '@/app/globals.css';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [systemMessage, setSystemMessage] = useState('');
  const [selectedAgentName, setSelectedAgentName] = useState('Wordle'); // Default to 'Wordle' or the first agent

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied. Please log in.</div>;
  }

  const userName = session.user?.name || 'User';

  // Add the Agent type to the agent parameter
  const handleAgentSelect = (agent: Agent) => {
    setSystemMessage(agent.systemMessage);
    setSelectedAgentName(agent.name); // Update the selected agent name
  };

  return (
    <Layout>
      <div className="flex">
        {/* Pass the selectedAgentName to the Sidebar */}
        <Sidebar onAgentSelect={handleAgentSelect} selectedAgentName={selectedAgentName} />
        <main className="main-content flex-1">
          <ChatBox title={`Welcome to Your Dashboard, ${userName}`} systemMessage={systemMessage} initialMessages={[]} />
        </main>
      </div>
    </Layout>
  );
}
