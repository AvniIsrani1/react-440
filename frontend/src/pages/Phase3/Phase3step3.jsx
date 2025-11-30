//Frontend page for phase 3 step 3: list all users followed by both input usernames x and Y
import React, {useState} from 'react';
import './Phase3.css';

function Phase3step3(){
  const [usernameX, setUsernameX] = useState('');//erase any text from first textbox
  const [usernameY, setUsernameY] = useState('');//erase any text from second textbox
  const [results, setResults] = useState([]);//erase anything in results section

  const handleSearch = async () =>{
    try {
      const token = localStorage.getItem('token');//get user's token from local storage
      const response = await fetch(//make request to server
        `http://localhost:3000/user/followed-by-both?x=${encodeURIComponent(usernameX)}&y=${encodeURIComponent(usernameY)}`,
        {
          headers: token ? {Authorization: `Bearer ${token}`}: {},//include token in request
        }
      );

      if(!response.ok)
        throw new Error('Request failed');//request failed: throw error

      const data = await response.json();//get the data from server's response
      setResults(data);//print the data on the screen
    }
    catch (err){//request failed
      console.error(err);//log the error
      setResults([]);//erase anything in the results section
    }
  };

  return (//return the HTML code
    <div className="phase3-container">
      <h2>Phase 3 Step #3: Common Followed Users</h2>
      <p>
        List the users who are followed by both users X and Y. Usernames X and Y are inputs from
        the user. Two text fields are implemented so you can input one username into each text
        field, and the search will return the user (or users) who are followed by both.
      </p>

      <div>
        <input
          type="text"
          value={usernameX}
          onChange={(e) => setUsernameX(e.target.value)}
          placeholder="Enter first username"
        />
        <input
          type="text"
          value={usernameY}
          onChange={(e) => setUsernameY(e.target.value)}
          placeholder="Enter second username"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <h3>Results:</h3>
        {results.length === 0 ? (
          <p>No common followed users found.</p>
        ) : (
          <ul>
            {results.map((user, index) => (
              <li key={index}>{user.username || user}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Phase3step3;//export the above method