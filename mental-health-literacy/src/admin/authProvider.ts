import type { AuthProvider } from 'react-admin';
import supabase from '../lib/supabase';

const authProvider: AuthProvider = {
  login: async (params) => {
    try {
      const { data, error } = await supabase().auth.signInWithPassword({
        email: params.email || params.username, // Handle both email and username
        password: params.password
      });
      
      if (error) {
        console.error('Login error:', error.message);
        throw new Error(error.message);
      }
      
      if (!data.user) {
        throw new Error('No user returned from login');
      }
      
      // Check if user has admin role
      const userRole = data.user.app_metadata?.role;
      
      if (userRole !== 'admin') {
        await supabase().auth.signOut(); // Sign out non-admin user
        throw new Error('Access denied. Admin privileges required.');
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error('Login failed:', error);
      return Promise.reject(error);
    }
  },

  logout: async () => {
    const { error } = await supabase().auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
      throw new Error(error.message);
    }
    return Promise.resolve();
  },

  checkAuth: async () => {
    const { data: { user }, error } = await supabase().auth.getUser();
    
    if (error || !user) {
      return Promise.reject('Not authenticated');
    }
    
    // Check if user has admin role
    const userRole = user.app_metadata?.role;
    if (userRole !== 'admin') {
      return Promise.reject('Admin privileges required');
    }
    
    return Promise.resolve();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const { data: { user }, error } = await supabase().auth.getUser();
    
    if (error || !user) {
      throw new Error('User not authenticated');
    }
    
    // Verify admin role
    const userRole = user.app_metadata?.role;
    if (userRole !== 'admin') {
      throw new Error('Admin privileges required');
    }
    
    return {
      id: user.id,
      fullName: user.user_metadata?.full_name || user.email,
      avatar: user.user_metadata?.avatar_url,
      role: userRole,
    };
  },

  getPermissions: () => Promise.resolve(''),
};

export default authProvider;