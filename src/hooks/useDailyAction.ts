import { useState, useEffect } from 'react';
import type { DailyAction } from '../types';
import type { Locale } from '../i18n/types';
import { supabase } from '../lib/supabase';
import { getFallbackAction } from '../data/fallbackActions';

export function useDailyAction(locale: Locale = 'fr') {
  const [action, setAction] = useState<DailyAction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const now = new Date();
      const monthDay = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      if (!supabase) {
        setAction({ date: monthDay, actionText: getFallbackAction(locale) });
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('get_today_action', { month_day: monthDay, lang: locale });

        if (error || !data) {
          setAction({ date: monthDay, actionText: getFallbackAction(locale) });
        } else {
          setAction({ date: monthDay, actionText: data as string });
        }
      } catch {
        setAction({ date: monthDay, actionText: getFallbackAction(locale) });
      }

      setIsLoading(false);
    }

    fetch();
  }, [locale]);

  return { action, isLoading };
}
