//This page is needed for the implementation of Phase 3 step so that the user can follow other
//users
import React, {useState} from 'react';

function FollowOthers(){
  const [searchUsername, setSearchUsername] = useState('');
  const [resultUser, setResultUser] = useState(null);

  const handleSearch = async () =>{
    try{
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/user/username?username=${encodeURIComponent(searchUsername)}`,
        {
          headers: token ? {Authorization: `Bearer ${token}`}: {},
        }
      );
      if(!response.ok) throw new Error('Search request failed');
      const data = await response.json();
      setResultUser(data || null);
    }
    catch (err){
      console.error(err);
      setResultUser(null);
    }
};

const handleFollowToggle = async () => {
  if (!resultUser) return;

  try {
    const endpoint = resultUser.isFollowing
      ? `http://localhost:3000/following/unfollow`
      : `http://localhost:3000/following/follow`;

    const token = localStorage.getItem('token');

    const response = await fetch(endpoint, {
      method: resultUser.isFollowing ? 'DELETE' : 'POST', // ✅ use DELETE for unfollow
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ followingUsername: resultUser.username }),
    });

    if (!response.ok) throw new Error('Follow/unfollow request failed');

    const data = await response.json();
    setResultUser({ ...resultUser, isFollowing: data.isFollowing });
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
              {resultUser.isFollowing ? 'Unfollow' : 'Follow'}
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