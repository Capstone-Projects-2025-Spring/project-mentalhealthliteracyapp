import type { AuthProvider } from 'react-admin';
import supabase from '../lib/supabase';

const authProvider: AuthProvider = {
  login: async (params) => {
    console.log('Login attempt with params:', params);
    
    try {
      const { data, error } = await supabase().auth.signInWithPassword({
        email: params.email || params.username, // Handle both email and username
        password: params.password
      });
      
      console.log('Supabase login response:', { data, error });
      
      if (error) {
        console.error('Supabase login error:', error);
        throw new Error(error.message);
      }
      
      if (!data.user) {
        throw new Error('No user returned from login');
      }
      
      console.log('Login successful for user:', data.user.email);
      return Promise.resolve();
    } catch (error) {
      console.error('Login failed:', error);
      return Promise.reject(error);
    }
  },

  logout: async () => {
    console.log('Logout attempt');
    const { error } = await supabase().auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      throw new Error(error.message);
    }
    return Promise.resolve();
  },

  checkAuth: async () => {
    const { data: { user }, error } = await supabase().auth.getUser();
    
    if (error || !user) {
      console.log('Auth check failed:', error);
      return Promise.reject('Not authenticated');
    }
    
    console.log('Auth check passed for user:', user.email);
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
    
    return {
      id: user.id,
      fullName: user.user_metadata?.full_name || user.email,
      avatar: user.user_metadata?.avatar_url,
    };
  },

  getPermissions: () => Promise.resolve(''),
};

export default authProvider;