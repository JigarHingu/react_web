About This Project: A Guide
This project was built to provide a clear, hands-on example of fundamental React concepts working together.

1. The Core of React: Components
Everything in React is a "component". You can think of components as custom, reusable HTML elements that manage their own content and logic. This entire project is built by nesting components inside each other.

Example: The Card Component

Our Card.jsx is a perfect example of a simple, reusable presentation component. It just takes some content and wraps it in a styled box.

// src/components/shared/Card.jsx
import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      {children}
    </div>
  );
};

export default Card;

2. Making Components Dynamic with State (useState)
To make a component interactive, it needs to remember information (like what a user has typed). We give components "state" (memory) using the useState hook. It returns a value and a function to update that value, which automatically re-renders the component.

Example: The Search Bar in HomePage.jsx

We use useState to keep track of what the user is typing in the search bar. Every keystroke updates the searchTerm state.

// src/pages/HomePage.jsx
const [searchTerm, setSearchTerm] = useState("");

// ... in the JSX ...
<input
  type="text"
  placeholder="Search for a post..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

3. Handling Side Effects with useEffect
What if you need to do something after React renders, like fetching data or filtering a list? These are "side effects". The useEffect hook lets you run code in response to component lifecycle events, like when it first loads or when a state variable changes.

Example: Fetching and Filtering Posts in HomePage.jsx

The first useEffect runs only once to fetch the initial blog posts. The second one runs whenever the searchTerm or sortOrder changes, re-calculating the list of posts to display.

// src/pages/HomePage.jsx

// Effect 1: Fetch initial data
useEffect(() => {
  fetchPostsData().then(data => setPosts(data));
}, []); // The empty array [] means "run only once on mount"

// Effect 2: Re-run the filter/sort logic
useEffect(() => {
  let processedPosts = [...posts];
  // ... filtering and sorting logic ...
  setFilteredPosts(processedPosts);
}, [searchTerm, posts, sortOrder]); // Re-run if any of these values change

4. Building a Multi-Page App with React Router
To create a single-page application (SPA) with different "pages", we use the react-router-dom library.

Example 1: Defining Routes in App.jsx

We wrap our page components in <Route> and tell React Router which path corresponds to which component. The path="/posts/:postId" is a "dynamic route" that can match any post ID.

// src/App.jsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/posts/:postId" element={<PostPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>

Example 2: Reading the Post ID in PostPage.jsx

Inside the PostPage component, we use the useParams hook from React Router to get the postId from the URL, so we know which post to fetch and display.

// src/pages/PostPage.jsx
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams(); // For a URL like /posts/2, postId will be "2"
  // ... use postId to fetch the correct data ...
};

5. Conditional Rendering
A huge part of React is showing or hiding UI elements based on the current state. We do this with simple JavaScript logic like ternary operators (condition ? <A /> : <B />) or && (condition && <A />).

Example: The Animated Search Panel in HomePage.jsx

The entire search and sort panel is wrapped in a div. We use the isSearchActive state to conditionally apply CSS classes that control its height and opacity, creating a smooth slide-down animation.

// src/pages/HomePage.jsx
<div className={\`
  transition-all duration-500 ease-in-out overflow-hidden
  \${isSearchActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
\`}>
  {/* Search and Sort controls go here */}
</div>
