import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { User, UpdateUserProfile } from '@shared/schema';

interface UserContextType {
  user: User | null;
  updateProfile: (profileData: UpdateUserProfile) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Mock user ID for demo purposes - in a real app this would come from authentication
  const currentUserId = 1;

  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/users', currentUserId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/users/${currentUserId}`);
        if (!response.ok) {
          // If user doesn't exist, create a default user
          if (response.status === 404) {
            const defaultUser = {
              firstName: 'Alex',
              lastName: 'Johnson',
              email: 'alex.johnson@email.com',
              phone: '+1 (555) 123-4567',
              bio: 'AI enthusiast and lifelong learner passionate about technology and education.',
              location: 'San Francisco, CA',
              timezone: 'America/Los_Angeles',
              avatar: null,
              dateOfBirth: '1995-06-15',
              occupation: 'Software Engineer',
              company: 'Tech Innovations Inc.',
              theme: 'dark',
              emailNotifications: true,
              pushNotifications: true,
              marketingEmails: false,
              weeklyDigest: true,
              language: 'en',
              publicProfile: false,
            };
            
            const updateResponse = await apiRequest('PUT', `/api/users/${currentUserId}/profile`, defaultUser);
            
            return updateResponse.json();
          }
          throw new Error('Failed to fetch user profile');
        }
        return response.json();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user profile');
        return null;
      }
    },
    retry: 1,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: UpdateUserProfile) => {
      const response = await apiRequest('PUT', `/api/users/${currentUserId}/profile`, profileData);
      return response.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['/api/users', currentUserId], updatedUser);
      setError(null);
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    },
  });

  const updateProfile = async (profileData: UpdateUserProfile) => {
    await updateProfileMutation.mutateAsync(profileData);
  };

  return (
    <UserContext.Provider value={{
      user: user || null,
      updateProfile,
      isLoading,
      error,
    }}>
      {children}
    </UserContext.Provider>
  );
};