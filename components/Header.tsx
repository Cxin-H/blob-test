import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-brand-600 p-1.5 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight font-serif">MindFlow</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Home
          </Link>
          <Link 
            to="/create" 
            className={`inline-flex items-center space-x-1 text-sm font-medium px-4 py-2 rounded-full transition-all
              ${isActive('/create') 
                ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-200' 
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg'
              }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Write with AI</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
