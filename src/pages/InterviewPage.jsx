import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import useDebounce from '/src/hooks/useDebounce.js';
import CodeBlock from '../components/shared/CodeBlock';

// --- Helper components for styling the guide ---
const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none"
      >
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
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
// ---

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
`,
    logic: `The core logic is using \`ReactDOM.createRoot\` to hook into the DOM. We then wrap our main \`<App />\` component with \`<BrowserRouter>\` to enable routing capabilities for the entire application from the very top level.`
  },
  {
    id: 2,
    title: "Q2: What is JSX?",
    answer: `JSX (JavaScript XML) is a syntax extension for JavaScript that looks very similar to HTML. It allows us to write UI structures in a familiar, declarative way directly inside our JavaScript code.`,
    code: `
// This JSX...
const element = <h1 className="greeting">Hello, world!</h1>;

// ...gets transpiled into this JavaScript object.
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
`,
    logic: `The logic here is not in the code itself, but in the build process. A transpiler like Babel reads the HTML-like syntax and converts it into standard \`React.createElement()\` function calls that JavaScript can understand.`
  },
  {
    id: 3,
    title: "Q3: What is a React Component?",
    answer: `A React Component is a reusable, self-contained piece of the UI. It can have its own logic and appearance. In this project, the \`Card\` component is a perfect example.`,
    code: `
// src/components/shared/Card.jsx
import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border">
      {children}
    </div>
  );
};
export default Card;
`,
    logic: `The logic is to accept \`children\` via props. The \`children\` prop is a special prop that allows this component to act as a generic wrapper for any other JSX content passed inside it.`
  },
  {
    id: 4,
    title: "Q4: How did you implement the responsive Header?",
    answer: `The header is fully responsive. On large screens, it shows a standard navigation bar. On smaller screens, it collapses into a 'hamburger' menu. This is achieved using a \`useState\` hook (\`isMenuOpen\`) to track the menu's visibility and Tailwind CSS's responsive prefixes (\`md:hidden\`, \`hidden md:flex\`) to conditionally render the correct layout based on the screen size.`,
    code: `
// src/components/layout/Header.jsx
const [isMenuOpen, setIsMenuOpen] = useState(false);

// ... in the JSX ...
<ul className="hidden md:flex space-x-6">
  {/* Desktop links */}
</ul>

<div className="md:hidden">
  <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
    {/* Hamburger/Close Icon */}
  </button>
</div>

{isMenuOpen && (
  <div className="md:hidden bg-gray-700">
    {/* Mobile dropdown menu */}
  </div>
)}
`,
    logic: `The logic relies on a state variable to toggle the visibility of the mobile dropdown. The CSS classes \`md:hidden\` and \`hidden md:flex\` are Tailwind's implementation of media queries, allowing the component to adapt its layout based on the viewport width without any JavaScript logic for checking screen size.`
  },
  {
    id: 5,
    title: "Q5: What is the purpose of the Footer component?",
    answer: `The Footer is a simple, static 'presentational' component. Its only job is to display content at the bottom of the page. It doesn't have any state or complex logic, which makes it very predictable and performant. It demonstrates that not every component needs to be complex; simple, focused components are a key part of a clean React architecture.`,
    code: `
// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-6">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} ReactLearn Project. JH</p>
      </div>
    </footer>
  );
};
export default Footer;
`,
    logic: `The logic here is simplicity itself. It's a functional component that receives no props and renders static JSX. It's a good example of a 'pure' component that will always render the same output.`
  },
  {
    id: 6,
    title: "Q6: How do you pass data between components?",
    answer: `Props (short for properties) are the primary way to pass data from a parent component down to a child component. This allows for a one-way data flow.`,
    code: `
// src/pages/HomePage.jsx
{filteredPosts.map((post) => (
  <Card key={post.id}>
    <Link to={\`/posts/\${post.id}\`}>
      <h2 className="text-2xl ...">{post.title}</h2>
    </Link>
    <p>{post.summary}</p>
  </Card>
))}
`,
    logic: `The logic is using the \`.map()\` array method to iterate over a list of data. In each iteration, it renders a \`<Card>\` component and passes the data for the current item (\`post\`) down to the child component as props.`
  },
  {
    id: 7,
    title: "Q7: What is the 'key' prop and why is it important?",
    answer: `The \`key\` prop is a special string attribute you need to include when creating lists of elements. Keys help React identify which items have changed, are added, or are removed.`,
    code: `
// src/pages/HomePage.jsx
{filteredPosts.map((post) => (
  <Card key={post.id}> 
    {/* ... card content ... */}
  </Card>
))}
`,
    logic: `The logic is that React's reconciliation algorithm uses the \`key\` prop to uniquely identify elements in a list. This allows it to determine which elements have changed, been added, or removed, minimizing DOM manipulations for better performance.`
  },
  {
    id: 8,
    title: "Q8: How do you manage state?",
    answer: `In functional components, you manage state using the \`useState\` hook. It returns an array with two elements: the current state value and a function to update it. Calling the update function tells React to re-render the component.`,
    code: `
// src/pages/HomePage.jsx
const [searchTerm, setSearchTerm] = useState("");

<input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
`,
    logic: `This logic creates a "controlled component". The input's \`value\` is tied to the \`searchTerm\` state, and the \`onChange\` event calls \`setSearchTerm\`. This creates a loop where React state is the single source of truth for the input's value.`
  },
  {
    id: 9,
    title: "Q9: Explain the useEffect hook.",
    answer: `The \`useEffect\` hook is used for "side effects" — operations that interact with the outside world, like fetching data. The dependency array (the second argument) is crucial.`,
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
`,
    logic: `The logic is controlled by the dependency array. An empty \`[]\` array means the effect's logic runs only once, after the initial render. An array with state variables \`[debouncedSearchTerm, ...]\` means the effect's logic will re-run *only* if one of those specific values changes between renders.`
  },
  {
    id: 10,
    title: "Q10: What is conditional rendering?",
    answer: `Conditional rendering is the process of displaying different UI elements based on the current state or props. You can use standard JavaScript constructs like ternary operators or the \`&&\` operator directly in your JSX.`,
    code: `
// src/pages/HomePage.jsx

// Using a ternary operator
{isLoading ? <LoadingSpinner /> : <div className="grid ...">...</div>}

// Using the && operator
{isSearchActive && <div className="absolute ...">...</div>}
`,
    logic: `The logic uses a JavaScript ternary operator (\`? :\`) and the logical AND (\`&&\`) operator. These are evaluated during the render phase. If the condition is true, the JSX after the operator is rendered; otherwise, it's skipped or the alternative is rendered.`
  },
  {
    id: 11,
    title: "Q11: How did you implement routing?",
    answer: `Client-side routing is implemented using the \`react-router-dom\` library. The main components are \`<BrowserRouter>\`, \`<Routes>\`, \`<Route>\`, and \`<Link>\`.`,
    code: `
// src/App.jsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/posts/:postId" element={<PostPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
`,
    logic: `The logic is declarative. The \`<Routes>\` component acts like a switch. It inspects the current browser URL and renders the \`element\` of the first \`<Route>\` whose \`path\` matches the URL.`
  },
  {
    id: 12,
    title: "Q12: What's the difference between <Link> and <a>?",
    answer: `The \`<Link>\` component from \`react-router-dom\` is used for internal navigation. It renders an \`<a>\` tag, but it intercepts the click event. Instead of causing a full page refresh, it updates the URL in the browser and lets React Router handle rendering the new component. This is what creates the fast, single-page application feel. A regular \`<a>\` tag would trigger a full server round-trip.`,
    code: `
// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';

// ...
<li>
  <Link to="/profile" className="...">Profile</Link>
</li>
`,
    logic: `The logic is handled internally by React Router. When a \`<Link>\` is clicked, it uses the browser's History API to change the URL without making a network request, then updates its internal state, which causes the correct \`<Route>\` to render.`
  },
  {
    id: 13,
    title: "Q13: How do you read URL parameters?",
    answer: `To read a dynamic parameter from the URL, like an ID, you use the \`useParams\` hook from \`react-router-dom\`. You define the parameter in your route path with a colon (e.g., \`/posts/:postId\`).`,
    code: `
// src/pages/PostPage.jsx
import { useParams } from 'react-router-dom';

const PostPage = () => {
  // If the URL is "/posts/2", this hook returns { postId: "2" }
  const { postId } = useParams();
  
  useEffect(() => {
    fetchPostById(postId).then(data => setPost(data));
  }, [postId]);
};
`,
    logic: `The logic is that the \`useParams\` hook connects to the React Router context. It parses the current URL, finds the dynamic segment defined in the \`<Route>\` path (e.g., \`:postId\`), and returns an object with the matched value.`
  },
  {
    id: 14,
    title: "Q14: How are forms handled?",
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
`,
    logic: `The logic is that React controls the entire state of the form. The input field cannot change on its own; it only displays the value of the \`email\` state. When the user types, the \`onChange\` event updates the state, which then causes the component to re-render and show the updated value in the input.`
  },
  {
    id: 15,
    title: "Q15: What is the purpose of useRef?",
    answer: `The \`useRef\` hook provides a way to create a mutable reference that persists across renders without causing a re-render itself. Its most common use case is to get direct access to a DOM element. In our \`HomePage\`, we use it to programmatically focus the search input field right after it becomes visible.`,
    code: `
// src/pages/HomePage.jsx
const searchInputRef = useRef(null);

const handleSearchIconClick = () => {
  setIsSearchActive(true);
  setTimeout(() => {
    searchInputRef.current?.focus();
  }, 100);
};

// ... in the JSX ...
<input ref={searchInputRef} ... />
`,
    logic: `The logic is that the \`ref\` attribute on the \`<input>\` element tells React to assign the actual DOM node to the \`.current\` property of our \`searchInputRef\` object. This gives us a direct "escape hatch" to the DOM, allowing us to call browser methods like \`.focus()\`.`
  },
  {
    id: 16,
    title: "Q16: What is a custom hook?",
    answer: `A custom hook is a reusable JavaScript function whose name starts with "use" and that can call other hooks. You create one to extract complex stateful logic from a component so it can be reused elsewhere.`,
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
`,
    logic: `The core logic is the \`useEffect\` cleanup function. A \`setTimeout\` is created on every render. When the component re-renders due to the input \`value\` changing, the cleanup function runs and clears the *previous* timer. A new timer is set. This cycle continues until the user stops typing, allowing one timer to finally complete.`
  },
  {
    id: 17,
    title: "Q17: How does the search and sort feature work together?",
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
`,
    logic: `The logic is to perform the operations in a specific sequence inside a single effect. By starting with the original \`posts\` array, then filtering, and then sorting, we ensure that the sorting is always applied to the currently visible (filtered) set of data.`
  },
  {
    id: 18,
    title: "Q18: How did you optimize performance?",
    answer: `We used two key React hooks for memoization. \`useMemo\` was used in \`HomePage\` to wrap the expensive filtering and sorting calculation. This ensures the list is only re-calculated when the data or filter criteria actually change. \`React.memo\` was used to wrap the \`Card\` component, preventing it from re-rendering if its props haven't changed.`,
    code: `
// Using useMemo in HomePage.jsx
const filteredPosts = useMemo(() => {
  // ... expensive filtering and sorting logic ...
  return processedPosts;
}, [debouncedSearchTerm, posts, sortOrder]);

// Using React.memo in Card.jsx
const Card = ({ children }) => { /* ... */ };
export default React.memo(Card);
`,
    logic: `The logic of \`useMemo\` is to cache the return value of a function. React will only re-run the function if a value in the dependency array changes. The logic of \`React.memo\` is to perform a shallow comparison of a component's props. If the props haven't changed since the last render, React will skip re-rendering the component and reuse the last rendered result.`
  },
  {
    id: 19,
    title: "Q19: How do you manage global state with Redux Toolkit?",
    answer: `Redux Toolkit (RTK) provides a centralized store for the application's state. The core idea is to create "slices" of state for different features using \`createSlice\`. This function automatically generates reducers and action creators. The \`configureStore\` function then combines all these slices into a single global store.`,
    code: `
// src/store/postsSlice.js
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: { /* ... */ },
  extraReducers: (builder) => {
    // Logic for async actions like fetching data
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  }
});

// src/store/store.js
export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});
`,
    logic: `In the component, we use the \`useSelector\` hook to read data from the store and the \`useDispatch\` hook to send actions. For asynchronous logic like fetching data, RTK uses \`createAsyncThunk\`, which handles the different states (pending, fulfilled, rejected) for us automatically.`
  }
];

const InterviewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openSection, setOpenSection] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [filteredQuestions, setFilteredQuestions] = useState(allQuestions);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

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
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-700">Logic Explained:</h4>
                <p className="mt-1 text-base text-gray-600">{q.logic}</p>
              </div>
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