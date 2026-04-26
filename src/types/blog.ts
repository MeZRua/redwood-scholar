export interface BlogFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  emoji?: string;
  type?: 'post' | 'note';
  draft?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}
