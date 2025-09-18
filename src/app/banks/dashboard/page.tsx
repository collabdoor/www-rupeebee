'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getModulesByBank, signOut, BankLearningModule, type User } from '@/lib/supabase';
import ModuleUploadForm from '@/components/banks/ModuleUploadForm';
import ModuleListTable from '@/components/banks/ModuleListTable';
import DashboardStats from '@/components/banks/DashboardStats';
import { BankDashboardLayout } from '@/components/banks/BankDashboardLayout';
import { 
  ListProvider, 
  ListGroup, 
  ListHeader, 
  ListItems, 
  ListItem
} from '@/components/ui/kibo-ui/list';

export default function BankDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [modules, setModules] = useState<BankLearningModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'modules'>('overview');
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const { user, error } = await getCurrentUser();
      
      if (error || !user) {
        router.push('/banks/login');
        return;
      }

      // Verify bank role
      if (user.user_metadata?.role !== 'bank') {
        router.push('/banks/login');
        return;
      }

      setUser(user);
      await loadModules(user.user_metadata?.bank_name);
    } catch {
      router.push('/banks/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loadModules = async (bankName?: string) => {
    try {
      const { data, error } = await getModulesByBank(bankName);
      if (data && !error) {
        setModules(data);
      }
    } catch (error) {
      console.error('Error loading modules:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/banks/login');
  };

  const refreshModules = () => {
    if (user) {
      loadModules(user.user_metadata?.bank_name);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <BankDashboardLayout
      user={user}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <DashboardStats modules={modules} />
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Modules</h3>
              {modules.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No modules uploaded yet. Start by creating your first learning module!</p>
              ) : (
                <ListProvider onDragEnd={() => {}} className="h-auto">
                  <ListGroup id="recent-modules">
                    <ListHeader name="Recent Modules" color="#3b82f6" />
                    <ListItems>
                      {modules.slice(0, 5).map((module, index) => (
                        <ListItem
                          key={module.id}
                          id={module.id}
                          name={module.title}
                          index={index}
                          parent="recent-modules"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{module.title}</h4>
                              <p className="text-sm text-gray-600">{module.category} • {module.language}</p>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                module.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {module.is_published ? 'Published' : 'Draft'}
                              </span>
                              <span>{module.views_count} views</span>
                            </div>
                          </div>
                        </ListItem>
                      ))}
                    </ListItems>
                  </ListGroup>
                </ListProvider>
              )}
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div>
            <ModuleUploadForm 
              bankName={user?.user_metadata?.bank_name || user?.email}
              onSuccess={refreshModules}
            />
          </div>
        )}

        {activeTab === 'modules' && (
          <div>
            <ModuleListTable 
              modules={modules} 
              onModuleUpdate={refreshModules}
            />
          </div>
        )}
      </div>
    </BankDashboardLayout>
  );
}