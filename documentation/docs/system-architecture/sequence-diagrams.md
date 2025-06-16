# Sequence Diagrams

This section provides sequence diagrams that illustrate the flow of interactions between different components and services in the mental health literacy application.

## Use Case 1 – Account Creation

![alt text](account-creation-sequence.png)

## Use Case 2 - Journal Saving

```mermaid
sequenceDiagram
    participant User
    participant App
    participant "Auth Service (Supabase)"
    participant "PostgreSQL"
    User->>App: Launch app on their personal computer
    activate App
    App-->>User: Welcome screen<br>Sign Up / Log In
    User->>App: Signs in by entering email,pwd
    App->>"Auth Service (Supabase)": SELECT /user
    activate "Auth Service (Supabase)"
    "Auth Service (Supabase)"->>"PostgreSQL": Validate email and pwd
    "PostgreSQL"-->>"Auth Service (Supabase)": /user Exists
    "Auth Service (Supabase)"->>App: 200 OK (user Exists)
    App-->>User: Show Home screen
    User->> App: Tap "Journal"
    User->> App: Write journal entry
    App->> "PostgreSQL": Save journal entry
    User->> App: Terminate Session
    App->> User: Session Terminated
    User->> App: Launch App on their phone
    App-->>User: Welcome screen<br>Sign Up / Log In
    User->>App: Signs in by entering email,pwd
    App->>"Auth Service (Supabase)": SELECT /user
    activate "Auth Service (Supabase)"
    "Auth Service (Supabase)"->>"PostgreSQL": Validate email and pwd
    "PostgreSQL"-->>"Auth Service (Supabase)": /user Exists
    "Auth Service (Supabase)"->>App: 200 OK (user Exists)
        App-->>User: Show Home screen
    User->> App: Tap "Journal"
    App->> User: Show previous journal entries
```

## Use Case 3 - Preferences

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
    User->>App: Tap "Settings"
    App-->>User: Show Settings form
    User->>App: Select notification frequency -> "Save"
    App->>"PostgreSQL": POST /user/frequency
    activate "PostgreSQL"
    "PostgreSQL"-->>App: Update OK
    deactivate "PostgreSQL"
    deactivate "Auth Service (Supabase)"
    App->>User: Screen displays updated preference
    deactivate App
```
