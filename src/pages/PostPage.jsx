import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostById } from '../api/mockApi';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import CodeBlock from '../components/shared/CodeBlock';


// A component to parse and render the content
const PostContent = ({ content }) => {
  // Split the content by our code block delimiter '```'
  const parts = content.split('```');

  return (
    <div>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          // Odd parts are code blocks
          // We also remove the language hint (like 'jsx') and trim whitespace
          const code = part.substring(part.indexOf('\n')).trim();
          return <CodeBlock key={index}>{code}</CodeBlock>;
        } else {
          // Even parts are regular text. We'll replace **text** with bold tags.
          // NOTE: In a real app, use a library like 'marked' or 'react-markdown' for security.
          const formattedPart = part.split('**').map((text, i) => 
            i % 2 === 1 ? <strong key={i}>{text}</strong> : text
          );
          return <p key={index} className="text-lg text-gray-700 leading-relaxed my-4 whitespace-pre-line">{formattedPart}</p>;
        }
      })}
    </div>
  );
};


const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const minTimePromise = new Promise(resolve => setTimeout(resolve, 500));

    Promise.all([fetchPostById(postId), minTimePromise])
      .then(([data]) => {
        setPost(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId]);
  
  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <Card>
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="text-gray-700 mt-2">{error}</p>
        <Link to="/" className="text-blue-600 mt-4 inline-block">&larr; Back to Home</Link>
      </Card>
    );
  }

  if (!post) return null;

  return (
    <div>
      <Card>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{post.title}</h1>
        
        <PostContent content={post.content} />

        <div className="mt-8 pt-6 border-t flex justify-between items-center">
          <Link to="/" className="text-blue-600">&larr; Back to Home</Link>
          
          {/* --- NEW NAVIGATION BUTTON --- */}
          {/* If a nextPostId exists, show a link to the next lesson */}
          {post.nextPostId && (
            <Link to={`/posts/${post.nextPostId}`}>
              <Button>
                Next Lesson &rarr;
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PostPage;