import React from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/layout';
import '@/app/globals.css';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied. Please log in.</div>;
  }

  // Use optional chaining (?.) to safely access user and name
  const userName = session.user?.name || 'User'; // Provide a default value

  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard, {userName}</h1>
        {/* Dashboard content goes here */}
      </div>
    </Layout>
  );
}
