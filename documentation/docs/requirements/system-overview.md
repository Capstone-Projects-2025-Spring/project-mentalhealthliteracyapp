---
sidebar_position: 1
---

# System Overview

## Project Abstract
This project proposes the development of a mental health literacy app centered around journaling as a foundational tool for everyday emotional self-care. The app is designed to encourage users to regularly reflect and document their thoughts and feelings, fostering awareness and emotional clarity. Unlike diagnostic tools, this app will not attempt to label or assess users' mental health conditions. Instead, it aims to build trust through a safe, non judgmental journaling experience. As users engage with the app, they will be gently guided toward accessible, vetted mental health resources should they choose to seek additional support. The goal is to empower users with self-awareness and provide a seamless bridge to professional help when needed without pressure, stigma, or clinical labeling.

## Conceptual Design
The frontend of the app will be developed using React and TypeScript, with Vite used for fast development and build optimization. For handling data fetching and caching, the app will use react-query. The backend and database services will be managed using Supabase, which provides authentication, API endpoints, and hosts a PostgreSQL database. All user data, including journal entries and preferences, will be securely stored in this PostgreSQL database. The frontend will be deployed using Cloudflare for fast, reliable global delivery. Some tools and technologies may be subject to change as the project evolves and based on the team’s needs.

## Background
Similar products include MindDoc (https://minddoc.com/us/en) and Headspace (https://www.headspace.com/). Both are closed-source applications focused on providing users Mental Health resources, self-care strategies, mood tracking, and direct contacts to therapists. Headspace in particular also offers an Ai "empathy" based chat feature using a LLM to direct users to resources. While the approach of the user-experience for both are based in scientific research, they both can bombard the user with many options, lots of questions, and may feel overwhelming. The goal of our mental health literacy app is to streamline the experience of combing through an overwhelming array of options into a unified iterative display where users can select like or dislike and learn more about different treatment and resource options.

Another product in the space includes BetterHelp (https://www.betterhelp.com/), a robust closed-source application that allows users to make appointments with licensed therapists as well as use a journal feature that can be viewed by their selected therapist. However, it requires the user to schedule and comes at a high price for appointments, something our application is looking to avoid in both respects. 

Lastly, a popular closed-source application for self-help is Calm (https://www.calm.com), providing users with mediation, sleep and specialists. This app has great user reviews, however it can be ineffective in addressing the core goal of getting users to seek appropriate help rather than using a "band aid" approach to their mental health. Using the concepts of all these applications but in a much more focused and streamlined approach, our application will simplify the user experience into small approachable videos creating intrinsic motivation to seek proper resources.