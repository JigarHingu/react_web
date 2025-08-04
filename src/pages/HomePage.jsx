import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; // 1. Import Redux hooks
import { getPosts } from '../store/postsSlice'; // 2. Import our async thunk action
import Card from "../components/shared/Card";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import useDebounce from "/src/hooks/useDebounce.js";

const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // --- REDUX STATE & DISPATCH ---
  const dispatch = useDispatch();
  // 3. Use `useSelector` to read data from the Redux store
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  // // 4. Use `useEffect` to dispatch the fetch action when the component mounts
  // useEffect(() => {
  //   // We only fetch posts if they haven't been fetched yet ('idle' status)
  //   if (postStatus === 'idle') {
  //     dispatch(getPosts());
  //   }
  // }, [postStatus, dispatch]);

  // --- UPDATED EFFECT ---
  // We removed the `if (postStatus === 'idle')` check.
  // This ensures that every time the HomePage mounts, it dispatches the action
  // to get the latest post data from our mock API.
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // 5. The `useMemo` for filtering now depends on the `posts` from Redux
  const filteredPosts = useMemo(() => {
    let processedPosts = [...posts];
    if (debouncedSearchTerm) {
      processedPosts = processedPosts.filter(post =>
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    if (sortOrder === "asc") {
      processedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "desc") {
      processedPosts.sort((a, b) => b.title.localeCompare(a.title));
    }
    return processedPosts;
  }, [debouncedSearchTerm, posts, sortOrder]);

  const handleSearchIconClick = () => {
    setIsSearchActive(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  const handleBlurContainer = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (searchTerm === "") setIsSearchActive(false);
    }
  };

  // --- RENDER LOGIC ---
  // 6. The render logic now checks the `postStatus` from Redux
  let content;
  if (postStatus === 'loading' || postStatus === 'idle') {
    content = <LoadingSpinner />;
  } else if (postStatus === 'succeeded') {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h2 className="text-2xl font-bold text-blue-700 mb-2 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-700">{post.summary}</p>
            </Card>
          ))
        ) : (
          <p className="text-lg text-gray-600 col-span-full text-center">
            No posts found matching your search.
          </p>
        )}
      </div>
    );
  } else if (postStatus === 'failed') {
    content = <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Welcome to the Blog</h1>
          <p className="text-lg text-gray-600 mt-2">Discover articles about learning React.</p>
        </div>
        
        <div onBlur={handleBlurContainer} tabIndex={-1} className="relative self-end md:self-start">
          <div className="relative flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className={`
                transition-all duration-300 ease-in-out
                h-12 pl-5 pr-12 rounded-full border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isSearchActive ? 'w-48 sm:w-64 opacity-100' : 'w-0 opacity-0'}
              `}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && isSearchActive && (
              <button onClick={() => setSearchTerm("")} className="absolute right-12 top-1/2 -translate-y-1/2 p-1" aria-label="Clear search">
                <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
            <button onClick={handleSearchIconClick} className="absolute right-3 top-1/2 -translate-y-1/2 p-1" aria-label="Open search bar">
              <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            </button>
          </div>
          
          {isSearchActive && (
            <div className="absolute top-full right-0 mt-2 flex items-center gap-2 p-2 bg-white border rounded-md shadow-lg">
              <span className="text-sm font-medium text-gray-600">Sort:</span>
              <button onClick={() => setSortOrder("asc")} className={`px-3 py-1 text-sm rounded-md ${sortOrder === 'asc' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>A-Z</button>
              <button onClick={() => setSortOrder("desc")} className={`px-3 py-1 text-sm rounded-md ${sortOrder === 'desc' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Z-A</button>
              <button onClick={() => setSortOrder("default")} className={`px-3 py-1 text-sm rounded-md ${sortOrder === 'default' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Reset</button>
            </div>
          )}
        </div>
      </div>

      {content}
    </div>
  );
};

export default HomePage;