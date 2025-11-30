//Frontend page for phase 3 step 5: list all the blogs of user X, such that all the comments are
//positive for these blogs.
import React, {useState} from 'react';
import './Phase3.css';

function Phase3step5(){
  const [username, setUsername] = useState('');//erase any text in textbox
  const [results, setResults] = useState([]);//erase anythong in results section

  const handleSearch = async () =>{
    try {
      const token = localStorage.getItem('token');//get the user's token from local storage
      const response = await fetch(//make request to server
        `http://localhost:3000/blog/positive-only?user=${encodeURIComponent(username)}`,
        {
          headers: token ? {Authorization: `Bearer ${token}`}: {},//include token in request
        }
      );

      if(!response.ok)
        throw new Error('Request failed');//request failed: throw error

      const data = await response.json();//get data from server's response
      setResults(data);//prin the data on the screen
    }
    catch(err){//request failed
      console.error(err);//log the error
      setResults([]);//erase the results section
    }
  };

  return (//return the HTML code
    <div className="phase3-container">
      <h2>Phase 3 Step #5: Blogs with Only Positive Comments</h2>
      <p>
        List all the blogs of user X, such that all the comments are positive for these blogs. (in
        other words, these blogs must have some comments, but ALL the comments are positive and
        there is no negative comments). User X is arbitrary and will be determined by user input.
      </p>

      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <h3>Results:</h3>
        {results.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <ul>
            {results.map((blog, index) => (
              <li key={index}>
                <strong>{blog.subject}</strong> - {blog.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Phase3step5;//export the above method