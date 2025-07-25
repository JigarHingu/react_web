import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchPostsData } from "../api/mockApi";
import Card from "../components/shared/Card";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import useDebounce from "/src/hooks/useDebounce.js";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Effect to fetch posts
  
  useEffect(() => {
    setIsLoading(true);
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 500));
    Promise.all([fetchPostsData(), minTimePromise])
      .then(([data]) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // Effect to filter and sort posts based on the debounced search term
  useEffect(() => {
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
    setFilteredPosts(processedPosts);
  }, [debouncedSearchTerm, posts, sortOrder]);

  const handleSearchIconClick = () => {
    setIsSearchActive(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  const handleBlurContainer = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (searchTerm === "") {
        setIsSearchActive(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">Welcome to the Blog</h1>
          <p className="text-lg text-gray-600 mt-2">Discover articles about learning React.</p>
        </div>
        
        <div onBlur={handleBlurContainer} tabIndex={-1} className="relative">
          <div className="relative flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className={`
                transition-all duration-300 ease-in-out
                h-12 pl-5 pr-12 rounded-full border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isSearchActive ? 'w-64 opacity-100' : 'w-0 opacity-0'}
              `}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && isSearchActive && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-1"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
            <button
              onClick={handleSearchIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              aria-label="Open search bar"
            >
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">
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
    </div>
  );
};

export default HomePage;
