import React, { useState, useEffect } from 'react';
import { fetchUserData } from '../api/mockApi';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // --- UPDATED LOGIC ---
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 500));
    
    Promise.all([fetchUserData(), minTimePromise])
      .then(([data]) => {
        setUser(data);
      })
      .catch(error => console.error("Error fetching user data:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //   fetchUserData()
  //     .then(data => setUser(data))
  //     .catch(error => console.error("Error fetching user data:", error))
  //     .finally(() => setIsLoading(false));
  // }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <Card><p>Could not load user profile.</p></Card>;

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">User Profile</h1>
      <Card>
        <div className="flex items-center space-x-6">
          <img src={user.profilePicture} alt="User profile" className="w-32 h-32 rounded-full border-4 border-blue-500" />
          <div>
            <h2 className="text-3xl font-bold ">{user.name}</h2>
            <p className="text-gray-600 mt-1">{user.location}</p>
            <p className="mt-4 text-lg">{user.bio}</p>
            <div className="mt-4">
              <Button onClick={() => alert(`Following ${user.name}!`)}>Follow</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;