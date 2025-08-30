'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  MessageSquare,
  Star,
  Clock,
  Users,
  Search,
  Eye,
  Check,
  X,
  LogOut,
  Shield,
  Bell,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminFeedbackReview } from '@/types/reviews';
import { isTokenExpired } from '@/lib/auth';

interface AdminStats {
  total_reviews: number;
  pending_reviews: number;
  avg_rating: number;
  total_feedback: number;
  new_feedback: number;
}

interface DetailModalProps {
  item: AdminFeedbackReview | null;
  onClose: () => void;
  onUpdate: (id: string, type: 'review' | 'feedback', status: string, notes?: string) => void;
}

function DetailModal({ item, onClose, onUpdate }: DetailModalProps) {
  const [status, setStatus] = useState(item?.status || '');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setStatus(item.status);
      setNotes('');
    }
  }, [item]);

  if (!item) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(item.id, item.type, status, notes);
      onClose();
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const isReview = item.type === 'review';
  const reviewStatuses = ['pending', 'approved', 'rejected'];
  const feedbackStatuses = ['new', 'reviewed', 'in_progress', 'resolved', 'archived'];
  const availableStatuses = isReview ? reviewStatuses : feedbackStatuses;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-rupeebee-dark-text">
              {isReview ? 'Review Details' : `Feedback Details - ${item.id.slice(0, 8)}`}
            </h2>
            <button
              onClick={onClose}
              className="text-rupeebee-medium-text hover:text-rupeebee-dark-text"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-rupeebee-dark-text">User</Label>
                <p className="text-rupeebee-medium-text">
                  {item.user_identifier || 'Anonymous'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-rupeebee-dark-text">Date</Label>
                <p className="text-rupeebee-medium-text">
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {isReview && item.rating && (
              <div>
                <Label className="text-sm font-medium text-rupeebee-dark-text">Rating</Label>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= item.rating!
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {!isReview && item.category && (
              <div>
                <Label className="text-sm font-medium text-rupeebee-dark-text">Category</Label>
                <p className="text-rupeebee-medium-text">{item.category}</p>
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-rupeebee-dark-text">
                {isReview ? 'Review' : 'Message'}
              </Label>
              <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                <p className="text-rupeebee-dark-text whitespace-pre-wrap">{item.content}</p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-rupeebee-dark-text">Current Status</Label>
              <p className="text-rupeebee-medium-text capitalize">{item.status}</p>
            </div>

            {/* Actions */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-rupeebee-dark-text mb-4">Admin Actions</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status-select" className="text-sm font-medium text-rupeebee-dark-text">
                    Update Status
                  </Label>
                  <select
                    id="status-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rupeebee-medium-green focus:border-transparent"
                    aria-label="Update item status"
                  >
                    {availableStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="admin-notes" className="text-sm font-medium text-rupeebee-dark-text">
                    Admin Notes
                  </Label>
                  <textarea
                    id="admin-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add internal notes..."
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rupeebee-medium-green focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-rupeebee-medium-green hover:bg-rupeebee-dark-green text-white"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="border-gray-300 text-rupeebee-medium-text hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    total_reviews: 0,
    pending_reviews: 0,
    avg_rating: 0,
    total_feedback: 0,
    new_feedback: 0
  });
  const [data, setData] = useState<AdminFeedbackReview[]>([]);
  const [filteredData, setFilteredData] = useState<AdminFeedbackReview[]>([]);
  const [selectedItem, setSelectedItem] = useState<AdminFeedbackReview | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'review' | 'feedback'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const checkAuthentication = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    const expires = localStorage.getItem('admin_expires');

    if (!token || !expires || Date.now() > parseInt(expires)) {
      router.push('/admin/login');
      return;
    }

    // Check if token is expired using client-safe method
    if (isTokenExpired(token)) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_expires');
      router.push('/admin/login');
      return;
    }

    // Verify token with server
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      const result = await response.json();

      if (!result.valid) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_expires');
        router.push('/admin/login');
        return;
      }

      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.error('Authentication verification failed:', error);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_expires');
      router.push('/admin/login');
    }
  }, [router]);

  const loadStats = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });

      if (response.ok) {
        const statsData = await response.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  const loadData = useCallback(async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;
      const response = await fetch(`/api/admin/data?page=${currentPage}&type=${typeFilter}&status=${statusFilter}&search=${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (reset) {
          setData(result.data);
          setPage(2); // Set to 2 for next load
        } else {
          setData(prev => [...prev, ...result.data]);
          setPage(prev => prev + 1);
        }
        setHasMore(result.data.length === 50);
      } else {
        // If response is not ok, stop trying to load more
        setHasMore(false);
        console.error('Failed to load data:', response.status);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setHasMore(false); // Stop trying to load more on error
    }
  }, [page, typeFilter, statusFilter, searchTerm]);

  const filterData = useCallback(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.user_identifier && item.user_identifier.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [data, searchTerm, typeFilter, statusFilter]);

  const handleUpdateItem = async (id: string, type: 'review' | 'feedback', status: string, notes?: string) => {
    try {
      const endpoint = type === 'review' ? '/api/admin/reviews' : '/api/admin/feedback';
      const body: { id: string; status: string; notes?: string } = { id, status };
      if (notes) body.notes = notes;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        // Update local data
        setData(prev => prev.map(item => 
          item.id === id ? { ...item, status } : item
        ));
        loadStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_expires');
    router.push('/admin/login');
  };

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      new: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-600'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // useEffect hooks after all function declarations
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
      loadData(true); // Reset to first page when component mounts
    }
  }, [isAuthenticated, loadStats, loadData]);

  // Reload data when filters change
  useEffect(() => {
    if (isAuthenticated) {
      loadData(true); // Reset to first page when filters change
    }
  }, [typeFilter, statusFilter, searchTerm, isAuthenticated, loadData]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-rupeebee-light-beige flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rupeebee-medium-green"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-rupeebee-light-beige">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-rupeebee-medium-green" />
            <h1 className="text-2xl font-bold text-rupeebee-dark-text">
              RupeeBee Admin Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-rupeebee-medium-text">
              <Clock className="w-4 h-4" />
              <span>Session expires in {Math.floor((parseInt(localStorage.getItem('admin_expires') || '0') - Date.now()) / (1000 * 60 * 60))}h</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-rupeebee-medium-green text-rupeebee-medium-green hover:bg-rupeebee-medium-green hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rupeebee-dark-text">{stats.total_reviews}</p>
                <p className="text-sm text-rupeebee-medium-text">Total Reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rupeebee-dark-text">{stats.pending_reviews}</p>
                <p className="text-sm text-rupeebee-medium-text">Pending Reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rupeebee-dark-text">{stats.avg_rating.toFixed(1)}/5</p>
                <p className="text-sm text-rupeebee-medium-text">Avg Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rupeebee-dark-text">{stats.total_feedback}</p>
                <p className="text-sm text-rupeebee-medium-text">Total Feedback</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rupeebee-dark-text">{stats.new_feedback}</p>
                <p className="text-sm text-rupeebee-medium-text">New Feedback</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rupeebee-medium-text w-4 h-4" />
                <Input
                  placeholder="Search by content, email, category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:ring-rupeebee-medium-green focus:border-rupeebee-medium-green"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <Label className="text-sm text-rupeebee-medium-text">Type:</Label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as 'all' | 'review' | 'feedback')}
                  className="ml-2 px-3 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-rupeebee-medium-green"
                  aria-label="Filter by type"
                >
                  <option value="all">All</option>
                  <option value="review">Reviews</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <Label className="text-sm text-rupeebee-medium-text">Status:</Label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="ml-2 px-3 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-rupeebee-medium-green"
                  aria-label="Filter by status"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rupeebee-medium-text uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rupeebee-medium-text uppercase tracking-wider">
                    User Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rupeebee-medium-text uppercase tracking-wider">
                    Content Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rupeebee-medium-text uppercase tracking-wider">
                    Rating/Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rupeebee-medium-text uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rupeebee-medium-text uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rupeebee-medium-text uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.type === 'review' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-rupeebee-dark-text">
                      {item.user_identifier ? (
                        <span className="truncate max-w-[150px] block">
                          {item.user_identifier.length > 20 ? item.user_identifier.slice(0, 20) + '...' : item.user_identifier}
                        </span>
                      ) : (
                        'Anonymous'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-rupeebee-dark-text">
                      <div className="max-w-[300px] truncate">
                        {item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-rupeebee-dark-text">
                      {item.type === 'review' && item.rating ? (
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= item.rating!
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {item.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-rupeebee-medium-text">
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setSelectedItem(item)}
                          size="sm"
                          variant="outline"
                          className="border-rupeebee-medium-green text-rupeebee-medium-green hover:bg-rupeebee-medium-green hover:text-white"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        
                        {item.type === 'review' && item.status === 'pending' && (
                          <>
                            <Button
                              onClick={() => handleUpdateItem(item.id, 'review', 'approved')}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => handleUpdateItem(item.id, 'review', 'rejected')}
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                        
                        {item.type === 'feedback' && item.status === 'new' && (
                          <Button
                            onClick={() => handleUpdateItem(item.id, 'feedback', 'reviewed')}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-rupeebee-medium-text mx-auto mb-4" />
              <h3 className="text-lg font-medium text-rupeebee-dark-text mb-2">
                No data found
              </h3>
              <p className="text-rupeebee-medium-text">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}

          {filteredData.length > 0 && hasMore && (
            <div className="px-6 py-4 border-t border-gray-200">
              <Button
                onClick={() => loadData(false)}
                variant="outline"
                className="w-full border-rupeebee-medium-green text-rupeebee-medium-green hover:bg-rupeebee-medium-green hover:text-white"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpdate={handleUpdateItem}
      />
    </div>
  );
}
