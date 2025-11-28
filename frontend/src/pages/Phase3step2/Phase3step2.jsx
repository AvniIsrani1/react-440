//Frontend page for phase 3 step 2. Makes the call to the corresponding backend route immediatly
//when this page is loaded and displays the results
import React, { useEffect, useState } from 'react';

function p3s2Search() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:3000/blog/p3s2');
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error(error);
        setResults([]);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>Phase 3 Step #2: Users with Most Blogs Yesterday</h2>
      <p>
       List the users who posted the most number of blogs on a specific date (We chose yesterday);
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
                {user.authorUsername} ({user.blogCount} blogs)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default p3s2Search;