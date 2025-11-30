//Frontend page for phase 3 step 2: list the users who posted the most number of blogs on a
//specific date (Defaults to 10/10/2025)
import React, { useEffect, useState } from "react";
import './Phase3.css';

function P3S2Search() {
  const [results, setResults] = useState([]); //erase anything in the results section
  const [date, setDate] = useState("2025-10-10");
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/blog/most-on-date?date=${encodeURIComponent(
          date
        )}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  return (//Return the HTML code
    <div className="phase3-container">
      <h2>Phase 3 Step #2: Users with Most Blogs on a Selected Date</h2>
      <p>
        List the users who posted the most number of blogs on a specific date.
        If there is a tie, list all the users who have a tie.
      </p>
      <label>
        Select Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <button onClick={handleSearch}>Search</button>

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

export default P3S2Search; //export the above function
