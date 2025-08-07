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
  } else if (resource === 'categoryPreferences') {
    return data.map(item => ({
      ...item,
      id: `${item.categoryId}_${item.preferenceId}`, // Create composite id
    }));
  } else if (resource === 'videoCategories') {
    return data.map(item => ({
      ...item,
      id: `${item.videoId}_${item.categoryId}`, // Create composite id
    }));
  }
  return data;
};

// Enhanced data provider that handles composite key tables
const dataProvider = {
  ...baseDataProvider,
  
  getManyReference: async (resource: string, params: any) => {
    // For tables with composite keys, we need to handle sorting differently
    const compositeKeyTables = ['userPreferences', 'userInteractions', 'categoryPreferences', 'videoCategories'];
    
    if (compositeKeyTables.includes(resource)) {
      // Remove the default 'id' sort if it exists
      if (params.sort && params.sort.field === 'id') {
        // Use a different field for sorting based on the table
        if (resource === 'userPreferences') {
          params.sort.field = 'preference_id';
        } else if (resource === 'userInteractions') {
          params.sort.field = 'videoId';
        } else if (resource === 'categoryPreferences') {
          params.sort.field = 'preferenceId';
        } else if (resource === 'videoCategories') {
          params.sort.field = 'videoId';
        }
      }
    }
    
    const response = await baseDataProvider.getManyReference(resource, params);
    
    // Add virtual id field for composite key tables
    if (compositeKeyTables.includes(resource)) {
      return {
        ...response,
        data: addVirtualId(response.data, resource),
      };
    }
    
    return response;
  },
  
  getList: async (resource: string, params: any) => {
    // Handle composite key tables
    const compositeKeyTables = ['userPreferences', 'userInteractions', 'categoryPreferences', 'videoCategories'];
    
    if (compositeKeyTables.includes(resource)) {
      if (params.sort && params.sort.field === 'id') {
        if (resource === 'userPreferences') {
          params.sort.field = 'preference_id';
        } else if (resource === 'userInteractions') {
          params.sort.field = 'videoId';
        } else if (resource === 'categoryPreferences') {
          params.sort.field = 'preferenceId';
        } else if (resource === 'videoCategories') {
          params.sort.field = 'videoId';
        }
      }
    }
    
    const response = await baseDataProvider.getList(resource, params);
    
    // Add virtual id field for composite key tables
    if (compositeKeyTables.includes(resource)) {
      return {
        ...response,
        data: addVirtualId(response.data, resource),
      };
    }
    
    return response;
  },
  
  getOne: async (resource: string, params: any) => {
    const compositeKeyTables = ['userPreferences', 'userInteractions', 'categoryPreferences', 'videoCategories'];
    
    if (compositeKeyTables.includes(resource)) {
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
    } else if (resource === 'categoryPreferences') {
      response.data.id = `${response.data.categoryId}_${response.data.preferenceId}`;
    } else if (resource === 'videoCategories') {
      response.data.id = `${response.data.videoId}_${response.data.categoryId}`;
    }
    
    return response;
  },
};

export default dataProvider;