'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getModulesByBank, signOut, BankLearningModule } from '@/lib/supabase';
import ModuleUploadForm from '@/components/banks/ModuleUploadForm';
import ModuleListTable from '@/components/banks/ModuleListTable';
import DashboardStats from '@/components/banks/DashboardStats';

export default function BankDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [modules, setModules] = useState<BankLearningModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'modules'>('overview');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
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
    } catch (error) {
      router.push('/banks/login');
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg mr-3"></div>
              <h1 className="text-xl font-semibold text-gray-900">Bank Learning Portal</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user?.user_metadata?.bank_name || user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['overview', 'upload', 'modules'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition duration-200 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'overview' ? 'Dashboard' : tab === 'upload' ? 'Upload Module' : 'My Modules'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              <DashboardStats modules={modules} />
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Modules</h3>
              <div className="space-y-4">
                {modules.slice(0, 5).map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
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
                ))}
                {modules.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No modules uploaded yet. Start by creating your first learning module!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload New Module</h2>
            <ModuleUploadForm 
              bankName={user?.user_metadata?.bank_name || user?.email}
              onSuccess={refreshModules}
            />
          </div>
        )}

        {activeTab === 'modules' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Learning Modules</h2>
            <ModuleListTable 
              modules={modules} 
              onModuleUpdate={refreshModules}
            />
          </div>
        )}
      </main>
    </div>
  );
}