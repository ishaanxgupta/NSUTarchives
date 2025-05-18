import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const metadata = user.unsafeMetadata;
      setUserData(metadata);
    }
  }, [user]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold">Loading user data...</div>
      </div>
    );
  }
  console.log(user.unsafeMetadata);
  console.log(user);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header Section */}
        <header className="flex items-center gap-4 mb-6">
          <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl">
            {userData?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userData?.name || 'User'}</h1>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-sm text-gray-500">Member since {userData?.member_since || 'N/A'}</p>
          </div>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-md shadow">
            <h3 className="text-xl font-semibold">{userData?.Questions_solved || 0}</h3>
            <p className="text-sm">Questions Solved</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-md shadow">
            <h3 className="text-xl font-semibold">{userData?.isMember ? 'Yes' : 'No'}</h3>
            <p className="text-sm">Membership Active</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold">UPI:</span>
            <span>{userData?.upi || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Date of Birth:</span>
            <span>{userData?.dob || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">LeetCode Profile:</span>
            <a
              href={`https://leetcode.com/${userData?.leetcode_profile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {userData?.leetcode_profile || 'N/A'}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Codeforces Profile:</span>
            <a
              href={`https://codeforces.com/profile/${userData?.codeforces_profile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {userData?.codeforces_profile || 'N/A'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
