export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl: string;
}

export interface GeneratedPostResponse {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
