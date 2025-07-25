import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import useDebounce from '/src/hooks/useDebounce.js';
import CodeBlock from '../components/shared/CodeBlock';


const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none"
      >
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}
      >
        <div className="p-6 pt-0 text-lg text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Storing all Q&A content in a single array for easier filtering ---
const allQuestions = [
    {
        id: 1,
        title: "Q1: What is the purpose of main.jsx?",
        answer: `The \`main.jsx\` file is the entry point of the entire React application. Its primary job is to find the root HTML element (usually a \`<div id="root">\` in \`index.html\`) and tell React to render our main \`<App />\` component inside of it. It's also where we set up top-level providers, like the \`<BrowserRouter>\` for routing.`,
        code: `
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
`
    },
    {
        id: 2,
        title: "Q2: What is JSX?",
        answer: `JSX (JavaScript XML) is a syntax extension for JavaScript that looks very similar to HTML. It allows us to write UI structures in a familiar, declarative way directly inside our JavaScript code. The browser doesn't understand JSX, so a tool like Vite (with Babel) transpiles it into regular JavaScript function calls (\`React.createElement\`) during the build process.`,
        code: `
// This JSX...
const element = <h1 className="greeting">Hello, world!</h1>;

// ...gets transpiled into this JavaScript object.
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
`
    },
    {
        id: 3,
        title: "Q3: What is a React Component?",
        answer: `A React Component is a reusable, self-contained piece of the UI. It can have its own logic and appearance. In this project, the \`Card\` component is a perfect example. It's a simple functional component that takes \`children\` as a prop and wraps them in a styled container, allowing us to reuse the same card style across the entire application.`,
        code: `
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
`
    },
    {
        id: 4,
        title: "Q4: How do you pass data between components?",
        answer: `Props (short for properties) are the primary way to pass data from a parent component down to a child component. This allows for one-way data flow, which makes the application easier to reason about. In our \`HomePage\`, we map over a list of posts and pass the data for each post to a \`Card\` component.`,
        code: `
// src/pages/HomePage.jsx
{filteredPosts.map((post) => (
  // We are passing a 'key' and the post data as props to the Card component.
  <Card key={post.id}>
    <Link to={\`/posts/\${post.id}\`}>
      <h2 className="text-2xl ...">{post.title}</h2>
    </Link>
    <p className="text-gray-700">{post.summary}</p>
  </Card>
))}
`
    },
    {
        id: 5,
        title: "Q5: What is the 'key' prop and why is it important?",
        answer: `The \`key\` prop is a special string attribute you need to include when creating lists of elements. Keys help React identify which items have changed, are added, or are removed. This allows React to efficiently update the UI. In our project, we use the unique \`post.id\` as the key when mapping over the posts on the homepage.`,
        code: `
// src/pages/HomePage.jsx
{filteredPosts.map((post) => (
  // The 'key' must be a unique identifier among its siblings.
  <Card key={post.id}> 
    {/* ... card content ... */}
  </Card>
))}
`
    },
    {
        id: 6,
        title: "Q6: How do you manage state?",
        answer: `In functional components, you manage state using the \`useState\` hook. It returns an array with two elements: the current state value and a function to update it. Calling the update function tells React to re-render the component with the new value. In our \`HomePage\`, we use it to control the search input.`,
        code: `
// src/pages/HomePage.jsx
const [searchTerm, setSearchTerm] = useState("");

// ... in the JSX ...
<input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
`
    },
    {
        id: 7,
        title: "Q7: Explain the useEffect hook.",
        answer: `The \`useEffect\` hook is used for "side effects" — operations that interact with the outside world, like fetching data from an API. The dependency array (the second argument) is crucial:\n- An empty array \`[]\` means the effect runs only once after the initial render.\n- An array with variables \`[var1, var2]\` means the effect will re-run whenever any of those variables change.`,
        code: `
// src/pages/HomePage.jsx

// This effect runs only ONCE to fetch initial data.
useEffect(() => {
  fetchPostsData().then(data => setPosts(data));
}, []);

// This effect re-runs whenever the debounced search term or sort order changes.
useEffect(() => {
  // ... filtering and sorting logic ...
}, [debouncedSearchTerm, posts, sortOrder]);
`
    },
    {
        id: 8,
        title: "Q8: What is conditional rendering?",
        answer: `Conditional rendering is the process of displaying different UI elements based on the current state or props. In React, you can use standard JavaScript constructs like \`if\` statements, ternary operators, or the \`&&\` operator directly in your JSX. We used this extensively for showing the loading spinner and the animated search panel.`,
        code: `
// src/pages/HomePage.jsx

// Using a ternary operator to show either the loader or the content
{isLoading ? (
  <LoadingSpinner />
) : (
  <div className="grid ...">
    {/* Post cards go here */}
  </div>
)}

// Using the && operator to show the sort controls only when search is active
{isSearchActive && (
  <div className="absolute ...">
    {/* Sort buttons go here */}
  </div>
)}
`
    },
    {
        id: 9,
        title: "Q9: How did you implement routing?",
        answer: `Client-side routing is implemented using the \`react-router-dom\` library. The main components are:\n- \`<BrowserRouter>\`: Wraps the entire app in \`main.jsx\` to enable routing.\n- \`<Routes>\`: Acts as a container for all possible routes.\n- \`<Route>\`: Defines the mapping between a URL path and a specific component.\n- \`<Link>\`: Used for navigation instead of regular \`<a>\` tags to prevent page reloads.`,
        code: `
// src/App.jsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/posts/:postId" element={<PostPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
`
    },
    {
        id: 10,
        title: "Q10: What's the difference between <Link> and <a>?",
        answer: `The \`<Link>\` component from \`react-router-dom\` is used for internal navigation. It renders an \`<a>\` tag, but it intercepts the click event. Instead of causing a full page refresh, it updates the URL in the browser and lets React Router handle rendering the new component. This is what creates the fast, single-page application feel. A regular \`<a>\` tag would trigger a full server round-trip.`,
        code: `
// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';

// ...
<li>
  <Link to="/profile" className="...">Profile</Link>
</li>
`
    },
    {
        id: 11,
        title: "Q11: How do you read URL parameters?",
        answer: `To read a dynamic parameter from the URL, like an ID, you use the \`useParams\` hook from \`react-router-dom\`. You define the parameter in your route path with a colon (e.g., \`/posts/:postId\`). The hook then returns an object containing the actual value from the URL.`,
        code: `
// src/pages/PostPage.jsx
import { useParams } from 'react-router-dom';

const PostPage = () => {
  // If the URL is "/posts/2", this hook returns { postId: "2" }
  const { postId } = useParams();
  
  // We then use this 'postId' to fetch the specific post's data.
  useEffect(() => {
    fetchPostById(postId).then(data => setPost(data));
  }, [postId]);
};
`
    },
    {
        id: 12,
        title: "Q12: How are forms handled?",
        answer: `Forms are handled using "controlled components". This means the value of each form input is tied directly to a React state variable. The \`onChange\` handler updates the state on every keystroke, making React the "single source of truth" for the form's data. We prevent the default page refresh on submission by calling \`event.preventDefault()\`.`,
        code: `
// src/pages/NewsletterPage.jsx
const [email, setEmail] = useState('');

const handleSubmit = (event) => {
  event.preventDefault();
  console.log('Subscribing with email:', email);
  setIsSubmitted(true);
};

return (
  <form onSubmit={handleSubmit}>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Button type="submit">Subscribe</Button>
  </form>
);
`
    },
    {
        id: 13,
        title: "Q13: What is the purpose of useRef?",
        answer: `The \`useRef\` hook provides a way to create a mutable reference that persists across renders without causing a re-render itself. Its most common use case is to get direct access to a DOM element. In our \`HomePage\`, we use it to programmatically focus the search input field right after it becomes visible.`,
        code: `
// src/pages/HomePage.jsx
const searchInputRef = useRef(null);

const handleSearchIconClick = () => {
  setIsSearchActive(true);
  // We use a timeout to ensure the input is visible before we try to focus it
  setTimeout(() => {
    searchInputRef.current?.focus();
  }, 100);
};

// ... in the JSX ...
<input ref={searchInputRef} ... />
`
    },
    {
        id: 14,
        title: "Q14: What is a custom hook?",
        answer: `A custom hook is a reusable JavaScript function whose name starts with "use" and that can call other hooks. You create one to extract complex stateful logic from a component so it can be reused elsewhere. In this project, we created \`useDebounce\` to optimize our search feature by delaying the filtering logic until the user stops typing.`,
        code: `
// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

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
export default useDebounce;
`
    },
    {
        id: 15,
        title: "Q15: How does the search and sort feature work together?",
        answer: `The search and sort feature works by combining multiple states in a single \`useEffect\` hook. The effect "listens" for changes to the original posts, the search term, and the sort order. When any of these change, it runs a sequence of operations: first it filters the original list based on the search term, then it sorts the *filtered* list. This ensures the two features work together correctly.`,
        code: `
// src/pages/HomePage.jsx
useEffect(() => {
  let processedPosts = [...posts]; // Start with the full list

  // 1. Apply search filter
  if (debouncedSearchTerm) {
    processedPosts = processedPosts.filter(/* ... */);
  }

  // 2. Apply sort order to the result of the filter
  if (sortOrder === "asc") {
    processedPosts.sort(/* ... */);
  } else if (sortOrder === "desc") {
    processedPosts.sort(/* ... */);
  }

  // 3. Update the state that is displayed on screen
  setFilteredPosts(processedPosts);
}, [debouncedSearchTerm, posts, sortOrder]);
`
    }
];

const InterviewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openSection, setOpenSection] = useState(1); 
  
  // --- NEW STATE FOR SEARCH ---
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [filteredQuestions, setFilteredQuestions] = useState(allQuestions);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // --- NEW EFFECT FOR FILTERING QUESTIONS ---
  useEffect(() => {
    if (debouncedSearchTerm === '') {
      setFilteredQuestions(allQuestions);
    } else {
      const results = allQuestions.filter(q => 
        q.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredQuestions(results);
    }
  }, [debouncedSearchTerm]);

  const handleSectionClick = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-6">Project Interview Q&A</h1>
      
      {/* --- SEARCH BAR --- */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search questions (e.g., 'routing', 'hooks')..."
          className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <AccordionItem 
              key={q.id}
              title={q.title} 
              isOpen={openSection === q.id} 
              onClick={() => handleSectionClick(q.id)}
            >
              <p>{q.answer}</p>
              <CodeBlock>{q.code}</CodeBlock>
            </AccordionItem>
          ))
        ) : (
          <p className="text-lg text-gray-600 text-center p-8">
            No questions found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;