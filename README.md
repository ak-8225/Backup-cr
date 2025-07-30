# collegefitapp1121

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/heman8452-8321s-projects/v0-collegefitapp1121)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/DCullMlIUqc)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Firebase Integration

This project now includes Firebase integration for persistent data storage, enabling college sequence and facts to be saved across sessions in both local and deployed environments.

### Firebase Features

- **User College Data Storage**: Store and retrieve user's preferred college order
- **College Facts/USPs**: Save custom facts and notes about each college
- **Persistent Data**: Works in both local development and production environments

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Set up Firestore Database in your project
3. Copy your Firebase config to `lib/firebase.js`
4. Deploy Firestore security rules (see `firebase-deployment.md`)

For detailed setup instructions, see `firebase-deployment.md` file.

## Deployment

Your project is live at:

**[https://vercel.com/heman8452-8321s-projects/v0-collegefitapp1121](https://vercel.com/heman8452-8321s-projects/v0-collegefitapp1121)**

### Environment Variables

When deploying to production, make sure to set up the following environment variables:

- Firebase configuration (if you prefer not to commit these to your repository)
  - NEXT_PUBLIC_FIREBASE_API_KEY
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID
  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  - NEXT_PUBLIC_FIREBASE_APP_ID

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/DCullMlIUqc](https://v0.dev/chat/projects/DCullMlIUqc)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
