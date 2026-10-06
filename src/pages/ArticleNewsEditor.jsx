import React from 'react';
import { StructuredArticle } from '@/pages/ArticleCongresso';
import { articleNewsEditorContent } from '@/data/articleNewsEditorContent';

const ArticleNewsEditor = () => <StructuredArticle content={articleNewsEditorContent} />;

export default ArticleNewsEditor;
