# City Pulse

A modern web application for discovering and exploring local events powered by the Ticketmaster Discovery API.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Assumptions and Limitations](#assumptions-and-limitations)
- [License](#license)

## Overview

City Pulse is a responsive web application designed to help users discover, search, and manage local events. The application integrates with the Ticketmaster Discovery API to provide real-time event information, including venue details, dates, times, and location data. Users can create accounts, save favorite events, and customize their experience with multi-language support.

**Live Application:** [https://city-pulse-vr.netlify.app](https://city-pulse-vr.netlify.app)

## Features

### Authentication & User Management
- User registration and login using Firebase Authentication
- Secure session management
- Protected routes for authenticated users
- User profile management

### Event Discovery
- Browse events from the Ticketmaster Discovery API
- Paginated event listings with navigation controls
- Detailed event information including:
  - Event descriptions and promotional information
  - Venue details with address and location
  - Date and time information
  - Interactive Google Maps integration
  - Booking information

### Search Functionality
- Keyword-based event search
- City-based event filtering
- Combined search capabilities
- Real-time search results

### User Experience
- Favorites management system
- Multi-language support (English and Arabic)
- Right-to-Left (RTL) layout support for Arabic
- Responsive design for various screen sizes
- Splash screen on initial page load
- Modern UI with Flaticon integration

## Technology Stack

### Frontend
- **React** 19.2.0 - UI framework
- **React Router DOM** 7.9.6 - Client-side routing
- **CSS3** - Styling and responsive design

### Backend Services
- **Firebase Authentication** 12.6.0 - User authentication
- **Ticketmaster Discovery API** - Event data provider
- **Netlify Functions** - Serverless API proxy

### Development Tools
- **Create React App** 5.0.1 - Build tooling
- **http-proxy-middleware** 3.0.5 - Development proxy
- **ESLint** - Code quality

### Deployment
- **Netlify** - Hosting and serverless functions

## Prerequisites

Before installing and running the application, ensure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher) or **yarn**
- **Git** for version control

Additionally, you will need:

- A **Firebase project** with Authentication enabled
- A **Ticketmaster API key** from [Ticketmaster Developer Portal](https://developer-acct.ticketmaster.com)

## Installation

### 1. Clone the Repository

git clone <repository-url>
cd city-pulse### 2. Install Dependencies

npm install### 3. Environment Configuration

Create a `.env` file in the root directory based on the `.env.sample` template. Configure the following environment variables:

#### 2. Firebase Configuration

Obtain your Firebase configuration from the Firebase Console:

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add a web app to your project
4. Copy the configuration values

Add the following to your `.env` file:

REACT_APP_FIREBASE_API_KEY=<your-firebase-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<your-firebase-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<your-firebase-app-id>
REACT_APP_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>#### 

#### 3. Ticketmaster API Configuration

1. Register at [Ticketmaster Developer Portal](https://developer-acct.ticketmaster.com)
2. Create an API key
3. Add to your `.env` file:

REACT_APP_TICKETMASTER_APIKEY=<your-ticketmaster-api-key>

Additional environment variables for customization:

REACT_APP_DEFAULT_LANGUAGE=en
REACT_APP_DEFAULT_PAGE_SIZE=20
REACT_APP_DEFAULT_LOCALE=*
REACT_APP_SPLASH_DURATION=3000
REACT_APP_SPLASH_SHOWN_KEY=splash_shown
REACT_APP_TICKETMASTER_API_BASE_URL=https://app.ticketmaster.com
REACT_APP_TICKETMASTER_API_PATH=/discovery/v2
REACT_APP_API_PROXY_PATH=/api/ticketmaster
REACT_APP_GOOGLE_MAPS_ZOOM=13
REACT_APP_GOOGLE_MAPS_EMBED_URL=https://maps.google.com/maps
REACT_APP_FLATICON_CDN_URL=https://cdn-uicons.flaticon.com/2.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css
REACT_APP_TITLE=City Pulse
REACT_APP_DESCRIPTION=Web site created using create-react-app
REACT_APP_THEME_COLOR=#000000

### 4. Start the Development Server

npm start
The application will be available at `http://localhost:3000/`

## Usage

### Getting Started

1. **Access the Application**
   - Navigate to the live URL or start the development server
   - The splash screen will appear on initial page load

2. **User Registration**
   - Click on the register link
   - Provide a valid email address and password
   - Complete the registration process

3. **User Login**
   - Enter your registered email and password
   - Upon successful authentication, you will be redirected to the home page

4. **Exploring Events**
   - Browse events on the home page
   - Use pagination controls to navigate through event listings
   - Click on any event card to view detailed information

5. **Searching Events**
   - Enter keywords in the search field
   - Specify city names (comma-separated for multiple cities)
   - Click the search button to filter results

6. **Managing Favorites**
   - Click the heart icon on any event to add it to favorites
   - View your favorites in the Profile section
   - Remove favorites by clicking the heart icon again

7. **Language Selection**
   - Use the language switcher in the navigation bar
   - Toggle between English and Arabic
   - The interface will update with RTL support for Arabic

## Project Structure

```
city-pulse/
├── netlify/
│   └── functions/
│       └── ticketmaster.js          # Netlify serverless function for API proxy
├── public/
│   ├── _redirects                   # Netlify redirect rules
│   ├── index.html                   # HTML template
│   ├── robots.txt                   # SEO configuration
│   └── ...                          # Static assets
├── src/
│   ├── Auth/
│   │   ├── Firebase.js              # Firebase configuration
│   │   └── ProtectedRoute.jsx       # Route protection component
│   ├── Components/
│   │   ├── Cards.jsx                # Event card component
│   │   ├── Event.jsx                # Event details component
│   │   ├── LanguageSwitch.jsx       # Language switcher
│   │   ├── Nav.jsx                  # Navigation component
│   │   ├── SearchField.jsx          # Search input component
│   │   └── index.js                 # Component exports
│   ├── Hooks/
│   │   ├── useApi.js                # API interaction hook
│   │   ├── useFavourites.js         # Favorites management hook
│   │   ├── useTranslation.js        # Translation hook
│   │   └── index.js                 # Hook exports
│   ├── Pages/
│   │   ├── Home.jsx                 # Main events listing page
│   │   ├── Login.jsx                # Login page
│   │   ├── Profile.jsx              # User profile page
│   │   ├── Register.jsx             # Registration page
│   │   ├── Splash.jsx                # Splash screen
│   │   └── index.jsx                # Page exports
│   ├── css/
│   │   ├── home.css                 # Home page styles
│   │   ├── login.css                # Login page styles
│   │   ├── profile.css               # Profile page styles
│   │   └── splash.css                # Splash screen styles
│   ├── translations/
│   │   ├── en.json                  # English translations
│   │   └── ar.json                  # Arabic translations
│   ├── utils/
│   │   └── auth.js                  # Authentication utilities
│   ├── App.js                       # Main application component
│   ├── App.css                      # Global styles
│   ├── index.js                     # Application entry point
│   ├── setupProxy.js                # Development proxy configuration
│   └── ...                          # Additional configuration files
├── .env                             # Environment variables (not in repository)
├── .env.sample                      # Environment variables template
├── .gitignore                       # Git ignore rules
├── netlify.toml                     # Netlify configuration
├── package.json                     # Project dependencies
└── README.md                        # This file
```

### Assumptions

1. **Splash Screen**: The splash screen is displayed only on page refresh, not on navigation between routes
2. **Authentication**: Firebase Authentication is the sole provider for user authentication
3. **Data Persistence**: User authentication state and preferences are stored in localStorage and persist until manually cleared
4. **Language Support**: Only static application content is translated; dynamic event data from the API is not translated
5. **City Search**: City search is implemented as a text input field rather than a dropdown with predefined options
