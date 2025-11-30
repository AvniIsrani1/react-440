//This page defines the frontend interface needed fr Phase 3 so that users can follow each other.
import React, { useState } from "react";
import "./FollowOthers.css";

function FollowOthers() {
  const [searchUsername, setSearchUsername] = useState(""); //erase any text in the text field
  const [resultUser, setResultUser] = useState(null); //erase anything in the results section
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/user/user-with-follow-status?username=${encodeURIComponent(
          searchUsername
        )}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (!response.ok) throw new Error("Search request failed");
      const data = await response.json();
      setResultUser(data || null); // data includes isFollowing
    } catch (err) {
      console.error(err);
      setResultUser(null);
      setMessage("User not found.");
    }
  };

  const handleFollowToggle = async () => {
    if (!resultUser) return; //no result user: do nothing

    try {
      const token = localStorage.getItem("token"); //get the user's token from local storage
      const response = await fetch(`http://localhost:3000/user/toggle-follow`, {
        //req follow/unfollow
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //include the user's token in request
        },
        body: JSON.stringify({ target: resultUser.username }),
      });

      if (!response.ok) throw new Error("Follow/unfollow failed"); //request failed: throw error

      const data = await response.json(); //get the server's response

      setResultUser({ ...resultUser, isFollowing: data.isFollowing }); //set the new data
      setMessage(data.isFollowing ? "Followed!" : "Unfollowed!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err); //if here, error occured: log it.
      setMessage("Error occurred.");
    }
  };

  return (
    //return the page's HTML code
    <div className="follow-page">
      <div className="follow-card">
        <h2>Follow Other Users</h2>
        <p>Search for a username and follow or unfollow them.</p>

        <div className="search-row">
          <input
            type="text"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            placeholder="Enter username"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {message && <div className="status-msg">{message}</div>}
        <div className="results-area">
          <h3>Results:</h3>
          {resultUser ? (
            <div className="result-card">
              <p className="result-username">{resultUser.username}</p>
              <button
                className={
                  resultUser.isFollowing ? "btn-unfollow" : "btn-follow"
                }
                onClick={handleFollowToggle}
              >
                {resultUser.isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          ) : (
            <p className="empty-msg">No user found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowOthers; //export the above method
