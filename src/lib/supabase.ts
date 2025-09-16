import { createClient, User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// For server-side operations (admin functions)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Re-export User type for convenience
export type { User };

// Types for the bank learning modules
export interface BankLearningModule {
  id: string;
  title: string;
  description: string | null;
  category: 'Investment' | 'Insurance' | 'Government Schemes' | 'Netbanking' | 'Other';
  content_type: 'Article' | 'PDF' | 'Interactive Quiz' | 'Video Link';
  content_url: string | null;
  quiz_questions: QuizQuestion[];
  language: string;
  is_published: boolean;
  bank_name: string | null;
  bank_logo_url: string | null;
  estimated_duration: number;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  views_count: number;
  completion_count: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface UserModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  completion_date: string | null;
  score: number | null;
  time_spent: number;
  rating: number | null;
  created_at: string;
  updated_at: string;
}

// Auth helper functions
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string, metadata?: Record<string, unknown>) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata || {}
    }
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Module CRUD operations
export const createModule = async (moduleData: Omit<BankLearningModule, 'id' | 'created_at' | 'updated_at' | 'views_count' | 'completion_count' | 'rating'>) => {
  const { data, error } = await supabase
    .from('bank_learning_modules')
    .insert([moduleData])
    .select()
    .single();
  
  return { data, error };
};

export const updateModule = async (id: string, moduleData: Partial<BankLearningModule>) => {
  const { data, error } = await supabase
    .from('bank_learning_modules')
    .update(moduleData)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deleteModule = async (id: string) => {
  const { error } = await supabase
    .from('bank_learning_modules')
    .delete()
    .eq('id', id);
  
  return { error };
};

export const getModulesByBank = async (bankName?: string) => {
  let query = supabase
    .from('bank_learning_modules')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (bankName) {
    query = query.eq('bank_name', bankName);
  }
  
  const { data, error } = await query;
  return { data, error };
};

export const getPublishedModules = async (filters?: {
  category?: string;
  language?: string;
  search?: string;
}) => {
  let query = supabase
    .from('bank_learning_modules')
    .select('*')
    .eq('published', true);

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.language) {
    query = query.eq('language', filters.language);
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  return { data, error };
};

// File upload helpers
export const uploadFile = async (file: File, bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  
  return { data, error };
};

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
};

// Progress tracking
export const getUserProgress = async (userId: string, moduleId: string) => {
  const { data, error } = await supabase
    .from('user_module_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .single();
  
  return { data, error };
};

export const updateUserProgress = async (userId: string, moduleId: string, progressData: Partial<UserModuleProgress>) => {
  const { data, error } = await supabase
    .from('user_module_progress')
    .upsert({
      user_id: userId,
      module_id: moduleId,
      ...progressData
    })
    .select()
    .single();
  
  return { data, error };
};

export const incrementModuleViews = async (moduleId: string) => {
  const { error } = await supabase.rpc('increment_module_views', {
    module_uuid: moduleId
  });
  
  return { error };
};
