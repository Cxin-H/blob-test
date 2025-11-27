import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';

interface PostDetailProps {
  posts: BlogPost[];
}

export const PostDetail: React.FC<PostDetailProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h2>
          <Link to="/" className="text-brand-600 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Header Image */}
      <div className="h-[400px] w-full relative">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="bg-brand-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
               <span className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl py-12">
        <div className="prose prose-lg prose-slate max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        <hr className="my-12 border-slate-200" />
        
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-slate-400" />
                <span className="text-slate-600 font-medium">Tags:</span>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-slate-600 bg-slate-100 px-2 py-1 rounded text-sm hover:bg-slate-200 cursor-default">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </article>
  );
};
