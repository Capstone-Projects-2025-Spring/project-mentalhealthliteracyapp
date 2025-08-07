# Sequence Diagrams

This section provides sequence diagrams that illustrate the flow of interactions between different components and services in the mental health literacy application.

## Use Case 1 – Account Creation

![alt text](account-creation-sequence.png)

## Use Case 2 - Onboarding to the Application

```mermaid
sequenceDiagram
    participant User
    participant App
    participant "PostgreSQL DB"

    User->>App: Visit Mental Health Literacy website
    activate App
    App-->>User: Display Welcome screen

    User->>App: Tap "Get Started"
    App-->>User: Show onboarding questions (1–5 scale)

    User->>App: Answer first question and Press "Continue"
    App->>"PostgreSQL DB": Save preference for question 1
    "PostgreSQL DB"-->>App: Preference for question 1 stored

    User->>App: Answer question 2 and press "Continue"
    App->>"PostgreSQL DB": Save preference for question 2
    "PostgreSQL DB"-->>App: Preference for question 2 stored

    App-->>User: Show personalized video feed
    deactivate App
```
## Use Case 3 - Videos 
```mermaid
sequenceDiagram
    participant User
    participant App
    participant "Auth Service (Supabase)"
    participant "PostgreSQL"
    User->>App: Launch app
    activate App
    App-->>User: Welcome screen<br>Sign Up / Log In 
    User->>App: Tap "Log In"
    App-->>User: Show Log in form 
    User->>App: Enter email, pwd -> "Log In"
    App->>"Auth Service (Supabase)": SELECT /user
    activate "Auth Service (Supabase)"
    "Auth Service (Supabase)"->>"PostgreSQL": Validate email and pwd
    "PostgreSQL"-->>"Auth Service (Supabase)": /user Exists
    "Auth Service (Supabase)"->>App: 200 OK (user Exists)
    App-->>User: Show Home screen
    User->>App: Tap "Videos"
    App->>"PostgreSQL": GET /video1
    activate "PostgreSQL"
    "PostgreSQL"-->>App: Return first video
    deactivate "PostgreSQL"
    App-->>User: Display first video
    User->>App: Swipe to next video
    App->>"PostgreSQL": GET /video2
    activate "PostgreSQL"
    "PostgreSQL"-->>App: Return second video
    deactivate "PostgreSQL"
    App-->>User: Display second video
    deactivate "Auth Service (Supabase)"
    deactivate App
```



## Use Case 4 - Educational Resources 
```mermaid
sequenceDiagram
    participant User
    participant App
    participant "Auth Service (Supabase)"
    participant "PostgreSQL"
    User->>App: Launch app
    activate App
    App-->>User: Welcome screen<br>Sign Up / Log In 
    User->>App: Tap "Log In"
    App-->>User: Show Log in form 
    User->>App: Enter email, pwd -> "Log In"
    App->>"Auth Service (Supabase)": SELECT /user
    activate "Auth Service (Supabase)"
    "Auth Service (Supabase)"->>"PostgreSQL": Validate email and pwd
    "PostgreSQL"-->>"Auth Service (Supabase)": /user Exists
    "Auth Service (Supabase)"->>App: 200 OK (user Exists)
    App-->>User: Show Home screen
    User->>App: Tap "Resources"
    App->>"PostgreSQL": GET /resources
    activate "PostgreSQL"
    "PostgreSQL"-->>App: Return modules and videos
    deactivate "PostgreSQL"
    deactivate "Auth Service (Supabase)"
    App->>User: Display educational videos and modules
    deactivate App
```


## Use Case 5 - Liking Videos
```mermaid
sequenceDiagram
    participant User
    participant App
    participant "Auth Service (Supabase)"
    participant "PostgreSQL"
    User->>App: Launch app
    activate App
    App-->>User: Welcome screen<br>Sign Up / Log In
    User->>App: Tap "Log In"
    App-->>User: Show Log in form
    User->>App: Enter email, pwd -> "Log In"
    App->>"Auth Service (Supabase)": SELECT /user
    activate "Auth Service (Supabase)"
    "Auth Service (Supabase)"->>"PostgreSQL": Validate email and pwd
    "PostgreSQL"-->>"Auth Service (Supabase)": /user Exists
    "Auth Service (Supabase)"->>App: 200 OK (user Exists)
    App-->>User: Show Home screen
    User->>App: Tap "Videos"
    App->>"PostgreSQL": GET /videos
    activate "PostgreSQL"
    "PostgreSQL"-->>App: Return video list
    deactivate "PostgreSQL"
    App-->>User: Display videos
    User->>App: Tap "Like" on a video
    App->>"PostgreSQL": POST /user/like (videoID)
    activate "PostgreSQL"
    "PostgreSQL"-->>App: Like saved
    deactivate "PostgreSQL"
    App-->>User: Show heart animation/confirmation
    User->>App: Tap "Liked Videos"
    App->>"PostgreSQL": GET /user/liked-videos
    activate "PostgreSQL"
    "PostgreSQL"-->>App: Return liked videos
    deactivate "PostgreSQL"
    App-->>User: Display liked videos
    deactivate "Auth Service (Supabase)"
    deactivate App
```
