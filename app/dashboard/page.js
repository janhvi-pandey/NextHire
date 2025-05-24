'use client';

import Sidebar from '@/components/Sidebar';
import JobList from '@/components/JobList';
import ViewProfile from '@/components/ViewProfile';
import EditProfile from '@/components/EditProfile';
import { useState } from 'react';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('jobs');

  // Mock user data
  const user = {
    name: 'John Doe',
    location: 'New York',
    experience: 5,
    skills: ['React', 'Node.js', 'Tailwind CSS'],
    preferredJobType: 'Remote',
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'jobs':
        return <JobList />;
      case 'view-profile':
        return <ViewProfile user={user} />;
      case 'edit-profile':
        return <EditProfile user={user} />;
      default:
        return <JobList />;
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen text-white"
      style={{
        background:
          'linear-gradient(to bottom, #121212, #262626)', 
      }}
    >
      {/* Sidebar */}
      <div className="lg:w-1/5 border-r border-yellow-500/40">
        <Sidebar user={user} setActiveSection={setActiveSection} />
      </div>

      {/* Main content*/}
      <main className="lg:w-4/5 p-6 bg-black bg-opacity-60">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-6">
          {activeSection === 'jobs'
            ? 'Land your dream job now !'
            : activeSection === 'view-profile'
            ? 'Your Profile'
            : activeSection === 'edit-profile'
            ? 'Edit Your Profile'
            : ''}
        </h1>

        {renderContent()}
      </main>
    </div>
  );
}
