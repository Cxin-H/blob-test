import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-brand-700 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime}
          </span>
          <span className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            {post.author}
          </span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>

        <Link to={`/post/${post.id}`} className="block mb-3">
          <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors font-serif line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
          {post.excerpt}
        </p>

        <Link 
          to={`/post/${post.id}`}
          className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 mt-auto"
        >
          Read Article
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
