//KV added file: Phase3step2.jsx
//Frontend page for phase 3 step 2: list the users who posted the most number of blogs on a
//specific date (We chose 10/10/2025)
import React, {useEffect, useState} from 'react';

function P3S2Search(){
  const [results, setResults] = useState([]);//erase anything in the results section

  useEffect(() =>{
    const fetchResults = async () =>{
      try{
        const token = localStorage.getItem('token');//get the user's token from local storage
        const response = await fetch(//send request to server
          'http://localhost:3000/blog/most-on-date?date=2025-10-10',
          {
            headers: token ? {Authorization: `Bearer ${token}`}: {},//include token in request
          }
        );
        if(!response.ok){
          throw new Error('Request failed');//request failed: throw error
        }
        const data = await response.json();//get the response data
        setResults(data);//print the data on the screen
      }
      catch(err){//request failed
        console.error(err);//log the error
        setResults([]);//erase anything in results section
      }
    };

    fetchResults();//call the above methpd to get the results
  }, []);

  return (//return the HTML code
    <div>
      <h2>Phase 3 Step #2: Users with Most Blogs on 10/10/2025</h2>
      <p>
        List the users who posted the most number of blogs on a specific date (We chose 10/10/2025);
        if there is a tie, list all the users who have a tie.
      </p>

      <div>
        <h3>Results:</h3>
        {results.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {results.map((user, index) => (
              <li key={index}>
                {user.authorUsername} ({user.num} blogs)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default P3S2Search;//export the above function