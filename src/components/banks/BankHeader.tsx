"use client"
import React from "react";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type User as SupabaseUser } from '@supabase/supabase-js';

interface BankHeaderProps {
  user: SupabaseUser | null;
  activeTab: string;
}

export const BankHeader = ({ user, activeTab }: BankHeaderProps) => {
  const getPageTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Dashboard';
      case 'upload': return 'Upload Module';
      case 'modules': return 'My Modules';
      default: return 'Dashboard';
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case 'overview': return 'Welcome to your learning portal dashboard';
      case 'upload': return 'Create and upload new learning modules';
      case 'modules': return 'Manage your existing learning modules';
      default: return 'Welcome to your learning portal dashboard';
    }
  };

  return (
    <div className="mb-8 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-700 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Bank Logo Placeholder */}
          <div className="h-16 w-16 rounded-lg border-2 border-gray-200 dark:border-neutral-700 bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {user?.user_metadata?.bank_name?.slice(0, 2).toUpperCase() || 'BK'}
            </span>
          </div>

          {/* Page Title Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {getPageTitle()}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {getPageDescription()}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1 font-medium">
              {user?.user_metadata?.bank_name || 'Bank Portal'}
            </p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="outline"
            size="sm"
            className="relative p-2 h-10 w-10"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
            <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <div className="text-sm">
              <div className="font-medium text-gray-900 dark:text-white">
                {user?.user_metadata?.bank_name || 'Bank Admin'}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankHeader;