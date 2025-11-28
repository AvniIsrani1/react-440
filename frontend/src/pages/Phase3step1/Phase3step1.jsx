//Frontend page for phase 3 step 1. Contains the 2 tag input fields, search button, cals the
//backend search route, and displays results
import React, { useState } from 'react';

function P3S1Search() {//define the method to perform the search for phase 3 step 1

  //set define variables and set default values
  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {//handle the search
    try {
      const response = await fetch(//get the response from backend
        `http://localhost:3000/blog/p3s1?tag1=${encodeURIComponent(tag1)}&tag2=${encodeURIComponent(tag2)}`
      );
      if (!response.ok)
        throw new Error('Search request failed!');//request failed: throw error
      const data = await response.json();//get the response
      setResults(data);//ser the results
    }
    catch (error) {//if here, error was thrown
      console.error(error);//log the error
      setResults([]);//reset results to default
    }
  };

  return (//define the HTML page to display
    <div>
      <h2>Phase 3 Step #1: Advanced Blog Search</h2>
      <p>
        Input one tag into each text field, and the search will return the user (or users) who (the
        same user) posted two different blogs on the same day, such that one blog has a tag in the
        first text field and the other has a tag in the second text field.
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
              <strong>User:</strong> {entry.username}
              <div>
                <h4>Blog 1</h4>
                <p><strong>Subject:</strong> {entry.blog1Subject}</p>
                <p><strong>Description:</strong> {entry.blog1Description}</p>
                <p><strong>Tags:</strong> {entry.blog1Tags}</p>
                <p><em>{new Date(entry.blog1CreatedAt).toLocaleString()}</em></p>
              </div>
              <div>
                <h4>Blog 2</h4>
                <p><strong>Subject:</strong> {entry.blog2Subject}</p>
                <p><strong>Description:</strong> {entry.blog2Description}</p>
                <p><strong>Tags:</strong> {entry.blog2Tags}</p>
                <p><em>{new Date(entry.blog2CreatedAt).toLocaleString()}</em></p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default P3S1Search;//export the search method