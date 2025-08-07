# Class Diagrams

This section provides an overview of the class diagrams used in the system architecture. Diagrams illustrate key classes, their properties, methods, and relationships.

## Authentication Class Diagram
<img alt="Authentication" src="https://github.com/user-attachments/assets/c09ed77c-7a91-4aa4-9b92-61671c86f56d" />

### **UI Components**
- **Sidebar**: Main layout, contains auth modals and ProfileSidebar
- **Login/SignUp**: Form handling, validation, modal management
- **ProfileSidebar**: User display, direct Redux logout dispatch
- **ProtectedRoute**: Authentication checking, route protection

### **API Layer**
- **LoginAPI/RegisterAPI**: Form data extraction, Redux dispatch
- **SignoutAPI**: Error reset, signout dispatch, error checking via useUserError hook

### **State Management**
- **GlobalStore**: Central Redux store
- **UserSlice**: Authentication state, async operations

### **Utility Hooks**
- **UseUser**: User state subscription
- **UseUserError**: Error state subscription

### **Database**
- **SupabaseClient**: Authentication operations

## Video Components Class Diagram
<img alt="Videos" src="https://github.com/user-attachments/assets/1e095869-86da-484d-a021-1dc5f70b61c0" />

### **Video (Main Page)**
- **Video Management**: Manages list of videos and current index
- **Loading State**: Handles loading and error states
- **Navigation**: Keyboard and scroll navigation
- **Data Fetching**: Coordinates with Recommendations and VideoService

### **VideoComponent**
- **Video Display**: Renders individual video with MuxPlayer
- **Like Handling**: Manages like state and optimistic updates
- **Auto-play**: Handles video playback when active
- **Tag Display**: Shows relevant resource tags

### **VideoService**
- **Data Processing**: Processes raw video data with like status
- **Like Management**: Handles like/unlike operations in Supabase
- **Tag Generation**: Creates tags based on video content
- **Liked Videos**: Retrieves user's liked videos

### **Recommendations**
- **User Preferences**: Fetches user preferences from database/localStorage
- **Category Matching**: Matches preferences to video categories
- **Video Filtering**: Filters videos based on user interests
- **Fallback Logic**: Provides all videos when no preferences exist

### **Preferences**
- **Preference Storage**: Saves user interests and traits
- **Preference Retrieval**: Fetches stored user preferences
- **Authentication**: Validates user authentication status
- **Data Management**: Manages preferences in Supabase


## Resource Components Class Diagram
<img alt="Resources" src="https://github.com/user-attachments/assets/a4d3c37b-5968-49fa-b954-3fb08fa23973" />

### **Resources (Main Page)**
- **Resource Display**: Shows grid of resource cards
- **Navigation**: Handles routing to individual resource pages
- **State Management**: Manages component states

### **Individual Resource Pages**
- **Content Display**: Shows specific resource information
- **Navigation**: Provides back button for navigation
- **Responsive Design**: Adapts to different screen sizes

### **ResourceCard**
- **Visual Display**: Shows resource image, title, and description
- **Navigation**: Links to specific resource pages
- **Hover Effects**: Provides interactive feedback
- **Responsive Layout**: Adapts to grid layout

### **BackButton**
- **Navigation**: Handles back navigation logic
- **History Management**: Checks browser history
- **Fallback**: Redirects to home if no history
- **Visual Feedback**: Provides hover and focus states
