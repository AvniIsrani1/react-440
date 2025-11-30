//Frontend page for phase 3 step 6: Display all the users who posted some comments, but each of
//them is negative.
import React, {useEffect, useState} from 'react';
import './Phase3.css';

function Phase3step6(){
  const [results, setResults] = useState([]);//erase any text from the result field

  useEffect(() =>{
    const fetchResults = async () =>{
      try{
        const token = localStorage.getItem('token');//get the user's token from local storage
        const response=await fetch('http://localhost:3000/comment/all-negative-commenters',{//req
          headers: token ? {Authorization: `Bearer ${token}`}: {},//inculde token in request
        });
        if(!response.ok) 
          throw new Error('Request failed');//request failed: throw error

        const data = await response.json();//get data from server's response
        setResults(data);//print the data on the screen
      }
      catch(err){//request failed
        console.error(err);//log the error
        setResults([]);//erase the results section
      }
    };

    fetchResults();//call the above function
  }, []);

  return (//return the HTML code
    <div className="phase3-container">
      <h2>Phase 3 Step #6: Display all the users who posted some comments, but each of them is negative.</h2>

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

export default Phase3step6;//export the above method