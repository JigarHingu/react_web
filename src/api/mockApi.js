// This file simulates fetching data from a server.

const FAKE_API_DELAY = 1000; // 1 second

const mockUserData = {
  name: 'Jigar Hingu',
  bio: 'React developer and Gaming enthusiast.',
  location: 'Vasai, Mumbai',
  profilePicture: 'https://placehold.co/150x150/E2E8F0/4A5568?text=JH'
};

// const mockPostsData = [
//   { id: 1, title: 'Getting Started with React', content: 'The first step is understanding components...' },
//   { id: 2, title: 'Understanding Hooks', content: 'useState and useEffect are powerful tools.' },
//   { id: 3, title: 'React Router for Navigation', content: 'Creating a single-page app experience.' },
// ];

const mockPostsData = [
  { 
    id: 1, 
    title: 'Getting Started with React', 
    summary: 'Learn how to build reusable UI pieces, the fundamental building blocks of React.',
    content: `The absolute core of React is the **component**. You can think of a component as a custom, reusable HTML element that has its own logic and appearance. Everything you see in a React app is a component!

Here is a basic functional component:
\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`
This component accepts "props" (properties) and returns a React element that describes what should appear on the screen.

But what if a component needs to remember information and change over time, like a counter? For that, you need to manage its "state".

**Next up:** We'll learn about React Hooks, specifically \`useState\`, to give our components memory.`,
    nextPostId: 2 
  },
  { 
    id: 2, 
    title: 'Understanding Hooks: useState & useEffect',
    summary: 'Give your components memory and superpowers with state and lifecycle hooks.', 
    content: `Hooks are special functions that let you "hook into" React features from your functional components. The most important hook is \`useState\`.

**useState: Giving Components State**
\`useState\` allows a component to hold on to information (its "state") between renders. It returns the current state value and a function to update it.

Here's a simple counter:
\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
Now your component has its own memory!

**useEffect: Handling Side Effects**
What if you need to do something *after* React has updated the DOM, like fetching data from an API? That's a "side effect," and for that, we use \`useEffect\`.

Now you can build interactive components. But how do you connect them to build a full, multi-page application?

**Next up:** We'll explore how \`react-router-dom\` allows us to navigate between different pages.`,
    nextPostId: 3 
  },
  { 
    id: 3, 
    title: 'React Router for Navigation',
    summary: 'Connect your components together to create a seamless, multi-page application experience.', 
    content: `Real applications have multiple pages (e.g., Home, About, Profile). \`react-router-dom\` is the standard library for handling this navigation without reloading the entire page.

The main components are:
- **<BrowserRouter>**: Wraps your entire app to enable routing.
- **<Routes>**: A container for all your individual routes.
- **<Route>**: Defines a single page route.
- **<Link>**: Used instead of an \`<a>\` tag for navigation.

Here's a basic setup in your \`App.jsx\`:
\`\`\`jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div>
      {/* Navigation Links would go here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}
\`\`\`
You've now learned the core trifecta of modern React: **Components, Hooks, and Routing**. With these skills, you can build powerful single-page applications.

**Next up:** We'll add search and sort functionality to our homepage.`,
    nextPostId: 4 
  },
  {
    id: 4, 
    title: 'Bonus: Adding Search and Sort',
    summary: 'Learn how we made the homepage interactive with client-side filtering and sorting.',
    content: `A static list of posts is good, but a dynamic one is better! We made the homepage more useful by adding search and sort functionality. This was achieved by combining multiple states and an effect.

**The State Management**
We needed three pieces of state to make this work:
\`\`\`jsx
// The original, unmodified list of posts from the API
const [posts, setPosts] = useState([]);

// The current text in the search input field
const [searchTerm, setSearchTerm] = useState("");

// The current sort order ('default', 'asc', or 'desc')
const [sortOrder, setSortOrder] = useState("default");
\`\`\`

**The Logic in 'useEffect'**
The real magic happens in a \`useEffect\` hook that "listens" for changes to any of these states. When the user types or clicks a sort button, this effect re-runs:
\`\`\`jsx
useEffect(() => {
  // 1. Start with a copy of the original posts
  let processedPosts = [...posts];

  // 2. Apply the search filter first
  if (searchTerm !== "") {
    processedPosts = processedPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // 3. Then, apply sorting to the filtered results
  if (sortOrder === "asc") {
    processedPosts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === "desc") {
    processedPosts.sort((a, b) => b.title.localeCompare(a.title));
  }

  // 4. Finally, update the state that actually displays the posts
  setFilteredPosts(processedPosts);

}, [searchTerm, posts, sortOrder]); // Re-run if any of these change
\`\`\`
This pattern of filtering and then sorting a list based on user input is extremely common in React development.

**Next up:** We'll see how to handle user input with forms by building a newsletter signup page.`,
    nextPostId: 5 
  },
  {
    id: 5, 
    title: 'Handling Forms and User Input',
    summary: 'Explore how to manage form state and handle submissions, a core skill in web development.',
    content: `Nearly every web app needs to handle user input through forms. We built a Newsletter page to demonstrate this fundamental concept.

**Controlled Components**
The standard React way to handle forms is with "controlled components". This means that the form input's value is tied directly to a React state variable.
\`\`\`jsx
// State to hold the value of the email input
const [email, setEmail] = useState('');

// The input element in our JSX
<input
  type="email"
  value={email} // The input's value is driven by the state
  onChange={(e) => setEmail(e.target.value)} // Typing updates the state
/>
\`\`\`
This gives React full control over the form data.

**Handling Submission**
We attach an \`onSubmit\` event handler to the \`<form>\` tag. In our handler function, we first call \`event.preventDefault()\` to stop the browser from doing a full page refresh. Then, we can access the \`email\` state to see what the user submitted.

**Next up:** We'll explore an advanced topic: performance optimization with custom hooks.`,
    nextPostId: 6 
  },
  {
    id: 6,
    title: 'Advanced: Custom Hooks & Performance',
    summary: 'Optimize user input by creating a custom `useDebounce` hook for better performance.',
    content: `Our search feature worked, but it filtered the list on every single keystroke. For large datasets, this can be slow. We can optimize this with a technique called **debouncing**.

**Debouncing**
Debouncing means we wait for the user to stop typing for a short period (e.g., 300ms) before we run our filtering logic. This prevents unnecessary re-renders.

**Custom Hooks**
To make this logic reusable, we created our own custom hook, \`useDebounce\`. A custom hook is just a JavaScript function whose name starts with "use" that can call other hooks.
\`\`\`jsx
// src/hooks/useDebounce.js
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`
We then use this hook in our \`HomePage\` to get a "delayed" version of the search term, and use that for filtering.

**Next up:** We'll explore an advanced topic: performance optimization with custom hooks.`,
    nextPostId: 7 
  },
  {
    id: 7, 
    title: 'Advanced: Performance Optimization',
    summary: 'Learn to prevent unnecessary re-renders and calculations with `useMemo` and `React.memo`.',
    content: `As an application grows, performance becomes critical. React provides powerful hooks to prevent wasted work.

**Memoizing Calculations with \`useMemo\`**
On our homepage, the filtering and sorting logic would re-run on every single render, even if only the search panel's visibility changed. We use \`useMemo\` to "memoize" (remember) the result of this calculation. It will only re-calculate the list when one of its dependencies (like the search term or posts) actually changes.
\`\`\`jsx
const filteredPosts = useMemo(() => {
  // ... expensive filtering and sorting logic ...
  return processedPosts;
}, [debouncedSearchTerm, posts, sortOrder]);
\`\`\`

**Memoizing Components with \`React.memo\`**
Similarly, when the homepage re-renders, all of its child \`<Card>\` components would re-render too. We can prevent this by wrapping our component in \`React.memo\`. This tells React not to re-render the component if its props haven't changed.
\`\`\`jsx
// src/components/shared/Card.jsx
const Card = ({ children }) => { /* ... */ };

export default React.memo(Card);
\`\`\`

**Memoizing Functions with \`useCallback\`**
When you pass a function as a prop to a memoized child component, you should wrap it in \`useCallback\`. This prevents the function from being re-created on every render. Without it, the child component would see a "new" function every time and re-render unnecessarily.
\`\`\`jsx
// ParentComponent.jsx
const handleAction = useCallback(() => {
  // ... some logic ...
}, []); // Empty dependency array means the function is created only once.

return <MemoizedChildComponent onAction={handleAction} />;
\`\`\`
These three tools—\`useMemo\`, \`React.memo\`, and \`useCallback\`—are essential for building fast, professional React applications.

**Next up:** We'll explore the industry-standard solution for managing complex, shared state with Redux Toolkit.`,
    nextPostId: 8 
  },
  {
    id: 8,
    title: 'Global State with Redux Toolkit',
    summary: 'Learn the official, industry-standard way to manage complex, shared application state.',
    content: `When an application grows, passing props through many layers becomes difficult. A global state management library like Redux solves this.

**Redux Toolkit (RTK)** is the official, recommended way to use Redux. It simplifies the process with two key functions:

**1. \`createSlice()\`**
This function creates a "slice" of your state. It automatically generates reducer logic and the "actions" that describe events.
\`\`\`jsx
// src/store/postsSlice.js
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: { /* ... */ },
  extraReducers: { /* ... */ }
});
\`\`\`

**2. \`configureStore()\`**
This creates the single, global store that holds all your slices.
\`\`\`jsx
// src/store/store.js
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
\`\`\`
In our components, we use the \`useSelector\` hook to read data from this store and \`useDispatch\` to send actions to it.

**Congratulations!** You've completed the learning path.`,
    nextPostId: null
  }
];

export const fetchUserData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockUserData);
    }, FAKE_API_DELAY);
  });
};

export const fetchPostsData = () => {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(mockPostsData);
        }, FAKE_API_DELAY));
};

    // --- NEW FUNCTION ---
// This function finds a single post by its ID from our mock data array.
export const fetchPostById = (postId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real API, you'd make a network request like /api/posts/${postId}
      // Here, we find the post in our array.
      // We use `parseInt` because the ID from the URL will be a string.
      const post = mockPostsData.find(p => p.id === parseInt(postId));
      if (post) {
        resolve(post); // If found, return the post data
      } else {
        reject(new Error('Post not found')); // If not found, return an error
      }
    }, 500); // Shorter delay for this one  
    });
};
