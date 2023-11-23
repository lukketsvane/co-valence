
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/layout';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (!session) {
    // Redirect to login or show an error message
    return <div>Access Denied. Please log in.</div>;
  }

  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard, {session.user.name}</h1>
        {/* Dashboard content goes here */}
      </div>
    </Layout>
  );
}
