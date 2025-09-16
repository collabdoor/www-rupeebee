"use client"
import React, { useState } from "react";
import {
  Home,
  Upload,
  BookOpen,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { type User as SupabaseUser } from '@supabase/supabase-js';
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar";

type TabType = 'overview' | 'upload' | 'modules';

interface BankDashboardLayoutProps {
  children: React.ReactNode;
  user: SupabaseUser | null;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

export const BankDashboardLayout = ({ 
  children, 
  user, 
  activeTab, 
  onTabChange, 
  onLogout 
}: BankDashboardLayoutProps) => {
  const [open, setOpen] = useState(false);

  const links: Links[] = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Upload Module",
      href: "#",
      icon: (
        <Upload className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Modules",
      href: "#",
      icon: (
        <BookOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const handleLinkClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const tabMap: TabType[] = ['overview', 'upload', 'modules'];
    onTabChange(tabMap[index]);
  };

  return (
    <div className="rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo user={user} /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div
                  key={idx}
                  onClick={(e) => handleLinkClick(idx, e)}
                  className={`cursor-pointer rounded-lg p-2 transition-all ${
                    (activeTab === 'overview' && idx === 0) ||
                    (activeTab === 'upload' && idx === 1) ||
                    (activeTab === 'modules' && idx === 2)
                      ? 'bg-blue-100 dark:bg-blue-900/20' 
                      : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all w-full text-left"
            >
              <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
              {open && (
                <span className="text-neutral-700 dark:text-neutral-200 text-sm">
                  Sign Out
                </span>
              )}
            </button>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {activeTab === 'overview' ? 'Dashboard' : 
                   activeTab === 'upload' ? 'Upload Module' : 
                   'My Modules'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {activeTab === 'overview' ? 'Welcome to your learning portal dashboard' :
                   activeTab === 'upload' ? 'Create and upload new learning modules' :
                   'Manage your existing learning modules'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4" />
                  <span>{user?.user_metadata?.bank_name || user?.email}</span>
                </div>
              </div>
            </div>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

const Logo = ({ user }: { user: SupabaseUser | null }) => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <div className="font-medium text-black dark:text-white whitespace-pre">
        {user?.user_metadata?.bank_name || 'Bank Portal'}
      </div>
    </div>
  );
};

const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </div>
  );
};

export default BankDashboardLayout;