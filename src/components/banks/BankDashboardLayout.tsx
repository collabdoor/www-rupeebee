"use client"
import React, { useState } from "react";
import Image from "next/image";
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
import { BankHeader } from "./BankHeader";

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
            {open ? <Logo user={user} /> : <LogoIcon user={user} />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div
                  key={idx}
                  onClick={(e) => handleLinkClick(idx, e)}
                  className={`cursor-pointer rounded-lg transition-all ${
                    (activeTab === 'overview' && idx === 0) ||
                    (activeTab === 'upload' && idx === 1) ||
                    (activeTab === 'modules' && idx === 2)
                      ? 'bg-blue-100 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                      : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  <div className={`${open ? 'p-3' : 'p-2 flex justify-center'}`}>
                    <SidebarLink link={link} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={onLogout}
              className={`flex items-center p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all w-full text-left ${
                open ? 'gap-2 justify-start' : 'justify-center'
              }`}
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
          {/* Use the new BankHeader */}
          <BankHeader user={user} activeTab={activeTab} />
          
          {children}
        </div>
      </div>
    </div>
  );
};

const Logo = ({ user }: { user: SupabaseUser | null }) => {
  const bankName = user?.user_metadata?.bank_name || 'Bank Portal';
  
  return (
    <div>
      <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <Image src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/psbpsb.png" alt="Bank Logo" width={32} height={32} />
      </div>
      <div className="font-bold text-black dark:text-white whitespace-pre">
        Punjab & Sind Bank
      </div>
    </div>
  );
};

const LogoIcon = ({ user }: { user?: SupabaseUser | null }) => {
  const bankName = user?.user_metadata?.bank_name || 'Bank Portal';
  
  return (
    <div className="font-normal flex justify-center items-center text-sm text-black py-1 relative z-20">
      <div className="h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex-shrink-0 flex items-center justify-center">
        <Image src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/psbpsb.png" alt="Bank Logo" width={32} height={32} />
      </div>
    </div>
  );
};

export default BankDashboardLayout;