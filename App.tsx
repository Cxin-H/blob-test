import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { CreatePost } from './pages/CreatePost';
import { BlogPost } from './types';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Initial dummy data
const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Renaissance of Digital Minimalist Design',
    excerpt: 'Explore how modern web design is stripping away the unnecessary to focus on pure content and user experience, inspired by the principles of Bauhaus.',
    content: `
# The Renaissance of Digital Minimalist Design

In an era of information overload, digital design is taking a step back—or rather, a step forward—into minimalism. This isn't just about using less color or white space; it's about intentionality.

## The Philosophy of Less

Minimalism in web design aligns with the user's desire for clarity. When a user lands on a page, they have a goal. Whether it's to read an article, buy a product, or find contact information, extraneous elements only serve as barriers.

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." - Antoine de Saint-Exupéry

## Core Principles

1.  **Negative Space:** Giving content room to breathe.
2.  **Typography:** Using fonts as a primary visual element.
3.  **Functionality:** Every element must serve a purpose.

By embracing these principles, designers create experiences that are not only beautiful but efficiently usable. The future of the web is clean, fast, and content-first.
    `,
    author: 'Alex Rivera',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    readTime: '4 min read',
    tags: ['Design', 'UX', 'Minimalism'],
    imageUrl: 'https://picsum.photos/seed/design/800/600'
  },
  {
    id: '2',
    title: 'Understanding Neural Networks for Beginners',
    excerpt: 'A gentle introduction to the complex world of Artificial Intelligence and how neural networks mimic the human brain to solve problems.',
    content: `
# Understanding Neural Networks

Artificial Intelligence (AI) is the buzzword of the decade, but at its core lie **Neural Networks**. These computing systems are inspired by the biological neural networks that constitute animal brains.

## How Do They Work?

Imagine a system of layers. 
*   **Input Layer:** Receives data.
*   **Hidden Layers:** Processes data using weights and biases.
*   **Output Layer:** Delivers the prediction or classification.

## Applications

From recognizing your face to unlock your phone, to suggesting the next word in your email, neural networks are everywhere. They learn by example, improving their accuracy over time through a process called *training*.

As we move forward, understanding these systems becomes crucial not just for developers, but for anyone interacting with modern technology.
    `,
    author: 'Sarah Chen',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    readTime: '6 min read',
    tags: ['AI', 'Tech', 'Education'],
    imageUrl: 'https://picsum.photos/seed/tech/800/600'
  }
];

const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);

  const handlePostCreated = (newPost: BlogPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="/post/:id" element={<PostDetail posts={posts} />} />
            <Route path="/create" element={<CreatePost onPostCreated={handlePostCreated} />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-slate-200 py-8">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} MindFlow. Powered by Gemini API.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
