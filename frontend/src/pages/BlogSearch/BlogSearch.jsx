//KV: This file represents the blog search page
import React, { useState } from 'react';
import axios from 'axios';

export default function BlogSearch() {//define variables for post fields
  const [tag, setTag] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {//user pressed search button
    e.preventDefault(); // handles both button click and Enter key
    try {
      const res = await axios.get(`http://localhost:3000/blog/search?tag=${tag}`);//make server request
      setBlogs(res.data);
      setSearched(true);//serch results gotton
    } catch (err) {
      console.error('Search failed:', err);//search failed
      setBlogs([]);
      setSearched(true);
    }
  };

  return (
    <div className="blog-search-shell">
      <h2>Search Blogs by Tag</h2>
      <form onSubmit={handleSearch}>
        <input //tag search field
          type="text"
          value={tag}
          onChange={e => setTag(e.target.value)}
          placeholder="Enter tag (e.g. blockchain)"
          required
        />
        <button type="submit">Search</button>
      </form>

      {searched && (//results list
        <div className="blog-results">
          <h3>Results for tag: "{tag}"</h3>
          {blogs.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Tags</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id}>
                    <td>{blog.subject}</td>
                    <td>{blog.description}</td>
                    <td>{blog.tags}</td>
                    <td>{blog.authorUsername}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No blogs found with that tag.</p>
          )}
        </div>
      )}
    </div>
  );
}