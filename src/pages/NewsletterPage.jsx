import React, { useState, useEffect } from 'react';
import Card from '../components/shared/Card';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import Button from '../components/shared/Button';

const NewsletterPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // --- NEW STATE FOR THE FORM ---
  // State to hold the value of the email input field
  const [email, setEmail] = useState('');
  // State to track if the form has been successfully submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // --- FORM SUBMISSION HANDLER ---
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default browser refresh on form submission
    
    // Basic validation: check if email is not empty
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    
    // In a real app, you would send the email to your server here.
    // For our simulation, we'll just log it and show a success message.
    console.log('Subscribing with email:', email);
    
    setIsSubmitted(true); // Set submitted to true to show the success message
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        {/* We use conditional rendering to show either the form or the success message */}
        {isSubmitted ? (
          // --- SUCCESS VIEW ---
          <div className="text-center p-8">
            <svg className="w-16 h-16 mx-auto text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mt-2">
              You've been successfully subscribed to our newsletter.
            </p>
          </div>
        ) : (
          // --- FORM VIEW ---
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800">Subscribe to Our Newsletter</h1>
            <p className="mt-3 text-lg text-gray-600">
              Get the latest articles and updates delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <input
                type="email"
                placeholder="you@example.com"
                value={email} // The input's value is controlled by our state
                onChange={(e) => setEmail(e.target.value)} // Update state on every keystroke
                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email address"
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default NewsletterPage;
