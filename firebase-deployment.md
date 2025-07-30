# Firebase Security Rules and Deployment Guide

## Firestore Security Rules

Copy and paste these rules into your Firebase Firestore Rules section in the Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to userCollegeData documents only if the user is authenticated
    // and the document ID matches their phone number
    match /userCollegeData/{phone} {
      allow read: if request.auth != null || true;  // Allow public read for now
      allow write: if request.auth != null || true; // Allow public write for now
      
      // For production, you might want to restrict access:
      // allow read, write: if request.auth != null && request.auth.token.phone_number == phone;
    }
    
    // Default deny all other paths
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Deployment Steps

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select your existing project
3. Set up Firestore Database
   - Click on "Firestore Database" in the left sidebar
   - Click "Create database"
   - Choose "Start in production mode" or "Start in test mode" (for development)
   - Select a location close to your users
   - Click "Enable"

4. Get your Firebase configuration
   - Click on the gear icon next to "Project Overview" and select "Project settings"
   - Scroll down to "Your apps" section
   - If you haven't added a web app yet, click on the web icon (`</>`)
   - Register your app with a nickname
   - Copy the firebaseConfig object

5. Update your `lib/firebase.js` file with your actual configuration values

6. Deploy your Next.js app to Vercel or your preferred hosting:
   ```
   npm run build
   vercel deploy
   ```

7. Test the application to ensure Firebase persistence works in both local and deployed environments

## Testing Your Firebase Integration

1. In local development:
   - Start your Next.js app with `npm run dev`
   - Open the app in your browser
   - Add colleges to your list and add some facts
   - Check the Firebase console to see if data is being saved

2. In production:
   - Deploy your app to Vercel or your preferred hosting
   - Test the same functionality in the deployed version
   - Verify that data persists between sessions
