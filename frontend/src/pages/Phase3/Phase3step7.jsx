//Frontend page for phase 3 step 7: Display those users such that all the blogs they posted so far
//never received any negative comments.
import React, {useEffect, useState} from 'react';
import './Phase3.css';

function Phase3step7(){
  const [results, setResults] = useState([]);//erase anything in the results section

  useEffect(() =>{
    const fetchResults = async () =>{
      try{
        const token = localStorage.getItem('token');//get the user's token from local storage
        const response = await fetch('http://localhost:3000/user/no-negative-comments', {//make request
          headers: token ? {Authorization: `Bearer ${token}`}: {},//include token in request
        });
        if(!response.ok)
          throw new Error('Request failed');//request failed: throw error

        const data = await response.json();//get data from server's response
        setResults(data);//print the data on the screen
      }
      catch (err){//request failed
        console.error(err);//log the error
        setResults([]);//erase anything in results section
      }
    };

    fetchResults();//call the above method
  }, []);

  return (//Return the HTML code
    <div className="phase3-container">
      <h2>Phase 3 Step #7: Display users whose blogs never received negative comments</h2>

      <div>
        <h3>Results:</h3>
        {results.length === 0 ? (
          <p>No users found.</p>
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

export default Phase3step7;//call the above method