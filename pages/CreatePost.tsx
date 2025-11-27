import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateBlogPost } from '../services/geminiService';
import { Button } from '../components/Button';
import { BlogPost, LoadingState } from '../types';
import { Sparkles, Wand2, AlertCircle } from 'lucide-react';

interface CreatePostProps {
  onPostCreated: (post: BlogPost) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setStatus(LoadingState.GENERATING);
    setError(null);

    try {
      const generatedData = await generateBlogPost(topic);
      
      const newPost: BlogPost = {
        id: crypto.randomUUID(),
        ...generatedData,
        author: 'Gemini AI',
        date: new Date().toISOString(),
        imageUrl: `https://picsum.photos/800/600?random=${Date.now()}`
      };

      onPostCreated(newPost);
      setStatus(LoadingState.SUCCESS);
      
      // Short delay to show success state before redirecting
      setTimeout(() => {
        navigate(`/post/${newPost.id}`);
      }, 1000);

    } catch (err) {
      console.error(err);
      setStatus(LoadingState.ERROR);
      setError("Failed to generate content. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 mb-6">
            <Wand2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 font-serif">
            Draft with AI Magic
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Enter a topic, and watch Gemini craft a professional blog post for you in seconds.
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleGenerate}>
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-2">
                What do you want to write about?
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                  id="topic"
                  name="topic"
                  rows={4}
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border-slate-300 rounded-lg p-4 resize-none"
                  placeholder="e.g., The future of sustainable architecture, or 5 tips for better sleep..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={status === LoadingState.GENERATING}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Generation Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-3 text-base"
                isLoading={status === LoadingState.GENERATING}
                disabled={!topic.trim() || status === LoadingState.SUCCESS}
              >
                {status === LoadingState.GENERATING ? (
                  'Generating Content...'
                ) : status === LoadingState.SUCCESS ? (
                  'Success! Redirecting...'
                ) : (
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Article
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {status === LoadingState.GENERATING && (
          <div className="text-center animate-pulse">
            <p className="text-brand-600 font-medium">Gemini is researching and writing your post...</p>
            <p className="text-slate-400 text-sm mt-1">This usually takes about 5-10 seconds.</p>
          </div>
        )}
      </div>
    </div>
  );
};
