"use client"
import React, { useState } from "react";
import {
  Home,
  Upload,
  BookOpen,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronsRight,
  Bell,
  User,
  LogOut,
  LucideIcon,
} from "lucide-react";

type TabType = 'overview' | 'upload' | 'modules';

interface BankDashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  user: any;
  onLogout: () => void;
}

interface OptionProps {
  Icon: LucideIcon;
  title: string;
  selected: TabType;
  setSelected: (tab: TabType) => void;
  open: boolean;
  itemKey: TabType;
}

interface TitleSectionProps {
  open: boolean;
  user: any;
}

interface ToggleCloseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const BankDashboardLayout = ({ 
  children, 
  user, 
  activeTab, 
  onTabChange, 
  onLogout 
}: BankDashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full bg-gray-50 text-gray-900">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          user={user}
          onLogout={onLogout}
        />
        <div className="flex-1 bg-gray-50 overflow-auto">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {activeTab === 'overview' ? 'Dashboard' : 
                     activeTab === 'upload' ? 'Upload Module' : 
                     'My Modules'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {activeTab === 'overview' ? 'Welcome to your learning portal dashboard' :
                     activeTab === 'upload' ? 'Create and upload new learning modules' :
                     'Manage your existing learning modules'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="relative p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
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
    </div>
  );
};

const Sidebar = ({ activeTab, onTabChange, user, onLogout }: SidebarProps) => {
  const [open, setOpen] = useState(true);

  const menuItems = [
    {
      icon: Home,
      title: "Dashboard",
      key: "overview" as TabType,
    },
    {
      icon: Upload,
      title: "Upload Module",
      key: "upload" as TabType,
    },
    {
      icon: BookOpen,
      title: "My Modules",
      key: "modules" as TabType,
    },
  ];

  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? 'w-64' : 'w-16'
      } border-gray-200 bg-white p-2 shadow-sm`}
    >
      <TitleSection open={open} user={user} />

      <div className="space-y-1 mb-8">
        {menuItems.map((item) => (
          <Option
            key={item.key}
            Icon={item.icon}
            title={item.title}
            selected={activeTab}
            setSelected={onTabChange}
            open={open}
            itemKey={item.key}
          />
        ))}
      </div>

      {open && (
        <div className="border-t border-gray-200 pt-4 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            Account
          </div>
          <button
            onClick={onLogout}
            className="relative flex h-11 w-full items-center rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <div className="grid h-full w-12 place-content-center">
              <LogOut className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium transition-opacity duration-200">
              Sign Out
            </span>
          </button>
        </div>
      )}

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, itemKey }: OptionProps) => {
  const isSelected = selected === itemKey;
  
  return (
    <button
      onClick={() => setSelected(itemKey)}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected 
          ? "bg-blue-50 text-blue-700 shadow-sm border-l-2 border-blue-500" 
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      
      {open && (
        <span
          className={`text-sm font-medium transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {title}
        </span>
      )}
    </button>
  );
};

const TitleSection = ({ open, user }: TitleSectionProps) => {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div className={`transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900">
                    {user?.user_metadata?.bank_name || 'Bank Portal'}
                  </span>
                  <span className="block text-xs text-gray-500">
                    Learning Portal
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-blue-600 to-green-600 shadow-sm">
      <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
        <span className="text-blue-600 font-bold text-sm">B</span>
      </div>
    </div>
  );
};

const ToggleClose = ({ open, setOpen }: ToggleCloseProps) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-200 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 text-gray-500 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
        {open && (
          <span
            className={`text-sm font-medium text-gray-600 transition-opacity duration-200 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Hide
          </span>
        )}
      </div>
    </button>
  );
};

export default BankDashboardLayout;