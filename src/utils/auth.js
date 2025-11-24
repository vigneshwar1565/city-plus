import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/Firebase';

const AUTH_KEY = 'cityPulseAuth';
const USER_KEY = 'cityPulseUser';

const logMessage = (methodName, message) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} [authUtils.js] [${methodName}] ${message}`);
}

const saveAuthState = (user) => {
    logMessage('saveAuthState', user ? `Saving auth state for user: ${user.email}` : 'Clearing auth state');
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
        }));
        localStorage.setItem(AUTH_KEY, 'true');
    } else {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(AUTH_KEY);
    }
}

const getAuthState = () => {
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';
    const user = localStorage.getItem(USER_KEY) ? JSON.parse(localStorage.getItem(USER_KEY)) : null;

    logMessage('getAuthState', isAuthenticated ? `User is authenticated: ${user.email}` : 'User is not authenticated');
    return { isAuthenticated, user };
}

const isAuthenticated = () => {
    return localStorage.getItem(AUTH_KEY) === 'true';
}

const getCurrentUser = () => {
    return localStorage.getItem(USER_KEY) ? JSON.parse(localStorage.getItem(USER_KEY)) : null;
}

const logout = async () => {
    logMessage('logout', 'Logging out user');
    try {
        await signOut(auth);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(AUTH_KEY);
        saveAuthState(null);
        window.location.href = '/login';
        logMessage('logout', 'User logged out successfully');
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}

const initAuthListener = (callback) => {
    logMessage('initAuthListener', 'Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        logMessage('onAuthStateChanged', user ? `User logged in: ${user.email}` : 'User logged out');
        saveAuthState(user);
        callback(user);
    });
    return unsubscribe;
}

export { saveAuthState, getAuthState, isAuthenticated, getCurrentUser, logout, initAuthListener };