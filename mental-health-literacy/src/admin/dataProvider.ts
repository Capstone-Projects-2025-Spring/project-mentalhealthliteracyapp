import { supabaseDataProvider } from 'ra-supabase';
import supabase from '../lib/supabase';

// Create the base Supabase data provider
const baseDataProvider = supabaseDataProvider({
  instanceUrl: import.meta.env.VITE_SUPABASE_URL,
  apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  supabaseClient: supabase(),
});

// Helper function to add virtual id to composite key tables
const addVirtualId = (data: any[], resource: string) => {
  if (resource === 'userPreferences') {
    return data.map(item => ({
      ...item,
      id: `${item.user_id}_${item.preference_id}`, // Create composite id
    }));
  } else if (resource === 'userInteractions') {
    return data.map(item => ({
      ...item,
      id: `${item.user_id}_${item.videoId}`, // Create composite id
    }));
  }
  return data;
};

// Enhanced data provider that handles composite key tables
const dataProvider = {
  ...baseDataProvider,
  
  getManyReference: async (resource: string, params: any) => {
    // For tables with composite keys, we need to handle sorting differently
    if (resource === 'userPreferences' || resource === 'userInteractions') {
      // Remove the default 'id' sort if it exists
      if (params.sort && params.sort.field === 'id') {
        // Use a different field for sorting based on the table
        if (resource === 'userPreferences') {
          params.sort.field = 'preference_id';
        } else if (resource === 'userInteractions') {
          params.sort.field = 'videoId';
        }
      }
    }
    
    const response = await baseDataProvider.getManyReference(resource, params);
    
    // Add virtual id field for composite key tables
    if (resource === 'userPreferences' || resource === 'userInteractions') {
      return {
        ...response,
        data: addVirtualId(response.data, resource),
      };
    }
    
    return response;
  },
  
  getList: async (resource: string, params: any) => {
    // Handle composite key tables
    if (resource === 'userPreferences' || resource === 'userInteractions') {
      if (params.sort && params.sort.field === 'id') {
        if (resource === 'userPreferences') {
          params.sort.field = 'preference_id';
        } else if (resource === 'userInteractions') {
          params.sort.field = 'videoId';
        }
      }
    }
    
    const response = await baseDataProvider.getList(resource, params);
    
    // Add virtual id field for composite key tables
    if (resource === 'userPreferences' || resource === 'userInteractions') {
      return {
        ...response,
        data: addVirtualId(response.data, resource),
      };
    }
    
    return response;
  },
  
  getOne: async (resource: string, params: any) => {
    if (resource === 'userPreferences' || resource === 'userInteractions') {
      // For composite keys, we can't use getOne directly
      // This would need special handling based on your needs
      console.warn(`getOne not fully supported for ${resource} with composite keys`);
    }
    
    const response = await baseDataProvider.getOne(resource, params);
    
    // Add virtual id if needed
    if (resource === 'userPreferences') {
      response.data.id = `${response.data.user_id}_${response.data.preference_id}`;
    } else if (resource === 'userInteractions') {
      response.data.id = `${response.data.user_id}_${response.data.videoId}`;
    }
    
    return response;
  },
};

export default dataProvider;