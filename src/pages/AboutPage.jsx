import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import Modal from '../components/shared/Modal';

// --- Helper component for the Technology list (now a button) ---
const TechItem = ({ icon, name, description, onClick }) => (
  <button 
    onClick={onClick}
    // --- ADDED TOOLTIP ---
    title={`Click to see setup info for ${name}`}
    className="w-full flex items-start space-x-4 p-4 rounded-lg text-left transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
  >
    <div className="flex-shrink-0 w-12 h-12">{icon}</div>
    <div>
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-gray-400 mt-1">{description}</p>
    </div>
  </button>
);

// --- Helper component for the Feature list (now a Link) ---
const FeatureItem = ({ icon, title, to, children }) => (
  <Link 
    to={to} 
    // --- ADDED TOOLTIP ---
    title={`Click to learn more about ${title}`}
    className="block p-4 rounded-lg transition-colors hover:bg-gray-200"
  >
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 text-blue-500 mt-1">{icon}</div>
        <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
  </Link>
);

// --- Storing data for our modal content ---
const techSetupInfo = {
  React: {
    title: "Setting up React with Vite",
    content: `This project was bootstrapped using Vite, the recommended tool for starting a new React project.`,
    code: `npm create vite@latest your-project-name -- --template react`
  },
  Vite: {
    title: "Running the Vite Dev Server",
    content: `Vite provides a fast and modern development server. After installing dependencies with \`npm install\`, you can start the server with:`,
    code: `npm run dev`
  },
  'Tailwind CSS': {
    title: "Setting up Tailwind CSS",
    content: `Tailwind CSS is a utility-first CSS framework. First, install the necessary packages. After installation, you need to configure two files: \`tailwind.config.js\` to tell Tailwind which files to scan, and \`postcss.config.js\` to enable the Tailwind plugin.`,
    code: `// 1. Install packages
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// 2. Configure tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// 3. Configure postcss.config.js
export default {
  plugins: {
    'tailwindcss': {}, // Note: may be '@tailwindcss/postcss' in newer versions
    'autoprefixer': {},
  },
}`
  }
};

const CodeBlock = ({ children }) => (
  <pre className="bg-gray-800 text-white rounded-lg p-4 mt-4 overflow-x-auto text-sm">
    <code>{children.trim()}</code>
  </pre>
);

// --- SVG ICONS (No changes here) ---
const ReactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"></circle><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>;
const ViteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 257"><defs><linearGradient id="a" x1="0%" x2="100%" y1="100%" y2="0%"><stop offset="0%" stopColor="#41D1FF"></stop><stop offset="100%" stopColor="#BD34FE"></stop></linearGradient><linearGradient id="b" x1="0%" x2="100%" y1="100%" y2="0%"><stop offset="0%" stopColor="#FFEA83"></stop><stop offset="8.33%" stopColor="#FFDD35"></stop><stop offset="100%" stopColor="#FFA800"></stop></linearGradient></defs><path fill="url(#a)" d="M255.5 63.7L132.3 256.3a3.5 3.5 0 01-6.2-3.2L162.3 6.3a3.5 3.5 0 016.2 3.2l87 54.2z"></path><path fill="url(#b)" d="M174.3 0L3.5 106.8a3.5 3.5 0 002.5 6.4h193.3a3.5 3.5 0 002.5-6.4L174.3 0z"></path></svg>;
const TailwindIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 154"><path fill="#38BDF8" d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.734 2.4 16.8 10.266 24.534 17.6 7.733 7.333 16.8 14.666 28.266 14.666 11.467 0 20.534-7.333 28.267-14.666C207.467 42.266 214.533 34.4 224.267 32c17.066-4.267 32 2.133 44.8 19.2-12.8-17.067-27.733-27.733-44.8-32-9.734-2.4-16.8 5.466-24.534 12.8-7.733 7.333-16.8 14.667-28.266 14.667-11.467 0-20.534-7.334-28.267-14.667C135.467 5.466 128.4 2.4 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-27.733 44.8-32 9.734-2.4 16.8 5.467 24.534 12.8 7.733 7.333 16.8 14.667 28.266 14.667 11.467 0 20.534-7.334 28.267-14.667 7.733 7.333 14.8-15.2 24.533-12.8 17.067 4.267 32-2.133 44.8-19.2-12.8 17.067-27.733 27.733-44.8 32-9.734-2.4-16.8-5.467-24.534-12.8C143.467 84.133 134.4 76.8 122.933 76.8c-11.466 0-20.533 7.333-28.266 14.667C87.4 98.8 80.333 101.867 64 76.8z"></path></svg>;
const FeatureIcons = {
  Component: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  Routing: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>,
  State: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20v-2M18 20v-4"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M18 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>,
  Interactive: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 10c.7-.7 1-1.6.7-2.6l-2.2-4.4c-.3-1-1.5-1.4-2.6-.7L2 9.8c-1 .6-1.3 2-.7 3l4.4 2.2c1 .3 2-.2 2.6-.7Z"/><path d="m17 10-4.5 4.5"/><path d="m14 13 4.5 4.5"/><path d="M10 17l4.5 4.5"/><path d="m7 14 4.5 4.5"/></svg>,
  Form: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
  Performance: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>,
};
// ---

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* --- HERO SECTION --- */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">About ReactLearn</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            This project is a hands-on learning application designed to demonstrate the fundamental concepts of building a modern web app with React.
          </p>
        </div>

        {/* --- KEY FEATURES SECTION --- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <FeatureItem title="Component-Based Architecture" icon={<FeatureIcons.Component />} to="/posts/1">The UI is built with small, reusable components.</FeatureItem>
              <FeatureItem title="Client-Side Routing" icon={<FeatureIcons.Routing />} to="/posts/3">Uses `react-router-dom` for a smooth, single-page experience.</FeatureItem>
              <FeatureItem title="Understanding Hooks: State Management" icon={<FeatureIcons.State />} to="/posts/2">Demonstrates `useState` and `useEffect` for managing state.</FeatureItem>
              <FeatureItem title="Interactive UI" icon={<FeatureIcons.Interactive />} to="/posts/4">Includes a real-time search filter and sorting controls.</FeatureItem>
              <FeatureItem title="Form Handling" icon={<FeatureIcons.Form />} to="/posts/5">Implements a newsletter signup form using controlled components.</FeatureItem>
              <FeatureItem title="Performance Optimization" icon={<FeatureIcons.Performance />} to="/posts/6">Employs a custom `useDebounce` hook to optimize search.</FeatureItem>
            </div>
        </div>

        {/* --- TECHNOLOGY STACK SECTION --- */}
        <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
          <div className="divide-y divide-gray-700">
              <TechItem name="React" description="A JavaScript library for building user interfaces." icon={<ReactIcon />} onClick={() => setModalContent(techSetupInfo.React)} />
              <TechItem name="Vite" description="A next-generation frontend tooling for fast development." icon={<ViteIcon />} onClick={() => setModalContent(techSetupInfo.Vite)} />
              <TechItem name="Tailwind CSS" description="A utility-first CSS framework for rapid UI development." icon={<TailwindIcon />} onClick={() => setModalContent(techSetupInfo['Tailwind CSS'])} />
          </div>
        </div>
      </div>

      {/* --- MODAL RENDER --- */}
      <Modal 
        isOpen={!!modalContent} 
        onClose={() => setModalContent(null)}
        title={modalContent?.title}
      >
        {modalContent && (
          <>
            <p className="text-lg text-gray-600">{modalContent.content}</p>
            <CodeBlock>{modalContent.code}</CodeBlock>
          </>
        )}
      </Modal>
    </>
  );
};

export default AboutPage;