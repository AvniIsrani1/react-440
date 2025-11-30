//KV added file: FollowOthers.jsx
//This page defines the frontend interface needed fr Phase 3 so that users can follow each other.
import React, {useState} from 'react';

function FollowOthers(){
  const [searchUsername, setSearchUsername] = useState('');//erase any text in the text field
  const [resultUser, setResultUser] = useState(null);//erase anything in the results section

  const handleSearch = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:3000/user/user-with-follow-status?username=${encodeURIComponent(searchUsername)}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    if (!response.ok) throw new Error('Search request failed');
    const data = await response.json();
    setResultUser(data || null); // data includes isFollowing
  } catch (err) {
    console.error(err);
    setResultUser(null);
  }
};

const handleFollowToggle = async () =>{
  if(!resultUser) return;//no result user: do nothing

  try{
    const token = localStorage.getItem('token');//get the user's token from local storage
    const response = await fetch(`http://localhost:3000/user/toggle-follow`,{//req follow/unfollow
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,//include the user's token in request
      },
      body: JSON.stringify({target: resultUser.username}),
    });

    if(!response.ok) throw new Error('Follow/unfollow request failed');//request failed: throw error

    const data = await response.json();//get the server's response

    setResultUser({...resultUser, isFollowing: data.isFollowing});//set the new data
  } catch(err){
        console.error(err);//if here, error occured: log it.
  }
};

  return (//return the page's HTML code
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

export default FollowOthers;//export the above method