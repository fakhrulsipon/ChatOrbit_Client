import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const Provider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logoutUser = async () => {
        setLoading(true)
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            await signOut(auth)
            setUser(null)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            throw error;
        }
    }

    const updateProfileInfo = (updateUserProfile) => {
        return updateProfile(auth.currentUser, updateUserProfile)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser?.email) {
                axios.post('http://localhost:5000/jwt', { email: currentUser.email }, {
                    withCredentials: true
                })
                    .catch(error => {
                        console.error("JWT token fetch failed:", error);
                    })
            }

            // console.log('user in the auth state change', currentUser)

        });
        return () => {
            unSubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        signUser,
        logoutUser,
        googleSignIn,
        updateProfileInfo

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default Provider;