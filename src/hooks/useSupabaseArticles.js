import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useSupabaseArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('articles')
            .select('id, title, slug, excerpt, category, tags, status, created_at')
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .then(({ data }) => { setArticles(data || []); setLoading(false); });
    }, []);

    return { articles, loading };
};
