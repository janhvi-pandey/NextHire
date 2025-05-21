'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMediaQuery } from 'react-responsive';
import { HiOutlineMenu } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function Sidebar({ user, setActiveSection }) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const router = useRouter();

  const SidebarContent = () => {
    return (
      <div className="flex flex-col bg-[#121212] text-yellow-400 h-full p-6">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/defaultUser.png"
            alt="User Avatar"
            className="rounded-full w-24 h-24 mb-4 object-cover border-2 border-yellow-400"
          />
          <h2 className="text-lg font-semibold text-white">{user?.name || 'Guest'}</h2>
        </div>

        <nav className="flex flex-col gap-3">
          <Button
            variant="ghost"
            className="justify-start text-white hover:bg-gray-500"
            onClick={() => setActiveSection('jobs')}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-white hover:bg-gray-500"
            onClick={() => setActiveSection('view-profile')}
          >
            View Profile
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-white hover:bg-gray-500"
            onClick={() => setActiveSection('edit-profile')}
          >
            Edit Profile
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-white hover:bg-gray-500 mt-auto"
            onClick={() => router.push('/')}
          >
            Home
          </Button>
        </nav>
      </div>
    );
  };

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Open Menu" className="p-2 text-yellow-400">
            <HiOutlineMenu size={28} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-[#121212] text-yellow-400">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <aside className="w-full h-screen sticky top-0 border-r border-yellow-500/40">
      <SidebarContent />
    </aside>
  );
}
