// Import the Agent interface from the sidebar component file
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/layout';
import ChatBox from '@/components/home/chatbox';
import Sidebar, { Agent } from '@/components/dashboard/sidebar'; // Import the Sidebar component and the Agent interface
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

  // Correctly type the 'agent' parameter
  const handleAgentSelect = (agent: Agent) => {
    setSystemMessage(agent.systemMessage);
    setSelectedAgentName(agent.name); // Update the selected agent name
  };

  return (
    <Layout>
      <div className="flex">
        <Sidebar onAgentSelect={handleAgentSelect} selectedAgentName={selectedAgentName} />
        <main className="main-content flex-1">
          <ChatBox title={`Welcome to Your Dashboard, ${userName}`} systemMessage={systemMessage} initialMessages={[]} />
        </main>
      </div>
    </Layout>
  );
}