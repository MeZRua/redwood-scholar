'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    CalendarIcon,
    BookOpenIcon,
    ClipboardDocumentIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/useMessages';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
}

const GROUPS = [
    { key: 'journal',    label: '📖 Journal Papers' },
    { key: 'conference', label: '🏛️ Conference Papers' },
    { key: 'preprint',   label: '✏️ Preprint, Revised & Reviewing Papers' },
];

const ABBR_COLOR: Record<string, string> = {
    journal:    'bg-purple-600',
    conference: 'bg-blue-600',
    preprint:   'bg-orange-500',
};

export default function PublicationsList({ config, publications, embedded = false }: PublicationsListProps) {
    const messages = useMessages();
    const [searchQuery, setSearchQuery]           = useState('');
    const [selectedYear, setSelectedYear]         = useState<number | 'all'>('all');
    const [selectedType, setSelectedType]         = useState<string | 'all'>('all');
    const [showFilters, setShowFilters]           = useState(false);
    const [expandedBibtexId, setExpandedBibtexId] = useState<string | null>(null);
    const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);

    const years = useMemo(() => {
        return Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a);
    }, [publications]);

    const types = useMemo(() => {
        return Array.from(new Set(publications.map(p => p.type))).sort();
    }, [publications]);

    const filteredPublications = useMemo(() => {
        return publications.filter(pub => {
            const matchesSearch =
                pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.authors.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                pub.journal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.conference?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesYear = selectedYear === 'all' || pub.year === selectedYear;
            const matchesType = selectedType === 'all' || pub.type === selectedType;
            return matchesSearch && matchesYear && matchesType;
        });
    }, [publications, searchQuery, selectedYear, selectedType]);

    const linkBtn = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-accent hover:text-accent transition-colors";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {/* 标题 */}
            <div className="mb-8">
                <h1 className={`${embedded ? 'text-2xl' : 'text-4xl'} font-serif font-bold text-primary mb-4`}>
                    {config.title}
                </h1>
                {config.description && (
                    <p className={`${embedded ? 'text-base' : 'text-lg'} text-neutral-600 dark:text-neutral-500 max-w-2xl`}>
                        {config.description}
                    </p>
                )}
            </div>

            {/* 搜索 & 筛选 */}
            <div className="mb-8 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder={messages.publications.searchPlaceholder}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-200",
                            showFilters
                                ? "bg-accent text-white border-accent"
                                : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 hover:border-accent hover:text-accent"
                        )}
                    >
                        <FunnelIcon className="h-5 w-5 mr-2" />
                        {messages.publications.filters}
                    </button>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-6">
                                {/* 年份筛选 */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center">
                                        <CalendarIcon className="h-4 w-4 mr-1" /> {messages.publications.year}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedYear('all')}
                                            className={cn("px-3 py-1 text-xs rounded-full transition-colors",
                                                selectedYear === 'all'
                                                    ? "bg-accent text-white"
                                                    : "bg-white dark:bg-neutral-800 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            )}
                                        >
                                            {messages.common.all}
                                        </button>
                                        {years.map(year => (
                                            <button key={year} onClick={() => setSelectedYear(year)}
                                                className={cn("px-3 py-1 text-xs rounded-full transition-colors",
                                                    selectedYear === year
                                                        ? "bg-accent text-white"
                                                        : "bg-white dark:bg-neutral-800 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                )}
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 类型筛选 */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center">
                                        <BookOpenIcon className="h-4 w-4 mr-1" /> {messages.publications.type}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedType('all')}
                                            className={cn("px-3 py-1 text-xs rounded-full transition-colors",
                                                selectedType === 'all'
                                                    ? "bg-accent text-white"
                                                    : "bg-white dark:bg-neutral-800 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            )}
                                        >
                                            {messages.common.all}
                                        </button>
                                        {types.map(type => (
                                            <button key={type} onClick={() => setSelectedType(type)}
                                                className={cn("px-3 py-1 text-xs rounded-full capitalize transition-colors",
                                                    selectedType === type
                                                        ? "bg-accent text-white"
                                                        : "bg-white dark:bg-neutral-800 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                )}
                                            >
                                                {type.replace('-', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 论文列表（分组） */}
            <div className="space-y-12">
                {filteredPublications.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        {messages.publications.noResults}
                    </div>
                ) : (
                    GROUPS.map(group => {
                        const groupPubs = filteredPublications.filter(p => p.type === group.key);
                        if (groupPubs.length === 0) return null;

                        return (
                            <div key={group.key}>
                                {/* 分组标题 */}
                                <div className="flex items-center gap-4 mb-5">
                                    <h2 className="text-xl font-bold text-primary whitespace-nowrap">
                                        {group.label}
                                    </h2>
                                    <div className="flex-grow h-px bg-red-400 opacity-60" />
                                </div>

                                {/* 该组论文 */}
                                <div className="space-y-4">
                                    {groupPubs.map((pub, index) => (
                                        <motion.div
                                            key={pub.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.05 * index }}
                                            className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all duration-200"
                                        >
                                            <div className="flex flex-col md:flex-row gap-6">

                                                {/* 封面图（可选） */}
                                                {pub.preview && (
                                                    <div className="w-full md:w-48 flex-shrink-0">
                                                        <div className="aspect-video md:aspect-[4/3] relative rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                                            <Image
                                                                src={`/papers/${pub.preview}`}
                                                                alt={pub.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="(max-width: 768px) 100vw, 200px"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex-grow">

                                                    {/* 徽章 + 标题 */}
                                                    <div className="flex items-start gap-3 mb-2 flex-wrap">
                                                        {pub.abbr && (
                                                            <span className={cn(
                                                                "flex-shrink-0 mt-0.5 px-2 py-0.5 rounded text-xs font-bold text-white",
                                                                ABBR_COLOR[pub.type] ?? 'bg-neutral-500'
                                                            )}>
                                                                {pub.abbr}
                                                            </span>
                                                        )}
                                                        {/* 支持 HTML 标签（<b> <i> 等） */}
                                                        <h3
                                                            className={`${embedded ? 'text-lg' : 'text-xl'} font-semibold text-primary leading-tight`}
                                                            dangerouslySetInnerHTML={{ __html: pub.title }}
                                                        />
                                                    </div>

                                                    {/* 作者行：自己加粗，特定人加下划线 */}
                                                    <p className={`${embedded ? 'text-sm' : 'text-base'} text-neutral-600 dark:text-neutral-400 mb-2`}>
                                                        {pub.authors.map((author, idx) => (
                                                            <span key={idx}>
                                                                <span className={cn(
                                                                    author.isHighlighted
                                                                        ? 'font-bold text-neutral-900 dark:text-white'
                                                                        : '',
                                                                    author.isCoAuthor
                                                                        ? 'underline underline-offset-4 decoration-neutral-400'
                                                                        : '',
                                                                )}>
                                                                    {author.name}
                                                                </span>
                                                                {author.isCorresponding && (
                                                                    <sup className="ml-0.5 text-neutral-500">†</sup>
                                                                )}
                                                                {author.isFiAuthor && (
                                                                    <sup className="ml-0.5 text-neutral-500">*</sup>   // ^ → ^
                                                                )}
                                                                {idx < pub.authors.length - 1 && ', '}
                                                            </span>
                                                        ))}
                                                    </p>

                                                    {/* 会议/期刊斜体说明行 */}
                                                    <p className="text-sm italic text-neutral-500 dark:text-neutral-500 mb-3">
                                                        {pub.venueDetail
                                                            ?? `${pub.journal || pub.conference} ${pub.year}`}
                                                    </p>

                                                    {/* 摘要描述（可选） */}
                                                    {pub.description && (
                                                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-3 line-clamp-3">
                                                            {pub.description}
                                                        </p>
                                                    )}

                                                    {/* 链接按钮区 */}
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {pub.arxivId && (
                                                            <a
                                                                href={`https://arxiv.org/abs/${pub.arxivId}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={linkBtn}
                                                            >
                                                                📄 arXiv
                                                            </a>
                                                        )}
                                                        {pub.html && (
                                                            <a href={pub.html} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                                                                📎 {pub.linkLabel || 'Paper'}
                                                            </a>
                                                        )}
                                                        {pub.slides && (
                                                            <a href={pub.slides} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                                                                🖼️ Slides
                                                            </a>
                                                        )}
                                                        {pub.video && (
                                                            <a href={pub.video} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                                                                🎬 Video
                                                            </a>
                                                        )}
                                                        {pub.code && (
                                                            <a href={pub.code} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                                                                💻 Code
                                                            </a>
                                                        )}
                                                        {pub.doi && (
                                                            <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                                                                🔗 DOI
                                                            </a>
                                                        )}
                                                        {pub.abstract && (
                                                            <button
                                                                onClick={() => setExpandedAbstractId(
                                                                    expandedAbstractId === pub.id ? null : pub.id
                                                                )}
                                                                className={cn(
                                                                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                                                                    expandedAbstractId === pub.id
                                                                        ? "bg-accent text-white border-accent"
                                                                        : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-accent hover:text-accent"
                                                                )}
                                                            >
                                                                <DocumentTextIcon className="h-3 w-3 mr-1.5" />
                                                                Abstract
                                                            </button>
                                                        )}
                                                        {pub.bibtex && (
                                                            <button
                                                                onClick={() => setExpandedBibtexId(
                                                                    expandedBibtexId === pub.id ? null : pub.id
                                                                )}
                                                                className={cn(
                                                                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                                                                    expandedBibtexId === pub.id
                                                                        ? "bg-accent text-white border-accent"
                                                                        : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-accent hover:text-accent"
                                                                )}
                                                            >
                                                                <BookOpenIcon className="h-3 w-3 mr-1.5" />
                                                                BibTeX
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Abstract / BibTeX 展开内容 */}
                                                    <AnimatePresence>
                                                        {expandedAbstractId === pub.id && pub.abstract && (
                                                            <motion.div
                                                                key="abstract"
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="overflow-hidden mt-4"
                                                            >
                                                                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                                        {pub.abstract}
                                                                    </p>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                        {expandedBibtexId === pub.id && pub.bibtex && (
                                                            <motion.div
                                                                key="bibtex"
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="overflow-hidden mt-4"
                                                            >
                                                                <div className="relative bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                                                                    <pre className="text-xs text-neutral-600 dark:text-neutral-400 overflow-x-auto whitespace-pre-wrap font-mono">
                                                                        {pub.bibtex}
                                                                    </pre>
                                                                    <button
                                                                        onClick={() => navigator.clipboard.writeText(pub.bibtex || '')}
                                                                        className="absolute top-2 right-2 p-1.5 rounded-md bg-white dark:bg-neutral-700 text-neutral-500 hover:text-accent shadow-sm border border-neutral-200 dark:border-neutral-600 transition-colors"
                                                                        title={messages.common.copyToClipboard}
                                                                    >
                                                                        <ClipboardDocumentIcon className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
}

