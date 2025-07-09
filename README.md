[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=19548116)
<div align="center">

# Mental Health Literacy
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://applebaumian.github.io/tu-cis-4398-docs-template/)


</div>


## Keywords

Section 701, Mental Health, Mobile Application

## Project Abstract

This project proposes the development of a mental health literacy app centered around journaling as a foundational tool for everyday emotional self-care. The app is designed to encourage users to regularly reflect and document their thoughts and feelings, fostering awareness and emotional clarity. Unlike diagnostic tools, this app will not attempt to label or assess users' mental health conditions. Instead, it aims to build trust through a safe, non judgmental journaling experience. As users engage with the app, they will be gently guided toward accessible, vetted mental health resources should they choose to seek additional support. The goal is to empower users with self-awareness and provide a seamless bridge to professional help when needed without pressure, stigma, or clinical labeling.

## Installation Instructions
To run the project, Node.js is required. [Install](https://nodejs.org/en)
```
git clone https://github.com/Capstone-Projects-2025-Spring/project-mentalhealthliteracyapp.git
cd ./project-mentalhealthliteracyapp/mental-health-literacy
npm install
npm run dev
```

## High Level Requirement

Describe the requirements – i.e., what the product does and how it does it from a user point of view – at a high level.
this app will :
- Provide a journal space for users
- Provide users to additional resources
- Become a gateway to seek professional help
- Allow users to keep logs of thier everyday life
- All journal entries and personal data are securely encrypted and accessible only to the user


## Conceptual Design

The frontend of the app will be developed using React and TypeScript, with Vite used for fast development and build optimization. For handling data fetching and caching, the app will use react-query. The backend will also be built using TypeScript, providing APIs and handling user authentication and other logic. All user data, including journal entries and preferences, will be stored in a PostgreSQL database. The entire application, both frontend and backend, will be deployed using Vercel for a streamlined and efficient deployment process. Some tools and technologies may be subject to change as the project evolves and based on the team’s needs.

## Background

Similar products include MindDoc (https://minddoc.com/us/en) and Headspace (https://www.headspace.com/). Both are closed-source applications focused on providing users Mental Health resources, self-care strategies, mood tracking, and direct contacts to therapists. Headspace in particular also offers an Ai "empathy" based chat feature using a LLM to direct users to resources. While the approach of the user-experience for both are based in scientific research, they both can bombard the user with many options, lots of questions, and may feel overwhelming. The goal of our mental health literacy app is to use the scientifically backed method of encouraging users to journal as a way to eventually direct them to proper resources. 

Another product in the space includes BetterHelp (https://www.betterhelp.com/), a robust closed-source application that allows users to make appointments with licensed therapists as well as use a journal feature that can be viewed by their selected therapist. However, it requires the user to schedule and comes at a high price for appointments, something our application is looking to avoid in both respects. 

Lastly, a popular closed-source application for self-help is Calm (https://www.calm.com), providing users with mediation, sleep and specialists. This app has great user reviews, however it can be ineffective in addressing the core goal of getting users to seek appropriate help rather than using a "band aid" approach to their mental health. Using the concepts of all these applications but in a much more focused and streamlined approach, our application will simplify the user experience into approachable journaling sessions creating intrinsic motivation to seek proper resources. 

## Required Resources

Discuss what you need to develop this project. This includes background information you will need to acquire, hardware resources, and software resources. If these are not part of the standard Computer Science Department lab resources, these must be identified early and discussed with the instructor.

## Features and Requirements
### Functional Requirements
- Users' journals should be saved to cache.
- Users should be able to create, delete, and edit journal entries.
- Users should be able to login to save their journal onto the server.
- Users will be authenticated when logging in to the system.
- Users will be able to configure when they want to be notified to journal.

### Non-functional Requirements
- Users should be able to navigate UI within a single button click.
- Data backups will be ran periodically to prevent loss of data.

## Collaborators

[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/ApplebaumIan">
            <img src="https://avatars.githubusercontent.com/u/9451941?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Ian Tyler Applebaum</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/leighflagg">
            <img src="https://avatars.githubusercontent.com/u/77810293?v=4" width="100;" alt="leighflagg"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td></tr>
</table>

[//]: # ( readme: collaborators -end )
