'use client';

import { useState } from 'react';
import { BankLearningModule, updateModule, deleteModule } from '@/lib/supabase';
import { 
  TableProvider, 
  TableHeader, 
  TableHeaderGroup, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  TableColumnHeader,
  type ColumnDef 
} from '@/components/ui/kibo-ui/table';

interface ModuleListTableProps {
  modules: BankLearningModule[];
  onModuleUpdate: () => void;
}

export default function ModuleListTable({ modules, onModuleUpdate }: ModuleListTableProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleTogglePublish = async (module: BankLearningModule) => {
    setIsUpdating(module.id);
    try {
      await updateModule(module.id, { is_published: !module.is_published });
      onModuleUpdate();
    } catch (error) {
      console.error('Error updating module:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (moduleId: string) => {
    if (!confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      return;
    }

    setIsUpdating(moduleId);
    try {
      await deleteModule(moduleId);
      onModuleUpdate();
    } catch (error) {
      console.error('Error deleting module:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  const columns: ColumnDef<BankLearningModule>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Module" />
      ),
      cell: ({ row }) => {
        const module = row.original;
        return (
          <div>
            <div className="text-sm font-medium text-gray-900">{module.title}</div>
            <div className="text-sm text-gray-500">{module.content_type} • {module.language}</div>
            <div className="text-xs text-gray-400 mt-1">
              Created: {new Date(module.created_at).toLocaleDateString()}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const module = row.original;
        return (
          <div>
            <div className="text-sm text-gray-900">{module.category}</div>
            <div className="text-xs text-gray-500">{module.difficulty_level}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "is_published",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const module = row.original;
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            module.is_published 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {module.is_published ? 'Published' : 'Draft'}
          </span>
        );
      },
    },
    {
      accessorKey: "views_count",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Engagement" />
      ),
      cell: ({ row }) => {
        const module = row.original;
        return (
          <div className="text-sm text-gray-500 space-y-1">
            <div>{module.views_count} views</div>
            <div>{module.completion_count} completions</div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {module.rating.toFixed(1)}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const module = row.original;
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleTogglePublish(module)}
              disabled={isUpdating === module.id}
              className={`text-sm font-medium ${
                module.is_published
                  ? 'text-yellow-600 hover:text-yellow-900'
                  : 'text-green-600 hover:text-green-900'
              } disabled:opacity-50`}
            >
              {isUpdating === module.id ? 'Updating...' : (module.is_published ? 'Unpublish' : 'Publish')}
            </button>
            
            <button
              onClick={() => handleDelete(module.id)}
              disabled={isUpdating === module.id}
              className="text-sm font-medium text-red-600 hover:text-red-900 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  if (modules.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No modules yet</h3>
        <p className="text-gray-600 mb-6">Start by creating your first learning module to educate users about your banking products and services.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <TableProvider data={modules} columns={columns}>
        <TableHeader>
          {({ headerGroup }) => (
            <TableHeaderGroup headerGroup={headerGroup}>
              {({ header }) => (
                <TableHead header={header} />
              )}
            </TableHeaderGroup>
          )}
        </TableHeader>
        <TableBody>
          {({ row }) => (
            <TableRow row={row}>
              {({ cell }) => (
                <TableCell cell={cell} />
              )}
            </TableRow>
          )}
        </TableBody>
      </TableProvider>
    </div>
  );
}