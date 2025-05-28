[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=19548116)
<div align="center">

# Project Name
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://applebaumian.github.io/tu-cis-4398-docs-template/)


</div>


## Keywords

Section 701, Mental Health, Mobile Application

## Project Abstract

This document proposes a novel application of a text message (SMS or Email) read-out and hands-free call interacted between an Android Smartphone and an infotainment platform (headunit) in a car environment. When a phone receives an SMS or Email, the text message is transferred from the phone to the headunit through a Bluetooth connection. On the headunit, user can control which and when the received SMS or E-mail to be read out through the in-vehicle audio system. The user may press one button on the headunit to activate the hands-free feature to call back the SMS sender.

## High Level Requirement

Describe the requirements – i.e., what the product does and how it does it from a user point of view – at a high level.

## Conceptual Design

Describe the initial design concept: Hardware/software architecture, programming language, operating system, etc.

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
