export interface Author {
  name: string;
  isMainAuthor?: boolean;
  affiliation?: string;
  email?: string;
  orcid?: string;
  isHighlighted?: boolean;
  isCorresponding?: boolean;
  isCoAuthor?: boolean;
  isFiAuthor?: boolean;    // ^ → ^ 符号
}

export interface Publication {
  id: string;
  title: string;
  authors: Author[];
  abstract?: string;
  journal?: string;
  conference?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: number;
  month?: string;
  publishedDate?: string;
  doi?: string;
  arxivId?: string;
  pmid?: string;
  url?: string;
  code?: string;
  pdfUrl?: string;
  tags: string[];
  keywords?: string[];
  type: PublicationType;
  status: PublicationStatus;
  citations?: number;
  impactFactor?: number;
  quartile?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  bibtex?: string;
  venue?: string;
  location?: string;
  awards?: string[];
  featured?: boolean;
  selected?: boolean;
  preview?: string;
  summary?: string;
  researchArea: ResearchArea;
  description?: string;

  // ── 新增的展示字段 ────────────────────────
  abbr?: string;          // 徽章文字，如 "GLOBECOM 2023"
  venueDetail?: string;   // 斜体说明完整行，如 "IEEE GLOBECOM — KL, 2023"
  slides?: string;        // Slides 链接
  video?: string;         // Video 链接
  linkLabel?: string;     // 自定义 url/html 链接按钮文字，默认 "Paper"
  // ── 补充缺失字段 ────────────────────
  html?: string;


}

export type PublicationType =
  | 'journal'
  | 'conference'
  | 'workshop'
  | 'book-chapter'
  | 'book'
  | 'thesis'
  | 'preprint'
  | 'patent'
  | 'technical-report';

export type PublicationStatus =
  | 'published'
  | 'accepted'
  | 'under-review'
  | 'submitted'
  | 'in-preparation'
  | 'draft';

export type ResearchArea =
  | 'ai-healthcare'
  | 'signal-processing'
  | 'reliability-engineering'
  | 'quantum-computing'
  | 'machine-learning'
  | 'fault-diagnosis'
  | 'neural-networks'
  | 'transformer-architectures'
  | 'biomedical-engineering'
  | 'other';

