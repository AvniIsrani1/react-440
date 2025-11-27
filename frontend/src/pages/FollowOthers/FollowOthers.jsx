//This page is needed for the implementation of Phase 3 step so that the user can follow other
//users
import React, { useState } from 'react';

function FollowOthers() {
  const [searchUsername, setSearchUsername] = useState('');
  const [resultUser, setResultUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/search?username=${encodeURIComponent(searchUsername)}`
      );
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      const data = await response.json();

      if (data) {
        setResultUser(data);
        setIsFollowing(data.isFollowing); // backend should return whether current user follows them
      } else {
        setResultUser(null);
      }
    } catch (error) {
      console.error(error);
      setResultUser(null);
    }
  };

  const handleFollowToggle = async () => {
    if (!resultUser) return;

    try {
      const endpoint = isFollowing
        ? `http://localhost:3000/follow/unfollow`
        : `http://localhost:3000/follow/follow`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUsername: resultUser.username }),
      });

      if (!response.ok) {
        throw new Error('Follow/unfollow request failed');
      }

      // Toggle state
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Follow Other Users</h2>
      <p>Search for a username and follow or unfollow them.</p>

      <div>
        <input
          type="text"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <h3>Results:</h3>
        {resultUser ? (
          <div>
            <p>{resultUser.username}</p>
            <button onClick={handleFollowToggle}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ) : (
          <p>No user found.</p>
        )}
      </div>
    </div>
  );
}

export default FollowOthers;