import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useSupabaseProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('projects')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .then(({ data }) => { setProjects(data || []); setLoading(false); });
    }, []);

    return { projects, loading };
};
