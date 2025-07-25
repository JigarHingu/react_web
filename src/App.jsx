import React from "react";
import { Routes, Route } from "react-router-dom"; 

// Import Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import NewsletterPage from "./pages/NewsletterPage";
import InterviewPage from './pages/InterviewPage';
import PostPage from "./pages/PostPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col transition-colors duration-300">
      {/* The Header no longer needs the onNavigate prop */}
      <Header />

      <main className="flex-grow container mx-auto px-6 py-8">
        {/* The <Routes> component works like a switch. It looks at the current URL and renders the first <Route> that matches the path.
        */}
        <Routes>
          {/* The `path` prop defines the URL path.
            The `element` prop takes the component to render for that path.
          */}
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* --- NEW DYNAMIC ROUTE --- */}
          {/* The ":" before "postId" tells React Router that this is a dynamic
              segment of the URL. It will match /posts/1, /posts/2, etc.
          */}
          <Route path="/posts/:postId" element={<PostPage />} />

          <Route path="/interview" element={<InterviewPage />} />

          <Route path="/newsletter" element={<NewsletterPage />} />
           
          {/* The path="*" is a wildcard that matches any URL not matched above.
              This is perfect for a 404 Not Found page. */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}