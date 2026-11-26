import { createContext, useContext, useMemo, useState } from 'react';
import { storage } from '../utils/storage';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

const STORAGE_KEY = 'garbage-detection-auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.get(STORAGE_KEY, null));

  const login = async ({ email, password, username }) => {
    const loginPayload = username
      ? { username: username.trim(), password }
      : { username: email?.trim(), password };

    const response = await apiService.login(loginPayload);
    const data = response?.data || {};

    const safeUser = {
      id: data?.user?.id || data?.user?._id || crypto.randomUUID(),
      name: data?.user?.name || data?.user?.username || username || email || 'User',
      email: data?.user?.email || email || '',
      role: data?.user?.role || 'user',
      avatar: data?.user?.avatar || '',
      phone: data?.user?.phone || '',
      supportEmail: 'support@garbagedetect.ai'
    };

    setUser(safeUser);
    storage.set(STORAGE_KEY, safeUser);
    return safeUser;
  };

  const signup = async ({ name, email, password, username }) => {
    const signupPayload = {
      username: username?.trim() || email.trim(),
      email: email.trim(),
      password
    };

    await apiService.register(signupPayload);

    const newUser = {
      id: crypto.randomUUID(),
      name: name?.trim() || signupPayload.username,
      email: signupPayload.email,
      role: 'user',
      avatar: '',
      phone: '',
      supportEmail: 'support@garbagedetect.ai'
    };

    return newUser;
  };

  const updateProfile = (updates) => {
    if (!user) return;

    const merged = { ...user, ...updates };
    setUser(merged);
    storage.set(STORAGE_KEY, merged);
  };

  const logout = () => {
    setUser(null);
    storage.remove(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      signup,
      logout,
      updateProfile
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);