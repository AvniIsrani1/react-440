import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './BlogSearch.css';

export default function BlogSearch() {
  const [tag, setTag] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [sentiment, setSentiment] = useState('positive');
  const [content, setContent] = useState('');
  const [commentMsg, setCommentMsg] = useState('');

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const [commentFilter, setCommentFilter] = useState('all');

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setSearched(false);
    resetPanel();

    const trimmed = tag.trim();
    if (!trimmed) {
      setError('Please enter a tag to search.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.get('/blog/search', { params: { tag: trimmed } });
      setBlogs(Array.isArray(res.data) ? res.data : []);
      setSearched(true);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        navigate('/login', { replace: true });
      } else {
        setError(err?.response?.data?.message || 'Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPanel = () => {
    setSelectedBlog(null);
    setSentiment('positive');
    setContent('');
    setCommentMsg('');
    setComments([]);
    setCommentsError('');
    setCommentsLoading(false);
    setCommentFilter('all');
  };

  const loadComments = async (blogId, filter = commentFilter) => {
    setCommentsError('');
    setCommentsLoading(true);
    try {
      const params = filter !== 'all' ? { sentiment: filter } : {};
      const res = await api.get(`/comment/${blogId}`, { params });
      const list = Array.isArray(res.data) ? res.data : [];
      const filtered =
        filter === 'all' ? list : list.filter((c) => String(c.sentiment).toLowerCase() === filter);
      setComments(filtered);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        navigate('/login', { replace: true });
      } else {
        setCommentsError(err?.response?.data?.message || 'Failed to load comments.');
      }
    } finally {
      setCommentsLoading(false);
    }
  };

  const openComments = (blog) => {
    setSelectedBlog(blog);
    setCommentFilter('all');
    setSentiment('positive');
    setContent('');
    setCommentMsg('');
    loadComments(blog.id, 'all');
  };

  const changeFilter = async (filter) => {
    if (!selectedBlog) return;
    setCommentFilter(filter);
    await loadComments(selectedBlog.id, filter);
  };

  const submitComment = async (e) =>{
    e.preventDefault();
    if(!selectedBlog) return;

    setCommentMsg('');
    try{
      const token = localStorage.getItem('token');//retrieve token from localStorage (set during login)

      await api.post(`/comment/${selectedBlog.id}`,
      {
        sentiment,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // attach JWT only for protected route
        },
      });

    setCommentMsg('Comment submitted successfully.');
    setContent('');
    loadComments(selectedBlog.id, commentFilter); // still public
  }
  catch(err){
    const status = err?.response?.status;
    if(status === 401 || status === 403) {
      navigate('/login', { replace: true });
      return;
    }
    setCommentMsg(err?.response?.data?.message || 'Failed to submit comment.');
  }
};

  return (
    <div className="blog-search">
      <div className="search-card">
        <h2>Search Blogs by Tag</h2>
        <form onSubmit={handleSearch} className="search-form" role="search">
          <input
            type="text"
            placeholder="e.g., blockchain"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {searched && !loading && (
          <div className="results">
            {blogs.length > 0 ? (
              <div className="table-wrap">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Tags</th>
                      <th>Author</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((b) => (
                      <tr key={b.id}>
                        <td>{b.id}</td>
                        <td>{b.subject}</td>
                        <td className="desc-cell">{b.description}</td>
                        <td>{String(b.tags)}</td>
                        <td>{b.authorUsername}</td>
                        <td>
                          <button className="link-btn" onClick={() => openComments(b)}>
                            Comments
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="helper">No blogs found with that tag.</p>
            )}
          </div>
        )}

        {selectedBlog && (
          <div className="comment-panel">
            <h3>
              Comments for: <span className="sel-title">{selectedBlog.subject}</span>
            </h3>

            <div className="filter-row">
              <span>Filter:</span>
              <div className="filter-group">
                <button
                  type="button"
                  data-active={commentFilter === 'all'}
                  onClick={() => changeFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  data-active={commentFilter === 'positive'}
                  onClick={() => changeFilter('positive')}
                >
                  Positive
                </button>
                <button
                  type="button"
                  data-active={commentFilter === 'negative'}
                  onClick={() => changeFilter('negative')}
                >
                  Negative
                </button>
              </div>
              <button
                type="button"
                className="refresh-btn"
                onClick={() => selectedBlog && loadComments(selectedBlog.id, commentFilter)}
              >
                Refresh
              </button>
            </div>

            <div className="comment-list">
              <div className="comment-list-header">
                <span>Comments</span>
                <span className="count-badge">{comments.length}</span>
              </div>
              {commentsLoading && <p className="helper">Loading comments…</p>}
              {commentsError && <p className="note err">{commentsError}</p>}
              {!commentsLoading && comments.length === 0 && !commentsError && (
                <p className="helper">No comments yet.</p>
              )}
              {!commentsLoading && comments.length > 0 && (
                <ul className="comments-ul">
                  {comments.map((c) => (
                    <li key={c.id} className="comment-item">
                      <div className="c-top">
                        <span className={`pill ${c.sentiment === 'positive' ? 'good' : 'bad'}`}>
                          {c.sentiment}
                        </span>
                        <span className="c-meta">
                          <b>{c.author || c.authorUsername || 'Anonymous'}</b>
                          {c.createdAt && (
                            <span> • {new Date(c.createdAt).toLocaleString()}</span>
                          )}
                        </span>
                      </div>
                      <p className="c-body">{c.content}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <form onSubmit={submitComment} className="comment-form">
              <label>
                Sentiment
                <select
                  value={sentiment}
                  onChange={(e) => setSentiment(e.target.value)}
                >
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                </select>
              </label>

              <label>
                Description
                <textarea
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your comment..."
                  required
                />
              </label>

              <div className="comment-actions">
                <button type="submit" className="primary">Submit Comment</button>
                <button type="button" className="ghost" onClick={resetPanel}>
                  Close
                </button>
              </div>

              {commentMsg && (
                <p className={`note ${commentMsg.includes('successfully') ? 'ok' : 'err'}`}>
                  {commentMsg}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
