# Class Diagrams

This section provides an overview of the class diagrams used in the system architecture. Diagrams illustrate key classes, their properties, methods, and relationships.

## Front-End Class Diagram — Quick Overview
![alt text](FrontEnd.png)
This diagram shows the high-level skeleton of the React application:

- **App** is the root component. It renders shared chrome (e.g., Header) and the main feature area (VideoFeed).

- **Header** is a purely presentational component that shows the site title, user avatar, etc.

- **VideoFeed** owns the infinite-scroll timeline. It fetches paged video metadata via react-query and renders a list of VideoCard instances.

- **VideoCard** is the atomic UI unit for playback and engagement (like, share, etc.). Clicking a card can open the Resource Page for deeper help.

- **AuthProvider** centralises Supabase auth; any component can call its signIn / signOut.

Arrows convey runtime composition, e.g., "App → VideoFeed" means the feed appears inside the App tree, while "VideoFeed → * VideoCard" shows many cards per feed.

This keeps the top-level view to five or six boxes—clear enough to grasp in seconds.

## Video Component Internals — Quick Overview
![alt text](VideoComponent.png)
Here we zoom into how a single VideoCard works:

- **VideoCard** orchestrates everything: it holds the current video prop and exposes interaction handlers (play, pause, toggleLike).

- **VideoPlayer** wraps the HTML5 `<video>` element (or a library player) and provides imperative controls (play, pause).

- **LikeButton** handles optimistic likes via a react-query mutation.


## Resource Page Diagram — Quick Overview
![alt text](resourcePage.png)
This diagram models the page that surfaces professional help links instead of videos:

- **ResourcePage** is routed by topic (e.g., "/resources/anxiety"). It loads a ResourceList and hands it ready-to-render data.

- **ResourceList** maps over an array of ExternalResource objects, producing one ResourceCard per item.

- **ResourceCard** is a small tile that shows title, short description, and an outbound link (open()).

- **ExternalResource** is a light domain object or TypeScript interface capturing metadata for each help link (provider name, URL, description).

---

# Site Mock Ups

This section provides visual mock ups of key screens in the application, illustrating layout and major UI elements.

## Login Screen
A simple login form where users can sign in using their credentials. The screen typically includes:
![Login Page](LoginPage.png)
- App logo or title
- Email and password input fields
- Sign In button
- Option for password reset or sign up

## Home Screen
The main landing page after login, showing:
![Home Screen](HomeScreen.png)
- Header with site title and user avatar
- Infinite-scroll video feed (VideoFeed)
- Navigation or sidebar (if present)

## Video Component
A detailed view of a single video card, including:
![Video Component UI](VideoUi.png)
- Video player (play/pause controls)
- Like button
- Share button
- Option to open the Resource Page for more help

## Resource Page
A page listing professional help resources, featuring:
![Resource Page](ResourcePageUI.png)
- List of resource cards (title, description, link)
- Topic-based navigation (e.g., anxiety, depression)
- Clean, accessible layout for easy browsing

