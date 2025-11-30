//KV added file: Phase3step1.jsx
//Frontend page for phase 3 step 1. Contains the 2 tag input fields, search button, calls the
//backend search route, and displays results.
import React, {useState} from 'react';

function P3S1Search(){
  const [tag1, setTag1] = useState('');//erase any text in the first textbox
  const [tag2, setTag2] = useState('');//erase any text in the second textbox
  const [results, setResults] = useState([]);//erase anything in the results area

  const handleSearch = async () =>{
    try{
      const token = localStorage.getItem('token');//get the user's token from local storage
      const response = await fetch(//make request to server
        `http://localhost:3000/blog/tag-pair?tagX=${encodeURIComponent(tag1)}&tagY=${encodeURIComponent(tag2)}`,
        {
          headers: token ? {Authorization: `Bearer ${token}`}: {},//include token in request
        }
      );
      if(!response.ok) throw new Error('Search request failed!');//request failed
      const data = await response.json();//get the response data
      setResults(data);//set the results on the screen
    }
    catch (err){//request failed
      console.error(err);//log the error
      setResults([]);//erase the results area
    }
  };

  return (//return the HTML code
    <div>
      <h2>Phase 3 Step #1: Advanced Blog Search</h2>
      <p>
        Two text fields are used so that you can input one tag into each text field, and the search
        will return the user (or users) who (the same user) posted two different blogs on the same
        day, such that one blog has a tag in the first text field and the other has a tag in the
        second text field.
      </p>

      <div>
        <label>
          Tag 1:
          <input
            type="text"
            value={tag1}
            onChange={(e) => setTag1(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Tag 2:
          <input
            type="text"
            value={tag2}
            onChange={(e) => setTag2(e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleSearch}>Search</button>

      <div>
        <h3>Results:</h3>
        {results.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {results.map((entry, index) => (
              <li key={index}>
                {entry.username || entry.authorUsername}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default P3S1Search;//export the method defined above