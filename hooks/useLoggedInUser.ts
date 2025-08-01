'use client';

import { USER_DATA } from '@/utils/constants';
import { useState, useEffect } from 'react';

const fallbackUser = {
  id: 'guest_001',
  name: 'Guest Student',
  email: 'guest@example.com',
  avatar: '',
  role: 'student',
};

export const useLoggedInUser = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLoggedInUser = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(USER_DATA);
      if (userData) {
        return JSON.parse(userData);
      }
    }
    return null;
  };

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      setUser(fallbackUser);
    }
    setIsLoading(false);
  }, []);

  return { user, role: user?.role, isLoading };
};
